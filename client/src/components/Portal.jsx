import { useState, useEffect, useContext } from 'react';
import "../styles/portal.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Update the path to the correct location of AuthContext.jsx


export default function Portal () {
  const { quizId } = useParams();
  const authContext = useContext(AuthContext);
  const isAuthChecked = authContext.isAuthChecked;
  const isAuthenticated = !!authContext.currentUser;
  const userId = authContext.currentUser?.id;
  console.log("Authenticated?: ", isAuthenticated);

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
        const quizResponse = await axios.get(`/api/quizzes/${quizId}`, { withCredentials: true });
        console.log("Quiz response: ", quizResponse);
        
        // Sort questions by id (or other property)
        const sortedQuestions = quizResponse.data.sort((a, b) => a.id - b.id);
        
        setQuestions(sortedQuestions);
        // Initialize submissions with null values for each question
        setSubmissions(Array(sortedQuestions.length).fill(null));
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    }
  };
  

  const getAttempt = async () => {
    try {
      const attemptResponse = await axios.get(`/api/attempts/${userId}/${quizId}`, { withCredentials: true });
      if (attemptResponse.status === 200) {
        setAttempt(attemptResponse.data);
        setProgress(attemptResponse.data.progress);
        console.log("Fetched attempt:", attemptResponse.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle the case where the attempt does not exist
        initializeAttempt();
      } else {
        console.error('Error fetching attempt:', error);
      }
    }
  };

  const initializeAttempt = async () => {
    try {
      const attemptResponse = await axios.post(`/api/attempts/${userId}/${quizId}`, { withCredentials: true });
      setAttempt(attemptResponse.data);
      setProgress(attemptResponse.data.progress);
      console.log("Initialized attempt: ", attemptResponse.data); // Log initialized attempt
    } catch (error) {
      console.error('Error initializing attempt:', error);
    }
  };

  // Function to fetch submissions for the current attempt
  const fetchAttemptSubmissions = async () => {
    try {
      if (attempt) {
        const submissionsResponse = await axios.get(`/api/submissions/${attempt.id}`, { withCredentials: true });
        console.log("Submissions response: ", submissionsResponse);
        if (submissionsResponse.status === 200) {
          // Initialize an empty object to hold the mapping
          const submissionMap = {};
          // Iterate through the data and add each questionId and submissionChoice to the map
          for (let i = 0; i < submissionsResponse.data.length; i++) {
            const sub = submissionsResponse.data[i];
            submissionMap[sub.questionId] = sub.submissionChoice;
          }
          // Set the submissions state with the constructed map
          setSubmissions(submissionMap);
        }
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };
  

  useEffect(() => {
    const fetchDetails = async () => {
      if (isAuthenticated && isAuthChecked) {
        await fetchQuizDetails();
        await getAttempt(); // Fetch existing attempt or initialize a new one
      }
    };
    fetchDetails();
  }, [userId, quizId, isAuthChecked, isAuthenticated]);

  useEffect(() => {
    // Fetch existing submissions for the attempt after the attempt is set
    const fetchSubmissionsForAttempt = async () => {
      if (attempt) {
        await fetchAttemptSubmissions();
      }
    };
    fetchSubmissionsForAttempt();
  }, [attempt?.id]);

  const incrementProgress = async () => {
    const newProgress = Math.min(progress + 1, questions.length);
    try {
      await axios.patch(`/api/attempts/${attempt.id}`, { progress: newProgress }, { withCredentials: true });
      setProgress(newProgress);
    } catch (error) {
      console.error('Error incrementing progress:', error);
    }
  };

  const handleChoiceSelection = async (choiceIndex) => {
    if (attempt) { // Check if attempt is defined
      try {
        const existingSubmission = submissions[currentQuestionIndex];
        console.log(submissions);
        if (!existingSubmission) {
          // Increment progress only if the question has not been answered
          incrementProgress();
          // Create new submission
          await axios.post(`/api/submissions/${attempt.id}/${questions[currentQuestionIndex].id}`, { submissionChoice: choiceIndex }, { withCredentials: true });
        } else {
          // Update existing submission
          console.log("Attempt id:" , attempt.id);
          console.log("Current question index in questions: ", questions[currentQuestionIndex].id);
          console.log("Current question index", currentQuestionIndex);
          await axios.patch(`/api/submissions/${attempt.id}/${questions[currentQuestionIndex].id}`, { submissionChoice: choiceIndex }, { withCredentials: true });
        }
  
        // Re-fetch submissions to make sure the state is up-to-date
        await fetchAttemptSubmissions();
  
        const newSubmissions = { ...submissions };
        newSubmissions[questions[currentQuestionIndex].id] = choiceIndex;
        setSubmissions(newSubmissions);
      } catch (error) {
        console.error('Error handling answer choice selection:', error);
      }
    } else {
      console.error('Attempt is not defined.');
    }
  };
  

  const renderMultipleChoiceQuestion = (question) => (
    <div className="question-container">
      <h3>{question.questionText}</h3>
      {question.answerChoices.map((choice, index) => (
        <button
          key={index}
          className={`choice-container ${submissions[question.id] === index ? 'highlighted' : ''}`} // Use submissions map
          onClick={() => handleChoiceSelection(index)}
        >
          {choice}
        </button>
      ))}
    </div>
  );
  
  const renderTrueFalseQuestion = (question) => (
    <div className="question-container">
      <h3>{question.questionText}</h3>
      {['True', 'False'].map((choice, index) => (
        <button
          key={index}
          className={`choice-container ${submissions[question.id] === index ? 'highlighted' : ''}`} // Use submissions map
          onClick={() => handleChoiceSelection(index)}
        >
          {choice}
        </button>
      ))}
    </div>
  );

  const renderQuestion = (question) => {
    switch (question.questionType) {
      case 0: // Multiple-choice question
        return renderMultipleChoiceQuestion(question);
      case 1: // True/False question
        return renderTrueFalseQuestion(question);
      // Add more cases if there are other question types
      default:
        return <p>Unknown question type</p>;
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

  return (
    questions.length > 0 &&
    <div className="portal-container">
      {isAuthenticated ? (
        <>
          <div>User ID: {userId}</div>
          <div>Attempt ID: {attempt?.id}</div>
          <div>Question: {currentQuestionIndex + 1}/{questions.length}</div>
          <div>Progress: {progress}/{questions.length}</div>
          {showScore ? (
            <div className="score-container">
              <h2>Your Score:</h2>
              <p>{score.percentage}%</p>
              <p>{score.fraction}</p>
            </div>
          ) : (
            <>
              {renderQuestion(questions[currentQuestionIndex])} {/* Render the question based on its type */}
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
}
