import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../styles/portal.css"

export default function Portal() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(`http://localhost:4000/api/quizzes/${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    }

    fetchQuestions();
  }, [id]);

  return (
    <>
      <h1 className="">QUIZ ID: {id}</h1>
      <div className="quiz-container" >
        {questions.length > 0 && (
          <div>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <h3>{question.questionText}</h3>
                {question.questionType === 0 && question.answerChoices.map((choice, choiceIndex) => (
                  <button key={choiceIndex} onClick={() => { /* Handle the click event here */ }}>
                    {choice}
                  </button>
                ))}
                {question.questionType === 1 && (
                  <div>
                    <button onClick={() => { /* Handle true click */ }}>True</button>
                    <button onClick={() => { /* Handle false click */ }}>False</button>
                  </div>
                )}
                {question.questionType === 2 && (
                  <div>
                    <input type="text" placeholder="Enter your answer" />
                  </div>
                )}
                {/* Render other fields as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
