import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import HomeNB from "../components/HomeNB";
import { AuthContext } from "../AuthContext";
import "../styles/auth.css";

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
      window.location.href = "/generator"; 
    } catch (error) {
      if (error.message.includes("401")) {
        setErrorMessage("An unexpected error occured. Try again.");
      } else {
        setErrorMessage("Invalid email or password.");
      }
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div className="login">
      <HomeNB />
      <div className="auth-container">
      {errorMessage && (
        <p style={{ color: "rgba(245, 245, 245)" }}>{errorMessage}</p>
      )}
      <form onSubmit={handleLogIn} className="auth-form">
        <h1>Log In</h1>
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginTop: "2em",
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
          disableUnderline
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
        <div className="forgot-pass">
          <Link style={{ textDecoration: "none", color: "white" }}>
            <Button
              onClick={handleForgotPasswordClick}
              variant="p"
              color="inherit"
              sx={{
                position: "relative",
                alignItems: "right",
                cursor: "pointer",
                '@media (max-width: 700px)':{
                  left: "5em",

                },
              }}
            >
              Forgot password?
            </Button>
          </Link>
        </div>

        <div className="auth-btns">
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              marginTop: "0.625em",
              color: "white",
              border: "1px solid",
              borderRadius: "50px",
              marginBottom: "1em",
              height: "50%",
              width: "100%",
              "&:hover": {
                borderColor: "white",
                border: "3px solid", // Increased border thickness to 3px
                backgroundColor: "transparent",
                // fontWeight: "500",
                boxShadow: "none",
            },
            }}
          >
            Don&apos;t have an account?
          </Button>
          </Link>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              color: "white",
              border: "1px solid",
              width: "100%",
              height: "50%",
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
            Log In
          </Button>
        </div>
        
      </form>
      </div>
      
    </div>
  );
}
