import axios from 'axios';
// import { useNavigate } from "react-router-dom";
//import "../styles/configurator.css"
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import "../styles/signup.css";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  configurator: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
  },
  input: {
    background: "rgba(217, 217, 217, 0.20)",
    borderRadius: "1em", 
    padding: "0.5em", 
    width: "50em",
    
  },
  slider: {
    margin: "0.5em 0", 
    width: "50em",

  },
  button: {
    margin: "1em 0", 
    width: "58em",
    borderRadius: "1em", 
  },
}));

export default function Configurator() {
  const classes = useStyles();
  // const navigate = useNavigate();
  const [questions, setQuestions] = useState(10);
  const [minutes, setMinutes] = useState(15);
  const [difficulty, setDifficulty] = useState(2); // 1 to 5: very easy to very hard
  const [loading, setLoading] = useState(false)
  
  const handleQuestionsChange = (event, value) => {
    setQuestions(value);
  };

  const handleMinutesChange = (event, value) => {
    setMinutes(value);
  };

  const handleDifficultyChange = (event, value) => {
    setDifficulty(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.prompt.value;
    const questions = e.target.questions.value;
    const minutes = e.target.mins.value;
    const difficulty = e.target.difficulty.value;

    setLoading(true)

    try {
      const response = await axios.post("/api/openAI/generate", {
        prompt,
        questions,
        minutes,
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
    <>
      <div className={classes.configurator}>
      <form onSubmit={handleSubmit}>
        <Input
          required
          color="text"
          type="text"
          name="prompt"
          className={classes.input}
          placeholder="summarize the quiz topic in a few words... "
          inputProps={{ style: { color: 'white' } }}
        />
        <div className={classes.slider}>
        <label htmlFor="questions-slider" style={{ textAlign: 'left' }}>
            {questions} questions
          </label>
          <Slider
            value={questions}
            name="questions"
            onChange={handleQuestionsChange}
            step={1}
            min={5}
            max={25}
            valueLabelDisplay="auto"
            aria-labelledby="questions-slider"
            sx={{ color: 'white' }} 
          />
        </div>
        <div className={classes.slider}>
        <label htmlFor="minutes-slider">
            {minutes} minutes
          </label>
          <Slider
            value={minutes}
            name="mins"
            onChange={handleMinutesChange}
            step={5}
            min={5}
            max={60}
            valueLabelDisplay="auto"
            aria-labelledby="minutes-slider"
            sx={{ color: 'white' }} 
          />
        </div>
        <div className={classes.slider}>
        <label htmlFor="difficulty-slider" >
            {difficulty === 1 ? "Very Easy" : difficulty === 2 ? "Easy" : difficulty === 3 ? "Medium" : difficulty === 4 ? "Hard" : "Very Hard"} difficulty
          </label>
          <Slider
            value={difficulty}
            name="difficulty"
            onChange={handleDifficultyChange}
            step={1}
            min={1}
            max={5}
            valueLabelDisplay="auto"
            // marks={[
            //   { value: 1, label: "Very Easy" },
            //   { value: 2, label: "Easy" },
            //   { value: 3, label: "Medium" },
            //   { value: 4, label: "Hard" },
            //   { value: 5, label: "Very Hard" },
            // ]}
            aria-labelledby="difficulty-slider"
            sx={{ color: 'white' }} 
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
              width: "100%",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "rgba(217, 217, 217, 0.20)",
                borderColor: "white",
              },
            }}
          >
            Generate
          </Button>
        }

      </form>
    </div>
    </>
  );

}