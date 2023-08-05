import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
    borderRadius: "4px", // Replace with your desired value in pixels or use a numeric value
    padding: "8px", // Replace with your desired value in pixels or use a numeric value
    margin: "8px 0", // Replace with your desired value in pixels or use a numeric value
  },
  slider: {
    width: "200px", // Replace with your desired value in pixels or use a numeric value
    margin: "8px 0", // Replace with your desired value in pixels or use a numeric value
  },
  button: {
    margin: "16px 0", // Replace with your desired value in pixels or use a numeric value
  },
}));

export default function Configurator() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(10);
  const [minutes, setMinutes] = useState(15);
  const [difficulty, setDifficulty] = useState(2); // 1 to 5: very easy to very hard
  
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
        //window.location.href = `http://localhost:5173/portal/:id`;
        navigate(`/portal/${id}`);
      } else {
        console.error("Failed to generate quiz");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={classes.configurator}>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="prompt"
          className={classes.input}
          placeholder="summarize the quiz topic in a few words... "
        />
        <div className={classes.slider}>
        <label htmlFor="questions-slider">
            {questions} questions
          </label>
          <Slider
            value={questions}
            onChange={handleQuestionsChange}
            step={1}
            min={5}
            max={25}
            valueLabelDisplay="auto"
            aria-labelledby="questions-slider"
          />
        </div>
        <div className={classes.slider}>
        <label htmlFor="minutes-slider">
            {minutes} minutes
          </label>
          <Slider
            value={minutes}
            onChange={handleMinutesChange}
            step={5}
            min={5}
            max={60}
            valueLabelDisplay="auto"
            aria-labelledby="minutes-slider"
          />
        </div>
        <div className={classes.slider}>
        <label htmlFor="difficulty-slider">
            {difficulty === 1 ? "Very Easy" : difficulty === 2 ? "Easy" : difficulty === 3 ? "Medium" : difficulty === 4 ? "Hard" : "Very Hard"} difficulty
          </label>
          <Slider
            value={difficulty}
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
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Generate
        </Button>
      </form>
    </div>
  );

}
