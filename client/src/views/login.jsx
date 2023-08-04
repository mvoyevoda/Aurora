import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/signup.css";
import Link from "@mui/material/Link";
import axios from "axios";
import HomeNB from "../components/HomeNB";
import GoogleIcon from '@mui/icons-material/Google';


export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/api/auth/login",
        data: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/app");
    } catch (error) {
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
      }}>
      Log In with Google
    </Button>

      <form onSubmit={handleLogIn} className="signup_form">
        <TextField
          sx={{
            backgroundColor: "rgba(217, 217, 217, 0.20)",
            marginBottom: "10px",
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
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
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
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
            '&:hover': {
              backgroundColor: 'rgba(217, 217, 217, 0.20)',
              borderColor: 'white'
          }

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
            '&:hover': {
              backgroundColor: 'rgba(217, 217, 217, 0.20)',
              borderColor: 'white'
          }
          }}
        >
          Log In
        </Button>
      </form>
    </>
  );
}
