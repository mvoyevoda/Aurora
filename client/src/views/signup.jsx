import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/signup.css";
import Link from "@mui/material/Link";
import HomeNB from "../components/HomeNB";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../contexts/AuthContext";

export default function SignUp() {
  const full_nameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(
        full_nameRef.current.value,
        userNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/app");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <HomeNB />
      <h1>Sign Up</h1>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={() => {
          // Handle the "Sign Up with Google" button click
        }}
      >
        Sign Up with Google
      </Button>

      <form onSubmit={handleSignUp} className="signup_form">
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "10px",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          color="text"
          variant="filled"
          label="Full Name"
          id="full_name"
          fullWidth="true"
          required
          inputRef={full_nameRef}
        />
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "10px",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          color="text"
          variant="filled"
          label="Username"
          id="username"
          fullWidth="true"
          required
          inputRef={userNameRef}
        />
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "10px",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          color="text"
          variant="filled"
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
          color="text"
          variant="filled"
          label="Password"
          id="password"
          type="password"
          fullWidth="true"
          required
          inputRef={passwordRef}
        />
        <Link
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
          href="./login"
          variant="outlined"
          sx={{
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
          Already have an account?
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
          Sign Up
        </Button>
      </form>
    </>
  );
}
