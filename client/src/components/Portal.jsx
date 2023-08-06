import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../styles/portal.css";

export default function Portal() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(`/api/quizzes/${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    }

    fetchQuestions();
  }, [id]);

  return (
    <> 
      <h3>{currentQuestion+1} / {questions.length}</h3>
      <h1 className="question-text">
        {questions[currentQuestion]?.questionText}
      </h1>
      <div className="answer-choices">
        {/* Multiple Choice Container */}
        {questions[currentQuestion]?.questionType === 0 && (
          questions[currentQuestion]?.answerChoices?.map((choice, index) => (
            <button key={index} onClick={() => {
              // CHOOSE ANSWER AND SUBMIT LOGIC
            }}>
              {choice}
            </button>
          ))
        )}
        {/* True/False Container */}
        {questions[currentQuestion]?.questionType === 1 && (
          <>         
            <button >True</button>
            <button >False</button>
          </>
        )}
        {/* True/False Container */}
        {questions[currentQuestion]?.questionType === 2 && (
          <>         
          <input type="text" />
          </>
        )}
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
