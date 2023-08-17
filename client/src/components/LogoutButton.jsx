import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/logout", {});
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      color="inherit"
      disableRipple
      sx={{
        fontSize: "1rem",
        fontWeight: "100",
        opacity: "0.7",
        margin: "5%",
        textTransform: "none",
        "&:hover": {
          opacity: "1.0",
          backgroundColor: "transparent",
        }
      }}
    >
      Logout
    </Button>
  );
}
