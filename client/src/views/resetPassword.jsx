import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";
import { Button, TextField } from "@mui/material";


export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(`/api/auth/resetPassword/${token}`, {
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <TextField
            sx={{
              backgroundColor: "rgba(217, 217, 217, 0.20)",
              marginBottom: "1.25em",
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
            type="password"
            name="password"
            label="New Password"
            variant="filled"
            color="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

        <TextField
            sx={{
              backgroundColor: "rgba(217, 217, 217, 0.20)",
              marginBottom: "1.25em",
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
            type="password"
            name="password"
            label="Confirm Password"
            variant="filled"
            color="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Reset Password
          </Button>

      </form>
    </div>
  );
}
