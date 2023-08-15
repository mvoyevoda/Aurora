import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/portal.css";
import { Button, Modal, Typography, Box } from "@mui/material";

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
        setScore(attemptResponse.data.score);
        // console.log("Fetched attempt:", attemptResponse.data);
  
        try {
          // Fetching submissions for the fetched attempt
          const submissionsResponse = await axios.get(`/api/submissions/${attemptResponse.data.id}`, { withCredentials: true });
          
          if (submissionsResponse.status === 200) {
            // Transform the response array to an object of the form: { questionId: submissionChoice, ... }
            const submissionsObject = submissionsResponse.data.reduce((accumulator, submission) => {
              accumulator[submission.questionId] = submission.submissionChoice;
              return accumulator;
            }, {});
        
            setSubmissions(submissionsObject);
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
    //1. Update Attempt Progress
    if (attempt.progress < progress){
      await axios.patch(`/api/attempts/${attempt.id}`, {
        progress: progress
      }, {
        withCredentials: true
      })
    }
    //2. Update submissionChoice of each submission
    const submissionPromises = Object.keys(submissions).map(async (questionId) => {
      try {
        // Try to fetch the submission to check if it exists
        const response = await axios.get(`/api/submissions/${attempt.id}/${questionId}`, {
          withCredentials: true
        });
    
        // If the submission exists (and you get a successful response), PATCH it
        if (response.status === 200) {
          return axios.patch(`/api/submissions/${attempt.id}/${questionId}`, {
            submissionChoice: submissions[questionId]
          }, {
            withCredentials: true
          });
        }
      } catch (error) {
        // If the submission does not exist, indicated by a 404 error from Axios
        if (error.response && error.response.status === 404) {
          console.log("404 logic should be running");
          return axios.post(`/api/submissions/${attempt.id}/${questionId}`, {
            submissionChoice: submissions[questionId]
          }, {
            withCredentials: true
          });
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    });
    
    // Execute all submission PATCH requests concurrently
    await Promise.all(submissionPromises);

    //3. Compare each submission to each question's correctAnswer
    let scoreCounter = 0;
    for (const [questionId, submissionChoice] of Object.entries(submissions)) {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (submissionChoice === question.correctAnswer) {
        scoreCounter++;
      }
    }
    let calculatedScore = (scoreCounter / questions.length) * 100;
    setScore(calculatedScore);  // This will update your state for future renders
    
    await axios.patch(`/api/attempts/${attempt.id}/score`, {
      score: calculatedScore
    }, {
      withCredentials: true
    });    

  }

  let selectedChoice = Object.keys(submissions).length !== 0? submissions[currentQuestionId] : null

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalContent = (
    <Box
      sx={{
        width: "20vw", // Adjusted width
        height: "40vh", // Adjusted height
        bgcolor: "background.paper",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between", // Changed to space between buttons
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
        borderRadius: 5,
      }}
    >
      <Button
        onClick={closeModal}
        variant="contained"
        sx={{ 
          width: "95%", 
          height: "30%", 
          borderRadius: 5,
          fontSize: "20px", 
          textTransform: "none",
          alignItems: "center",
          backgroundColor: "#00A3FF",
        }}
      >
        Resume
      </Button>
      <Button
        href="/dashboard"
        variant="outlined"
        color="primary"
        sx={{ 
          width: "95%", 
          height: "30%", 
          borderRadius: 5,
          fontSize: "20px", 
          textTransform: "none",
          alignItems: "center",
          "&:hover": {
            border: "2px solid", // Thicker border on hover
          },
        }}
      >
        Exit
      </Button>
      <Button
        onClick={() => {
          // Add your logic here for regenerating
        }}
        variant="contained"
        color="primary"
        sx={{ 
          width: "95%", 
          height: "30%", 
          borderRadius: 5,
          fontSize: "20px", 
          textTransform: "none",
          alignItems: "center",
          backgroundColor: "#FF00F5",
          "&:hover": {
            backgroundColor: "#B800B0"
          },
        }}
      >
        Regenerate
      </Button>
    </Box>
  );

  return (
    <div className="portal">

      <div className='header'>

        <div className="header-left">
        <Button
            color="inherit"
            onClick={openModal} // Call openModal when the button is clicked
            disableRipple
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              opacity: "0.7",
            }}
          >
            •••
          </Button>
        </div>
        <div className="header-mid">
            <p>Quiz #{quizId}</p>
        </div>
        <div className="header-right"> <p> {progress} / {questions.length} </p></div>

        {/* <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <p>Attempt ID: {attempt?.id ?? "NONE"} <span style={{ paddingLeft: '2em' }}>User ID: {userId ?? "NONE"}</span></p>
          {score && <p> Score: {score}%</p>}
        </div> */}

      </div>

      {/* ------------------------------------------------------------------------ */}

      <div className="main-container">

        <div className="overlay"></div>
        {/* Modal */}
        <Modal open={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>

        <div className="left">
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
                // marginRight: "2em", // Adjust margin to space out
                // position: "fixed",
                // right: "37vw"
              }}
            >
              &lt;
            </Button>
          )}
        </div>

        <div className="quiz-container">
          {/*Given Questions*/}
          <div className="question">
            {/* <Typography
              variant="p"
              sx={{
                fontSize: "100%",
              }}
            >
              {questions[currentQuestionIndex]?.questionText}
            </Typography> */}
            {questions[currentQuestionIndex]?.questionText}
          </div>
          <div className="choices">
            {/* Multiple Choice Container */}
            {questions[currentQuestionIndex]?.questionType === 0 &&
              questions[currentQuestionIndex]?.answerChoices?.map(
                (choice, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleSubmission(index)}
                    className="choice"
                    disableRipple
                    sx={{
                        width: "98%",
                        margin: "1%",
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "1.5em",
                        textTransform: "none",
                        borderColor: "white",
                        height: "40%",
                        opacity: (selectedChoice === index ? "1.0" : "0.7"),
                        "&:hover": {
                          opacity: "1.0", // Change opacity on hover
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                        backgroundColor: selectedChoice === index ? "rgba(255, 255, 255, 0.2)" : "transparent",
                        "&:active": {
                          backgroundColor: "white", // Change background color when clicked
                          color: "black", // Change text color when clicked
                          // transition: "background-color 1s, color 1s", // Apply transition for click
                          // // Add any other styles you want to change when clicked
                        },
                        "&:not(:active)": {
                          transition: "background-color 0.5s, color 0.5s", // Apply transition after click
                        },
                      }}
                  >
                    {choice}
                  </Button>
                )
              )}
          {/* </div> */}

            {/* True/False Container */}
            {questions[currentQuestionIndex]?.questionType === 1 && (
              <>
              {/* <div className="true-false"> */}
                <Button
                  variant="outlined"
                  onClick={() => handleSubmission(1)}
                  disableRipple
                  sx={{
                    width: "98%",
                    margin: "1%",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "1.5em",
                    textTransform: "none",
                    borderColor: "white",
                    height: "40%",
                    opacity: (selectedChoice === 1 ? "1.0" : "0.7"),
                    "&:hover": {
                      opacity: "1.0", // Change opacity on hover
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                    backgroundColor: selectedChoice === 1 ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    "&:active": {
                      backgroundColor: "white", // Change background color when clicked
                      color: "black", // Change text color when clicked
                      // transition: "background-color 1s, color 1s", // Apply transition for click
                      // // Add any other styles you want to change when clicked
                    },
                    "&:not(:active)": {
                      transition: "background-color 0.5s, color 0.5s", // Apply transition after click
                    },
                  }}
                >
                  True
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleSubmission(0)}
                  disableRipple
                  sx={{
                    width: "98%",
                    margin: "1%",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "1.5em",
                    textTransform: "none",
                    borderColor: "white",
                    height: "40%",
                    opacity: (selectedChoice === 0? "1.0" : "0.7"),
                    "&:hover": {
                      opacity: "1.0", // Change opacity on hover
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                    backgroundColor: selectedChoice === 0 ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    "&:active": {
                      backgroundColor: "white", // Change background color when clicked
                      color: "black", // Change text color when clicked
                      // transition: "background-color 1s, color 1s", // Apply transition for click
                      // // Add any other styles you want to change when clicked
                    },
                    "&:not(:active)": {
                      transition: "background-color 0.5s, color 0.5s", // Apply transition after click
                    },
                  }}
                >
                  False
                </Button>
                </>
            )}
            </div>


        </div>

        <div className="right">
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
                // marginLeft: "2em", // Adjust margin to space out
                // position: "fixed",
                // left: "37vw"
              }}
            >
              &gt;
            </Button>
          )}
        </div>

      </div>

      {/* ------------------------------------------------------------------------ */}

      <div className="footer">
      
        {/* <div className="submit-quiz"> */}
          {(progress >= questions.length && currentQuestionIndex === questions.length-1) ? (
            <Button
              onClick={handleSubmitQuiz}
              variant="text"
              color="primary"
              sx={{
                // position: "relative",
                // top: "20vw",
                // color: 'white',
                // fontFamily: 'Helvetica',
                // display: 'block',
                // borderRadius: '1.2em',
                // backgroundColor: 'rgba(255, 255, 255, 0.1)',
                // width: "15em",
                textTransform: "none",
                fontSize: "20px",
                color: "white",
                fontWeight: "100",
                opacity: "0.7",
                "&:hover": {
                  opacity: "1.0", // Change opacity on hover
                },
              }}
            >
              Submit
            </Button>
          ) : 
          <div className="link-ladder">
            {questions.map((link, index) => (
              <a
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}  // Update the current question index
                style={{
                color: (submissions[questions[index].id] !== undefined)
                ? "white"
                : "rgba(255, 255, 255, 0.5)",              
                }}
              >
                -
              </a>
            ))}
          </div>
          }

          


      </div>

    </div>

  )
}