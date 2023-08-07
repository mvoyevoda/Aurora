import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/portal.css";

export default function Portal() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [userId, setUserId] = useState(null);
  const [attemptId, setAttemptId] = useState(null)
  const [progress, setProgress] = useState(0)

  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser.id;

  useEffect(() => {
    console.log("1st USE EFFECT RAN")
    async function fetchData() {
      try {
        // Fetch questions
        const questionsResponse = await axios.get(`/api/quizzes/${quizId}`);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("2nd USE EFFECT RAN")
    async function fetchAttempt() {

      if (!userId){
        console.log("USERID NOT AVAILABLE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        return; // skip if userId is not available yet
      } 
  
      try {
        // Verify attempt and fetch progress
        const attemptResponse = await axios.get(`/api/users/${userId}/attempts/${quizId}`);
        console.log(attemptResponse.data)

        setAttemptId(attemptResponse.data.id);
        setProgress(attemptResponse.data.progress ?? 0);
      } catch (error) {
        // Only make the POST request if the error status is 404
        if (error.response && error.response.status === 404) {
            try {
                const postResponse = await axios.post(`/api/attempts/${userId}/${quizId}`);
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
  }, []);  

  async function handleSubmission(userChoice){
    try {
      const getSubmissionResponse = await axios.get(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`)
        
      // If submission exists and userChoice is the same as the existing choice, do nothing
      if (getSubmissionResponse.data.submissionChoice === userChoice) {
        return;
      }
  
      // If submission exists but userChoice is different, or if submission doesn't exist, update or create submission
      await axios.put(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, {
        submissionChoice: userChoice
      });
      
    } catch (error) {
      // If submission does not exist (status 404), create a new one
      if (error.response && error.response.status === 404) {
        console.log("CATCHING ERROR")
        try {
          const postResponse = await axios.post(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, {
            submissionChoice: userChoice
          });
          // If a submission is successfully created, increment progress
          if (postResponse.status === 201) {
            setProgress((prevProgress) => prevProgress + 1)
            await axios.post(`/api/attempts/${attemptId}`, {
              progress: progress
            }).catch((error) => {
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
    <> 
      <h3>{progress} / {questions.length}</h3>
      <p>Attempt ID: {attemptId ?? "NONE"}</p>
      <p>User ID: {userId ?? "NONE"}</p>
      <h1 className="question-text">
        {questions[currentQuestion]?.questionText}
      </h1>
      <div className="answer-choices">
        {/* Multiple Choice Container */}
        {questions[currentQuestion]?.questionType === 0 && (
          questions[currentQuestion]?.answerChoices?.map((choice, index) => (
            <button key={index} onClick={() => handleSubmission(index)}>{choice}</button>
          ))
        )}
        {/* True/False Container */}
        {questions[currentQuestion]?.questionType === 1 && (
          <>         
            <button onClick={() => handleSubmission(1)}>True</button>
            <button onClick={() => handleSubmission(0)}>False</button>
          </>
        )}
        {/* Shore Answer Container */}
        {/* {questions[currentQuestion]?.questionType === 2 && (
          <>         
          <input type="text" /> 
          </>
        )} */}
      </div>
      {currentQuestion !== 0 && (
        <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
          Prev
        </button>
      )}
      {currentQuestion !== questions.length-1 && (
        <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
          Next
        </button>
      )}
    </>
  );
}
