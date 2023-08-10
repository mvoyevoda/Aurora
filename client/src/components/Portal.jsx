import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/portal.css";
import { Button, selectClasses } from '@mui/material';

export default function Portal() {

  const { quizId } = useParams();
  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser?.id;
  const isAuthChecked = authContext.isAuthChecked;
  const isAuthenticated = !!authContext.currentUser;
  // console.log("Authenticated?: ", isAuthenticated);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [attempt, setAttempt] = useState(null);
  const [progress, setProgress] = useState(0);
  const [submissions, setSubmissions] = useState({});
  const [score, setScore] = useState(null);

  // useEffect(() => {
  //   console.log("SUBMISSIONS LENGTH: " + Object.keys(submissions).length)
  //   console.log("SUBMISSIONS:", JSON.stringify(submissions));

  // }, [submissions])

  //Update currentQuestionId when currentQuestionIndex changes
  useEffect(() => {
    // console.log("RANNNNN") 
    if (currentQuestionIndex !== 0) setCurrentQuestionId(questions[currentQuestionIndex].id)
  }, [currentQuestionIndex])

  const loadData = async () => {
    try {
      const attemptResponse = await axios.get(`/api/attempts/${userId}/${quizId}`, { withCredentials: true });
      
      if (attemptResponse.status === 200) {
        setAttempt(attemptResponse.data);
        setProgress(attemptResponse.data.progress);
        // console.log("Fetched attempt:", attemptResponse.data);
  
        try {
          // Fetching submissions for the fetched attempt
          const submissionsResponse = await axios.get(`/api/submissions/${attemptResponse.data.id}`, { withCredentials: true });
          // console.log("Submissions response: ", submissionsResponse);
          
          if (submissionsResponse.status === 200) {
              // Map the response object to an array containing all submission choices
              // const submissionMap = submissionsResponse.data.map(sub => sub.submissionChoice);
              setSubmissions(submissionsResponse.data);
              // console.log("SUBMISSIONS: " + submissions)
          }
        } catch (submissionsError) {
            console.error('Error fetching submissions:', submissionsError);
        }      
      }
    } catch (attemptError) {
      if (attemptError.response && attemptError.response.status === 404) {
        // Handle the case where the attempt does not exist --> Create a new attempt
        try {
          const attemptResponse = await axios.post(`/api/attempts/${userId}/${quizId}`, { withCredentials: true });
          setAttempt(attemptResponse.data);
          setProgress(attemptResponse.data.progress);
          // console.log("Initialized attempt: ", attemptResponse.data); 
  
          // After initializing the attempt, you might want to fetch the submissions here as well, if needed.
          // However, it's probable that a new attempt might not have submissions yet.
  
        } catch (AttemptInitializationError) {
          console.error('Error initializing attempt:', AttemptInitializationError);
        }
      } else {
        console.error('Error fetching attempt:', attemptError);
      }
    }
  };  

  async function fetchQuestions() {
    if (!isAuthChecked || !isAuthenticated) {
      return;
    }
    try {
      const questionsResponse = await axios.get(`/api/quizzes/${quizId}`, {
        withCredentials: true
      });
      setQuestions(questionsResponse.data);
      setCurrentQuestionId(questionsResponse.data[0].id) //Set to id of first question
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  }
  
  useEffect(() => {
    const initialize = async () => {
      if (isAuthenticated && isAuthChecked) {
        await loadData();
        await fetchQuestions();
      }
    };
    initialize();
  }, [])

  function handleSubmission(userChoice) {
    if (Object.keys(submissions).length === 0) {
      setSubmissions({ [currentQuestionId]: userChoice });
      // console.log("Initialization of submissions: " + submissions);
      setProgress(prevProgress => prevProgress + 1);
    } else {
      // Create a shallow copy of the submissions object
      const updatedSubmissions = { ...submissions };
      JSON.stringify(updatedSubmissions)
    
      // Update the userChoice of the currentQuestion in the copied object
      updatedSubmissions[currentQuestionId] = userChoice;
    
      // Check the length before and after to determine progress
      const prevLength = Object.keys(submissions).length;
      setSubmissions(updatedSubmissions);
      const newLength = Object.keys(updatedSubmissions).length;
    
      // If a new submission was added, increment the progress
      if (newLength > prevLength) {
        setProgress(prevProgress => prevProgress + 1);
      }
    }
  }  

  async function handleSubmitQuiz(){
    //1. PATCH: Update Attempt Progress
    //2. PATCH: Update submissionChoice of each submission
    //3. Compare each submission to each question's correctAnswer
  }

  let selectedChoice = Object.keys(submissions).length !== 0? submissions[currentQuestionId] : null
  // console.log("SELECTED CHOICE: " + selectedChoice)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: "10px" }}>
        <h3>Progress: {progress} / {questions.length}</h3>
        <h3>Question: {currentQuestionIndex + 1} / {questions.length}</h3>
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
        <p>Attempt ID: {attempt?.id ?? "NONE"} <span style={{ paddingLeft: '2em' }}>User ID: {userId ?? "NONE"}</span></p>
        {/* Display the score if it is not null */}
        {score !== null && <p> Score: {score} / {questions.length}</p>}
      </div>
  
      <h1 className="question-text">
        {questions[currentQuestionIndex]?.questionText}
      </h1>
  
      <div className="answer-choices">
        {/* Multiple Choice Container */}
        {questions[currentQuestionIndex]?.questionType === 0 && (
          questions[currentQuestionIndex]?.answerChoices?.map((choice, index) => (
            <button
              key={index}
              className={`${selectedChoice === index ? 'selected-choice' : ''}`}
              onClick={() => handleSubmission(index)}
            >
              {choice}
            </button>
          ))
        )}
        {/* True/False Container */}
        {questions[currentQuestionIndex]?.questionType === 1 && (
          <>
            <button
              className={`${selectedChoice === 1 ? 'selected-choice' : ''}`}
              onClick={() => handleSubmission(1)}
            >
              True
            </button>
            <button
              className={`${selectedChoice === 0 ? 'selected-choice' : ''}`}
              onClick={() => handleSubmission(0)}
            >
              False
            </button>
          </>
        )}
        {/* Short Answer Container */}
        {/* {questions[currentQuestion]?.questionType === 2 && (
          <>
            <input type="text" />
          </>
        )} */}
      </div>
  
      <div style={{ position: "fixed", top: "20em", left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ display: "flex" }}>
          {currentQuestionIndex !== 0 && (
            <Button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Prev
            </Button>
          )}
          {currentQuestionIndex !== questions.length - 1 && (
            <Button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          )}
          {progress === questions.length &&
            <button className="Submit Quiz" onClick={handleSubmitQuiz}>Submit Quiz</button>
          }
        </div>
      </div>
    </div>
  );

}