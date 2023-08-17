import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/signup.css";
import {Link} from "react-router-dom"
import HomeNB from "../components/HomeNB";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../AuthContext";

export default function SignUp() {
  const full_nameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

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
      window.location.href = "/generator"; 
    } catch (error) {
      console.error(`Error: ${error}`);
      if (error.response) {
        setErrorMessage("You already have an account.");
      } else {
        setErrorMessage("An unexpected error has occured. Try again.");
      }
    }
  };

  return (
    <>
      <HomeNB />
      <h1 style={{ marginTop: "12vh" }}>Sign Up</h1>
      <form onSubmit={handleSignUp} className="auth-form">
        {errorMessage && (
          <div className="error-message" style={{ marginBottom: "1rem" }}>
            {errorMessage}
          </div>
        )}
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "1rem",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          color="text"
          variant="filled"
          label="Full Name"
          id="full_name"
          fullWidth={true}
          required
          inputRef={full_nameRef}
        />
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "1rem",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          color="text"
          variant="filled"
          label="Username"
          id="username"
          fullWidth={true}
          required
          inputRef={userNameRef}
        />
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "1rem",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          color="text"
          variant="filled"
          label="Email"
          id="email"
          fullWidth={true}
          required
          inputRef={emailRef}
        />
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "1rem",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
          color="text"
          variant="filled"
          label="Password"
          id="password"
          type="password"
          fullWidth={true}
          required
          inputRef={passwordRef}
        />
        <Link to="/login" style={{textDecoration: 'none'}}>
          <Button
            variant="outlined"
            sx={{
              marginTop: "0.625em",
              color: "white",
              border: "1px solid",
              borderRadius: "50px",
              display: "block",
              marginBottom: "1.25em",
              width: "100%",
              "&:hover": {
                borderColor: "white",
                border: "3px solid",
                backgroundColor: "transparent",
                fontWeight: "500",
                boxShadow: "none",
            },
            }}
          >
            Already have an account?
          </Button>
        </Link>
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
              borderColor: "white",
              border: "3px solid", // Increased border thickness to 3px
              backgroundColor: "transparent",
              fontWeight: "500",
              boxShadow: "none",
          },
          }}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
}
