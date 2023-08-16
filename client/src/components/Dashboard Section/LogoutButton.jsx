import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "flex-start", paddingLeft: "16px" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;
          </Typography>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid transparent",
                borderRadius: "4px",
                opacity: 0.5,
              }}
            >
              Log Out
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
