import axios from 'axios';
// import { useNavigate } from "react-router-dom";
//import "../styles/configurator.css"
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import "../styles/configurator.css";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  // configurator: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: "100vh",
  //   width: "100vw",
  // },
  // input: {
  //   // background: "rgba(217, 217, 217, 0.20)",
  //   borderRadius: "1em", 
  //   padding: "0.5em", 
  //   width: "50em",
    
  // },
  
  slider: {
    // margin: "0.5em 0", 
    width: "50%",
    "& .MuiSlider-root": {
      color: "white", // Change the slider color to grey
      // opacity: '0.5',

      height: 4, // Adjust the height of the slider track
      "&:focus, &:active": {
        color: "white", // Change the slider color to grey
        // opacity: '1.0',  
        height: "6"
      },
    },
    "& .MuiSlider-thumb": {
      width: 14, // Adjust the width of the slider thumb
      height: 14, // Adjust the height of the slider thumb
      color: "white", // Change the slider color to grey
      // opacity: '0.7',

      "&:focus, &:active": {
        width: 18, // Increase width when focused/active
        height: 18, // Increase height when focused/active
        color: "white", // Change the slider color to grey
        // opacity: '1.0',  

      },
    },
  

  },
  label: {
    display: "flex",
    color: 'white', 
    textAlign: 'center',
    fontWeight: "100"
  },
  // button: {
  //   margin: "1em 0", 
  //   width: "58em",
  //   borderRadius: "1em", 
  // },
}));


export default function Configurator() {
  const classes = useStyles();
  // const navigate = useNavigate();
  const [questions, setQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState(2); // 1 to 5: very easy to very hard
  const [loading, setLoading] = useState(false)
  
  const handleQuestionsChange = (event, value) => {
    setQuestions(value);
  };
  const handleDifficultyChange = (event, value) => {
    setDifficulty(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const prompt = e.target.prompt.value;
    const questions = e.target.questions.value;
    const difficulty = e.target.difficulty.value;

    try {
      const response = await axios.post("/api/openAI/generate", {
        prompt,
        questions,
        //minutes,
        difficulty,
      });

      // If successful, redirect to the new URL with the ID from the response
      if (response.data.success) {
        const id = response.data.id;
        window.location.href = `http://localhost:5173/portal/${id}`;
        //navigate(`/portal/${id}`);
      } else {
        console.error("Failed to generate quiz");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (

      <div className="configurator">

      <div className='header'>
        <div className="header-left"></div>
        <div className="header-mid"></div>
        <div className="header-right">
          <Button href="/logout"/>
        </div>
      </div>

      {/* <Input /> */}

      <div className="main-container">
       
        <form onSubmit={handleSubmit}>
        <p>uighiughiu</p>
          {/* <Input
            required
            color="text"
            type="text"
            name="prompt"
            className={classes.input}
            disableUnderline
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.05)", 
              '@media (max-width: 700px)':{
                width: '100%',
                fontSize: '0.8em',
                marginBottom: '1em',
              }
            }}
            placeholder="summarize the quiz topic in a few words... "
            inputProps={{ 
              style: { 
                color: 'white', 
                opacity: '0.8', 
                textAlign:'center',
                fontWeight: "100"
              } 
            }}
          /> */}
          <input />

          {/* <div className={classes.slider}>
            <label htmlFor="questions-slider" className={classes.label} >
              {questions} questions
            </label>
            <Slider
              value={questions}
              name="questions"
              onChange={handleQuestionsChange}
              step={1}
              min={5}
              max={25}
              aria-labelledby="questions-slider"
              sx={{ color: 'white' ,
              '@media (max-width: 700px)':{
                width: '32vh',
                position: 'relative',
                right: '17.5em',
              }}} 

            />
          </div>

          <div className={classes.slider}>
            <label htmlFor="difficulty-slider" className={classes.label}>
              {difficulty === 1 ? "Very Easy" : difficulty === 2 ? "Easy" : difficulty === 3 ? "Medium" : difficulty === 4 ? "Hard" : "Very Hard"} 
            </label>
            <Slider
              value={difficulty}
              name="difficulty"
              onChange={handleDifficultyChange}
              step={1}
              min={1}
              max={5}
              // marks={[
              //   { value: 1, label: "Very Easy" },
              //   { value: 2, label: "Easy" },
              //   { value: 3, label: "Medium" },
              //   { value: 4, label: "Hard" },
              //   { value: 5, label: "Very Hard" },
              // ]}
              aria-labelledby="difficulty-slider"
              sx={{ color: 'white',
              '@media (max-width: 700px)':{
                width: '32vh',
                position: 'relative',
                right: '17.5em',
              }
              }} 
            />
          </div>

          {loading ?        
            <p className="loading">Generating...</p>
            :
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              sx={{
                backgroundColor: 'transparent',
                color: "white",
                border: "1px solid",
                display: "block",
                width: "97vh",
                borderRadius: "50px",
                
                "&:hover": {
                  backgroundColor: "rgba(217, 217, 217, 0.20)",
                  borderColor: "white",
                },
              }}
            >
              Generate
            </Button>
          } */}

          </form>
      </div>

      <div className="footer"></div>

    </div>

  );

}