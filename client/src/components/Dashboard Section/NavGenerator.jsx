import Button from "@mui/material/Button";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

export default function NavGenerator() {
  return (
    <Link to="/generator" style={{textDecoration: 'none'}} >
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "rgba(212, 212, 212, .05)",
          color: "rgba(255, 255, 255, .4)",
          boxShadow: "none",
          border: "none",
          width: "100%",
          height: "5.4rem", // Adjust the height as needed
          fontSize: "1rem", // Adjust the font size as needed
          display: "flex",
          flexDirection: "row",
          paddingLeft: "33rem", // Add padding to the left side
          //paddingRight: "1rem", // Add padding to the right side
          "&:hover": {
            backgroundColor: "rgba(212, 212, 212, .08)",
            boxShadow: "none",
          },
        }}
      >
        <span style={{ flexGrow: 1, textAlign: "center" }}>^ Generator ^</span>
        <LogoutButton />
      </Button>
    </Link>
  );
      }
