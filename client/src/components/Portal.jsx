import { useState, useEffect, useContext } from 'react';
import "../styles/portal.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext'; // Update the path to the correct location of AuthContext.jsx

export default function Portal () {
  const { quizId } = useParams(); // Extract quizId from the URL
  const authContext = useContext(AuthContext);
  const isAuthChecked = authContext.isAuthChecked;
  const isAuthenticated = !!authContext.currentUser;
  const userId = authContext.currentUser?.id;

  console.log("User id:", userId);

  const [questions, setQuestions] = useState([]);
  const [attempt, setAttempt] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [score, setScore] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const fetchQuizDetails = async () => {
    if (isAuthenticated) {
      try {
        const quizResponse = await axios.get(`/api/quiz/${quizId}`, { withCredentials: true });
        setQuestions(quizResponse.data.questions);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    }
  };

  const getAttempt = async () => {
    try {
      const attemptResponse = await axios.get(`/api/attempts/${userId}/${quizId}`, { withCredentials: true });
      if (attemptResponse.data) {
        setAttempt(attemptResponse.data);
        setProgress(attemptResponse.data.progress);
      } else {
        initializeAttempt();
      }
    } catch (error) {
      console.error('Error fetching attempt:', error);
    }
  };

  const initializeAttempt = async () => {
    try {
      const attemptResponse = await axios.post(`/api/attempts/${userId}/${quizId}`, { withCredentials: true });
      setAttempt(attemptResponse.data);
      setProgress(attemptResponse.data.progress);
    } catch (error) {
      console.error('Error initializing attempt:', error);
    }
  };

  const incrementProgress = async () => {
    const newProgress = Math.min(progress + 1, questions.length);
    try {
      await axios.patch(`/api/attempts/${attempt.id}/progress`, { progress: newProgress }, { withCredentials: true });
      setProgress(newProgress);
    } catch (error) {
      console.error('Error incrementing progress:', error);
    }
  };

  const handleChoiceSelection = async (choiceIndex) => {
    try {
      await axios.post(`/api/submission/${attempt.id}/${questions[currentQuestionIndex].id}`, { choiceIndex }, { withCredentials: true });
      setSelectedChoiceIndex(choiceIndex);
      incrementProgress();
    } catch (error) {
      console.error('Error handling answer choice selection:', error);
    }
  };

  const handleSubmitQuiz = () => {
    let questionsCorrect = 0;
    submissions.forEach((submission, index) => {
      if (submission.choiceIndex === questions[index].correctAnswerIndex) {
        questionsCorrect++;
      }
    });

    const scorePercentage = (questionsCorrect / questions.length) * 100;
    const scoreFraction = `${questionsCorrect}/${questions.length}`;

    setScore({ percentage: scorePercentage, fraction: scoreFraction });
    setShowScore(true);
  };

  const renderMultipleChoiceQuestion = (question) => (
    <div className="question-container">
      {question.choices.map((choice, index) => (
        <div
          key={index}
          className={`choice-container ${selectedChoiceIndex === index ? 'highlighted' : ''}`}
          onClick={() => handleChoiceSelection(index)}
        >
          {choice}
        </div>
      ))}
    </div>
  );

  const renderTrueFalseQuestion = (question) => (
    <div className="question-container">
      <h3>{question.text}</h3> {/* Display the question text */}
      {['True', 'False'].map((choice, index) => (
        <div
          key={index}
          className={`choice-container ${selectedChoiceIndex === index ? 'highlighted' : ''}`}
          onClick={() => handleChoiceSelection(index)}
        >
          {choice}
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    if (isAuthenticated && isAuthChecked) { 
      fetchQuizDetails();
      getAttempt(); // Fetch existing attempt or initialize a new one
    }
  }, [quizId, userId, isAuthenticated, isAuthChecked]);

  return (
    <div className="portal-container">
      {isAuthenticated ? (
        <>
          {showScore ? (
            <div className="score-container">
              <h2>Your Score:</h2>
              <p>{score.percentage}%</p>
              <p>{score.fraction}</p>
            </div>
          ) : (
            <>
              {questions[currentQuestionIndex]?.type === 0
                ? renderMultipleChoiceQuestion(questions[currentQuestionIndex])
                : renderTrueFalseQuestion(questions[currentQuestionIndex])}
              {currentQuestionIndex > 0 && <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Previous</button>}
              {currentQuestionIndex < questions.length - 1 && <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>}
              {progress >= questions.length && <button onClick={handleSubmitQuiz}>Submit Quiz</button>}
            </>
          )}
        </>
      ) : (
        <p>Please log in to take the quiz.</p>
      )}
    </div>
  );
};
