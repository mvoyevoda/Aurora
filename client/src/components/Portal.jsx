import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/portal.css";
import { Button } from '@mui/material';

export default function Portal() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attemptId, setAttemptId] = useState(null)
  const [progress, setProgress] = useState(0)
  const [submission, setSubmission] = useState("")

  console.log("Submission: " + submission)

  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser?.id;

  useEffect(() => {
    // console.log("1st USE EFFECT RAN")
    async function fetchData() {
      try {
        // Fetch questions
        const questionsResponse = await axios.get(`/api/quizzes/${quizId}`, { withCredentials: true });
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, [quizId]);

  useEffect(() => {
    // console.log("2nd USE EFFECT RAN")
    async function fetchAttempt() {

      if (!userId){
        console.log("USERID NOT AVAILABLE")
        return; // skip if userId is not available yet
      } 

      try {
        // Verify attempt and fetch progress
        const attemptResponse = await axios.get(`/api/users/${userId}/attempts/${quizId}`, { withCredentials: true });
        // console.log(attemptResponse.data)

        setAttemptId(attemptResponse.data.id);
        setProgress(attemptResponse.data.progress ?? 0);
      } catch (error) {
        // Only make the POST request if the error status is 404
        if (error.response && error.response.status === 404) {
            try {
                const postResponse = await axios.post(`/api/attempts/${userId}/${quizId}`, {}, { withCredentials: true });
                // Handle the response here
                console.log('Attempt created:', postResponse.data);
                setAttemptId(postResponse.data.id);
                setProgress(postResponse.data.progress ?? 0);
            } catch(postError) {
                console.error("Failed to create attempt:", postError);
            }
        } else {
            // If the error status is not 404, log the error
            console.error("Failed to fetch attempt:", error);
        }
      }
    }

    fetchAttempt();
  }, [userId, quizId]);  

  // useEffect(() => {
  //   console.log("Current Question: " + currentQuestion)
  // }, [currentQuestion])

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const response = await axios.get(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, { withCredentials: true });
        // Update submission state if the data exists; otherwise, set it to an empty string
        setSubmission(response.data.submissionChoice ? response.data.submissionChoice : "");
      } catch (error) {
        setSubmission("")
        console.error("Submission not yet created");
      }
    }
    fetchSubmission();
}, [currentQuestion]);


  async function handleSubmission(userChoice){
    setSubmission(userChoice)
    try {
      const getSubmissionResponse = await axios.get(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, { withCredentials: true })

      // If submission exists and userChoice is the same as the existing choice, do nothing
      if (getSubmissionResponse.data.submissionChoice === userChoice) {
        return;
      }

      // If submission exists but userChoice is different, update the existing submission
      await axios.patch(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, {
        submissionChoice: userChoice
      }, { withCredentials: true });

    } catch (error) {
      // If submission does not exist (status 404), create a new one
      if (error.response && error.response.status === 404) {
        console.log("ENTERED CATCH - SUBMISSION DOESN'T EXIST")
        try {
          const postResponse = await axios.post(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, {
            submissionChoice: userChoice
          }, { withCredentials: true });
          // If a submission is successfully created, increment progress
          if (postResponse.status === 201) {
            await axios.patch(`/api/attempts/${attemptId}`, {
              progress: progress+1
            }, { withCredentials: true })
            .then((response) => {
              // The progress value is assumed to be in the response data. Modify as per actual response structure.
              if (response.status === 200) {
                setProgress(response.data.progress);
              }
            })
            .catch((error) => {
              console.error("Failed to update progress:", error);
            });  

          }
        } catch(postError) {
          console.error("Failed to create submission:", postError);
        }
      }
      // For any other errors, log them
      else {
        console.error("Failed to handle submission:", error);
      }
    }
  }  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: "10px" }}>
        <h3> Progress: {progress} / {questions.length} </h3>
        <h3> Question: {currentQuestion+1} / {questions.length} </h3>
      </div>

      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Button
          color="inherit"
          href="/dashboard"
          sx={{
            backgroundColor: "transparent",
            border: "1px solid transparent",
            borderRadius: "4px",
            opacity: 0.5,
          }}
        >
          Exit
        </Button>
      </div>

      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
      <p>Attempt ID: {attemptId ?? "NONE"} <span style={{paddingLeft: '2em'}}>User ID: {userId ?? "NONE"}</span></p>
      
      </div>
      <h1 className="question-text">
        {questions[currentQuestion]?.questionText}
      </h1>
      <div className="answer-choices">
        {/* Multiple Choice Container */}
        {questions[currentQuestion]?.questionType === 0 && (
          questions[currentQuestion]?.answerChoices?.map((choice, index) => (
            <button
              key={index}
              className={`${submission === index ? 'selected-choice' : ''}`}
              onClick={() => handleSubmission(index)}
              >
              {choice}
            </button>
          ))
        )}
        {/* True/False Container */}
        {questions[currentQuestion]?.questionType === 1 && (
          <>         
            <button 
              className={`${submission === 1 ? 'selected-choice' : ''}`} 
              onClick={() => handleSubmission(1)}
            >
              True
            </button>
            <button 
              className={`${submission === 0 ? 'selected-choice' : ''}`} 
              onClick={() => handleSubmission(0)}
            >
              False
            </button>
          </>
        )}
        {/* Shore Answer Container */}
        {/* {questions[currentQuestion]?.questionType === 2 && (
          <>         
          <input type="text" /> 
          </>
        )} */}
      </div>
      <div style={{ position: "fixed", top: "20em", left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ display: "flex" }}>
          {currentQuestion !== 0 && (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Prev
            </Button>
          )}
          {currentQuestion !== questions.length - 1 && (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}