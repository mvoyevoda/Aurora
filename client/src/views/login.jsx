import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/signup.css";
import Link from "@mui/material/Link";
import HomeNB from "../components/HomeNB";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../contexts/AuthContext";

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleForgotPasswordClick = () => {
    navigate("/forgotPassword");
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/generator");
    } catch (error) {
      if(error.message.includes("401")) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("An unexpected error has occured. Try again.");
      }
      console.error(`Error: ${error}`);
    }
  };
  
  return (
    <>
      <HomeNB />
      <h1>Log In</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={() => {
          // Handle the "Sign Up with Google" button click
        }}
      >
        Log In with Google
      </Button>

      <form onSubmit={handleLogIn} className="signup_form">
      <TextField
        sx={{
          backgroundColor: "rgba(217, 217, 217, 0.20)",
          marginBottom: "0.625em", 
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
        }}
        variant="standard"
        color="text"
        label="Email"
        id="email"
        fullWidth 
        required
        inputRef={emailRef}
      />
      <TextField
        sx={{
          backgroundColor: "rgba(217, 217, 217, 0.20)",
          marginBottom: "0.625em", 
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
        }}
        variant="standard"
        color="text"
        label="Password"
        id="password"
        type="password"
        fullWidth 
        required
        inputRef={passwordRef}
      />
      <Link
        onClick={handleForgotPasswordClick}
        href="#"
        variant="p"
        color="inherit"
        sx={{
          position: "relative",
          left: "20em", 
        }}
      >
        Forgot password?
      </Link>
      <Button
        href="./signup"
        variant="outlined"
        sx={{
          marginTop: "0.625em", 
          color: "white",
          border: "1px solid",
          borderRadius: "50px",
          display: "block",
          marginBottom: "1.25em", 
          "&:hover": {
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            borderColor: "white",
          },
        }}
      >
        Don&apos;t have an account?
      </Button>
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
        Log In
      </Button>
    </form>    </>
  );
}
