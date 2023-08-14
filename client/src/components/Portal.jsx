import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/portal.css";
import { Button, selectClasses, Typography } from "@mui/material";

export default function Portal() {
  const { quizId } = useParams();
  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser?.id;
  const isAuthChecked = authContext.isAuthChecked;
  const isAuthenticated = !!authContext.currentUser;
  // let calculatedScore = null
  // console.log("Authenticated?: ", isAuthenticated);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
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
    if (currentQuestionIndex !== 0)
      setCurrentQuestionId(questions[currentQuestionIndex].id);
  }, [currentQuestionIndex]);

  const loadData = async () => {
    try {
      const attemptResponse = await axios.get(
        `/api/attempts/${userId}/${quizId}`,
        { withCredentials: true }
      );

      if (attemptResponse.status === 200) {
        setAttempt(attemptResponse.data);
        setProgress(attemptResponse.data.progress);
        setScore(attemptResponse.data.score);
        // console.log("Fetched attempt:", attemptResponse.data);

        try {
          // Fetching submissions for the fetched attempt
          const submissionsResponse = await axios.get(
            `/api/submissions/${attemptResponse.data.id}`,
            { withCredentials: true }
          );

          if (submissionsResponse.status === 200) {
            // Transform the response array to an object of the form: { questionId: submissionChoice, ... }
            const submissionsObject = submissionsResponse.data.reduce(
              (accumulator, submission) => {
                accumulator[submission.questionId] =
                  submission.submissionChoice;
                return accumulator;
              },
              {}
            );

            setSubmissions(submissionsObject);
          }
        } catch (submissionsError) {
          console.error("Error fetching submissions:", submissionsError);
        }
      }
    } catch (attemptError) {
      if (attemptError.response && attemptError.response.status === 404) {
        // Handle the case where the attempt does not exist --> Create a new attempt
        try {
          const attemptResponse = await axios.post(
            `/api/attempts/${userId}/${quizId}`,
            { withCredentials: true }
          );
          setAttempt(attemptResponse.data);
          setProgress(attemptResponse.data.progress);
        } catch (AttemptInitializationError) {
          console.error(
            "Error initializing attempt:",
            AttemptInitializationError
          );
        }
      } else {
        console.error("Error fetching attempt:", attemptError);
      }
    }
  };

  async function fetchQuestions() {
    if (!isAuthChecked || !isAuthenticated) {
      return;
    }
    try {
      const questionsResponse = await axios.get(`/api/quizzes/${quizId}`, {
        withCredentials: true,
      });
      setQuestions(questionsResponse.data);
      setCurrentQuestionId(questionsResponse.data[0].id); //Set to id of first question
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
  }, []);

  function handleSubmission(userChoice) {
    if (Object.keys(submissions).length === 0) {
      setSubmissions({ [currentQuestionId]: userChoice });
      // console.log("Initialization of submissions: " + submissions);
      setProgress((prevProgress) => prevProgress + 1);
    } else {
      // Create a shallow copy of the submissions object
      const updatedSubmissions = { ...submissions };
      JSON.stringify(updatedSubmissions);

      // Update the userChoice of the currentQuestion in the copied object
      updatedSubmissions[currentQuestionId] = userChoice;

      // Check the length before and after to determine progress
      const prevLength = Object.keys(submissions).length;
      setSubmissions(updatedSubmissions);
      const newLength = Object.keys(updatedSubmissions).length;

      // If a new submission was added, increment the progress
      if (newLength > prevLength) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }
  }

  async function handleSubmitQuiz() {
    //1. Update Attempt Progress
    if (attempt.progress < progress) {
      await axios.patch(
        `/api/attempts/${attempt.id}`,
        {
          progress: progress,
        },
        {
          withCredentials: true,
        }
      );
    }
    //2. Update submissionChoice of each submission
    const submissionPromises = Object.keys(submissions).map(
      async (questionId) => {
        try {
          // Try to fetch the submission to check if it exists
          const response = await axios.get(
            `/api/submissions/${attempt.id}/${questionId}`,
            {
              withCredentials: true,
            }
          );

          // If the submission exists (and you get a successful response), PATCH it
          if (response.status === 200) {
            return axios.patch(
              `/api/submissions/${attempt.id}/${questionId}`,
              {
                submissionChoice: submissions[questionId],
              },
              {
                withCredentials: true,
              }
            );
          }
        } catch (error) {
          // If the submission does not exist, indicated by a 404 error from Axios
          if (error.response && error.response.status === 404) {
            console.log("404 logic should be running");
            return axios.post(
              `/api/submissions/${attempt.id}/${questionId}`,
              {
                submissionChoice: submissions[questionId],
              },
              {
                withCredentials: true,
              }
            );
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }
    );

    // Execute all submission PATCH requests concurrently
    await Promise.all(submissionPromises);

    //3. Compare each submission to each question's correctAnswer
    let scoreCounter = 0;
    for (const [questionId, submissionChoice] of Object.entries(submissions)) {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (submissionChoice === question.correctAnswer) {
        scoreCounter++;
      }
    }
    let calculatedScore = (scoreCounter / questions.length) * 100;
    setScore(calculatedScore); // This will update your state for future renders

    await axios.patch(
      `/api/attempts/${attempt.id}/score`,
      {
        score: calculatedScore,
      },
      {
        withCredentials: true,
      }
    );
  }

  let selectedChoice =
    Object.keys(submissions).length !== 0
      ? submissions[currentQuestionId]
      : null;
  // console.log("SELECTED CHOICE: " + selectedChoice)

  return (
    <div>
      <div className="header">
        <div>
          <h3>
            {progress} / {questions.length}
          </h3>
        </div>


        <div style={{ margin: "left", position: "absolute", top: "1.2em", left: "2.5em" }}>
  <Button
    color="inherit"
    href=""
    disableRipple  // Add this prop to disable the ripple effect
    sx={{
      fontSize: "30px",
      height: "10px",
      backgroundColor: "transparent",
      border: "1px solid transparent",
      borderRadius: "4px",
      fontWeight: "bold",  // Changed from "bold: true" to "fontWeight: 'bold'"
      opacity: "0.5",
    }}
  >
    ...
  </Button>
</div>


        <div style={{ position: "absolute", top: "1.2em", right: "2em" }}>
          <Button
            color="inherit"
            href="/dashboard"
            disableRipple
            sx={{
              backgroundColor: "transparent",
              border: "1px solid transparent",
              borderRadius: "4px",
              opacity: "0.5",
              fontSize: "15px"
            }}
          >
            Exit
          </Button>
        </div>

        {/*

        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <p>Attempt ID: {attempt?.id ?? "NONE"} <span style={{ paddingLeft: '2em' }}>User ID: {userId ?? "NONE"}</span></p>
          {score && <p> Score: {score}%</p>}
        </div>

*/}
      </div>

      {/*Given Questions*/}
      <Typography
        variant="h3"
        className="question-text"
        marginTop={"18vh"}
        sx={{ fontFamily: "Helvetica-light" }}
      >
        {questions[currentQuestionIndex]?.questionText}
      </Typography>

      <div className="answer-choices">
        {/* Multiple Choice Container */}
        {questions[currentQuestionIndex]?.questionType === 0 &&
          questions[currentQuestionIndex]?.answerChoices?.map(
            (choice, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleSubmission(index)}
                sx={{
                  color: "white",
                  fontFamily: "Helvetica",
                  display: "block",
                  border: "1px solid white",
                  borderRadius: "1.2em",
                  height: "h",
                  width: "78em",
                  padding: "1em",
                  marginBottom: "3vh", // Add margin between buttons
                  textAlign: "center", // Center the text
                  backgroundColor:
                    selectedChoice === index
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent", // Change background color when selected
                  "&:hover": {
                    borderColor: "white",
                  },
                }}
              >
                {choice}
              </Button>
            )
          )}
        {/* True/False Container */}
        {questions[currentQuestionIndex]?.questionType === 1 && (
          <>
            <Button
              variant="outlined"
              onClick={() => handleSubmission(1)}
              sx={{
                color: "white",
                fontFamily: "Helvetica",
                display: "block",
                border: "1px solid white",
                borderRadius: "1.2em",
                width: "78em",
                padding: "1em",
                marginTop: "5vh",
                marginBottom: "5vh", // Add margin between buttons
                textAlign: "center", // Center the text
                backgroundColor:
                  selectedChoice === 1
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
                "&:hover": {
                  borderColor: "white",
                },
              }}
            >
              True
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSubmission(0)}
              sx={{
                color: "white",
                fontFamily: "Helvetica",
                display: "block",
                border: "1px solid white",
                borderRadius: "1.2em",
                width: "78em",
                padding: "1em",
                marginBottom: "10px", // Add margin between buttons
                textAlign: "center", // Center the text
                backgroundColor:
                  selectedChoice === 0
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
                "&:hover": {
                  borderColor: "white",
                },
              }}
            >
              False
            </Button>
          </>
        )}
        {/* Short Answer Container */}
        {/* {questions[currentQuestion]?.questionType === 2 && (
          <>
            <input type="text" />
          </>
        )} */}
      </div>

      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {currentQuestionIndex !== 0 && (
          <Button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            variant="contained"
            color="primary"
            disableRipple // Disable the ripple effect
            style={{
              background: "transparent",
              fontSize: "3vw", // Responsive font size
              boxShadow: "none",
              marginRight: "2em", // Adjust margin to space out
              position: "fixed",
              right: "37vw",
            }}
          >
            &lt;
          </Button>
        )}
        {progress >= questions.length && (
          <Button
            onClick={handleSubmitQuiz}
            variant="text"
            color="primary"
            sx={{
              position: "relative",
              top: "20vw",
              color: "white",
              fontFamily: "Helvetica",
              display: "block",
              borderRadius: "1.2em",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              width: "15em",
            }}
          >
            Submit Quiz
          </Button>
        )}

        {currentQuestionIndex !== questions.length - 1 && (
          <Button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            variant="contained"
            color="primary"
            disableRipple // Disable the ripple effect
            style={{
              background: "transparent",
              fontSize: "3vw", // Responsive font size
              boxShadow: "none",
              marginLeft: "2em", // Adjust margin to space out
              position: "fixed",
              left: "37vw",
            }}
          >
            &gt;
          </Button>
        )}
      </div>

      <div
        className="bgDiv"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {questions.map((_, index) => (
            <a
              key={index}
              onClick={() => setCurrentQuestionIndex(index)} // Update the current question index
              style={{
                textDecoration: "none",
                fontSize: "2.5em",
                margin: "0.2em",
                padding: "0.1em",
                borderRadius: "50%",
                color:
                  currentQuestionIndex === index
                    ? "white"
                    : "rgba(255, 255, 255, 0.5)",
                cursor: "default",
              }}
            >
              -
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
