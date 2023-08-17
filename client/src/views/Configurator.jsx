import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import LogoutButton from "../components/LogoutButton"
import { useMediaQuery, useTheme } from "@mui/material";
import "../styles/configurator.css";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  slider: {
    width: "50%",
    "& .MuiSlider-root": {
      color: "white",
      height: 7, // Adjust the height of the slider track
      // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      "&:focus, &:active": {
        color: "white", 
        height: "6"
      },
    },
    "& .MuiSlider-thumb": {
      width: 25, // Adjust the width of the slider thumb
      height: 25, // Adjust the height of the slider thumb
      color: "white", // Change the slider color to grey
    },
    "& .MuiSlider-thumb.Mui-active": {
      height: 30,
      width: 30,
      outline: "none",
      // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    },
    "& .MuiSlider-thumb:hover": {
      boxShadow: "none !important",
    },
    "& .MuiSlider-thumb.Mui-focusVisible": {
      boxShadow: "none !important",
    },
    // "& .MuiTouchRipple-root": {
    //   display: 'none',
    // },
    // "& .MuiTouchRipple-thumb": {
    //   display: 'none',
    // },
  },
  label: {
    display: "flex",
    color: 'white', 
    textAlign: 'center',
    fontWeight: "100"
  },
}));


export default function Configurator() {
  const classes = useStyles();
  // const navigate = useNavigate();
  const [questions, setQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState(3); // 1 to 5: very easy to very hard
  const [loading, setLoading] = useState(false)
  // const [inputCentering, setInputCentering] = setInputCentering(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
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

      <div className='config-header'>
        <div className="config-header-left"></div>
        <div className="config-header-mid"></div>
        <div className="config-header-right">
          <LogoutButton />
        </div>
      </div>

      {/* <Input /> */}

      <div className="config-main-container">
       
        <form className="config-form" onSubmit={handleSubmit}>

          <div className="config-form-inputs">
            <Input
              required
              color="text"
              type="text"
              name="prompt"
              className={classes.input}
              // onInput={() => setInputCentering(true)}
              disableUnderline
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)", 
                // '@media (max-width: 700px)':{
                //   width: '100%',
                //   fontSize: '0.8em',
                //   marginBottom: '1em',
                // }
                borderRadius: "30px",
                width: "50%",
                height: "2rem",
                padding: "2rem",
              }}
              placeholder="summarize the quiz topic in a few words... "
              inputProps={{ 
                style: { 
                  color: 'white', 
                  opacity: '0.8', 
                  // textAlign:'center',
                  fontWeight: "100",
                  fontSize: "1.5rem",
                  textAlign: "center",
                } 
              }}
            />

            <div className={classes.slider}>
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
                // sx={{ 
                //   color: 'white' ,
                //   '@media (max-width: 700px)':{
                //     width: '32vh',
                //     position: 'relative',
                //     right: '17.5em',
                //   }
                // }} 

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
                // sx={{ 
                  // color: 'white',
                  // '@media (max-width: 700px)':{
                  //   width: '32vh',
                  //   position: 'relative',
                  //   right: '17.5em',
                  // }
                // }} 
              />
            </div>
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
                width: isMobile ? "90vw" : "50vw",
                height: "15%",
                textTransform: "none",
                borderRadius: "50px",
                fontSize: "200%",
                fontWeight: "100",
                alignItems: "center",
                boxShadow: "none",
                opacity: "0.7",
                "&:hover": {
                    borderColor: "white",
                    border: "3px solid", // Increased border thickness to 3px
                    backgroundColor: "transparent",
                    fontWeight: "500",
                    boxShadow: "none",
                    opacity: "1.0",
                },
              }}
            >
              Generate
            </Button>
          }

          </form>
      </div>

      <div className="config-footer">
        <Button
          color="inherit"
          href="/dashboard"
          disableRipple
          sx={{
            fontSize: "1rem",
            fontWeight: "100",
            opacity: "0.7",
            textTransform: "none",
            "&:hover": {
              opacity: "1.0",
              backgroundColor: "transparent",
            }
          }}
        >
          <KeyboardDoubleArrowDownIcon /> Dashboard <KeyboardDoubleArrowDownIcon />
        </Button>
      </div>

    </div>

  );

}