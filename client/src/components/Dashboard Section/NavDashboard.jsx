import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; 
//Done with GeneratorButton
export default function NavDashboard() {
  return (

      <Button
        variant="contained"
        color="primary"
        href="/dashboard"
        sx={{
          backgroundColor: "rgba(212, 212, 212, .05)", // Change the color and opacity here
          color: "rgba(255, 255, 255, .4)", // Change the text color to white with reduced opacity
          boxShadow: "none", // Remove drop shadow
          border: "none", // Remove border
          width: "100%", // Set button width to 100% of the card width
          height: "9vh", // Set button height to 100% of the card height
          fontSize: "15px", // Change the font size of the text
          "&:hover": {
            backgroundColor: "rgba(212, 212, 212, .08)",
            boxShadow: "none", // Change the hover color to transparent
          },
        }}
      >
        v Dashboard v
      </Button>

  );
}
