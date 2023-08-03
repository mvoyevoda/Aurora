import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Portal() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`http://localhost:4000/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    }

    fetchQuiz();
  }, [id]);

  return (
    <>
      <h1 className="">welcome to portal. quiz id: {id}</h1>
      {quiz && (
        <div>
          <h2>{quiz.category}</h2>
          <p>Number of questions: {quiz.quizLength}</p>
          <p>Difficulty: {quiz.difficulty}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </>
  );
}
