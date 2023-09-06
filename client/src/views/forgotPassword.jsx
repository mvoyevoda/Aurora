import { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button } from "@mui/material";
import HomeNB from "../components/HomeNB";
import "../styles/auth.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgotPassword", {
        email,
      });
      setMessage("Email has been sent.");
    } catch (error) {
      setMessage("Email not found.");
    }
  };

  return (
    <div className="forgot-password">
      <HomeNB />
      <Container>
        <h1>Forgot Password</h1>
        <Typography sx={{ marginTop: "20px" }}>{message}</Typography>
        <form onSubmit={handleForgotPassword} className="form">
          <TextField
            sx={{
              backgroundColor: "rgba(217, 217, 217, 0.20)",
              marginBottom: "1.25em",
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
            type="email"
            name="email"
            label="Enter your email"
            variant="filled"
            color="text"
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            variant="outlined"
            type="submit"
            sx={{
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
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
