import { useContext, useRef } from "react";
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

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleForgotPasswordClick = () => {
    navigate("/forgotPassword");
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/app");
    } catch (error) {
      // You can show a user-friendly error message here based on the error.
      console.error(`Error: ${error}`);
    }
  };
  
  return (
    <>
      <HomeNB />
      <h1>Log In</h1>
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
            marginBottom: "10px",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          variant="standard"
          color="text"
          label="Email"
          id="email"
          fullWidth="true"
          required
          inputRef={emailRef}
        />
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "10px",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          variant="standard"
          color="text"
          label="Password"
          id="password"
          type="password"
          fullWidth="true"
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
            left: "320px",
          }}
        >
          Forgot password?
        </Link>
        <Button
          href="./signup"
          variant="outlined"
          sx={{
            marginTop: "10px",
            color: "white",
            border: "1px solid",
            borderRadius: "50px",
            display: "block",
            marginBottom: "20px",
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
      </form>
    </>
  );
}
