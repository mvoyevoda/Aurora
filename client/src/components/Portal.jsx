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
    async function fetchData() {
      try {
        // Fetch user ID
        // const userResponse = await axios.get('/auth/current_user');
        // setUserId(userResponse.data.id);
        
        // Fetch questions
        const questionsResponse = await axios.get(`/api/quizzes/${quizId}`);
        setQuestions(questionsResponse.data);
        
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
  
    fetchData();
  }, [quizId]);

  useEffect(() => {
    async function fetchAttempt() {
      if (!userId) return; // skip if userId is not available yet

      try {
        // Verify attempt and fetch progress
        const attemptResponse = await axios.get(`/api/attempts/${userId}/${quizId}`);
        setAttemptId(attemptResponse.data.id);
        setProgress(attemptResponse.data.progress);
      } catch (error) {
        console.error("Failed to fetch attempt:", error);
      }
    }

    fetchAttempt();
  }, [quizId, userId]);
  

  async function handleSubmission(submission){
    try {
      const submissionResponse = await axios.post(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, {
        questionType: questions[currentQuestion].questionType,
        answerChoice: submission
      });
      
      if (submissionResponse.status === 201) {
        setProgress(progress + 1);
        
        // Update progress in the attempt in the database
        const attemptResponse = await axios.put(`/api/attempts/${attemptId}`, {
            progress: progress
        });
  
        if (attemptResponse.status !== 200) {
          console.error("Failed to update attempt:", attemptResponse.data);
        }
      }
    } catch (error) {
      console.error("Failed to handle submission:", error);
    }
  }
  

  return (
    <> 
      <h3>{progress} / {questions.length}</h3>
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
