import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function NavGenerator() {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        backgroundColor: "rgba(212, 212, 212, .05)", // Change the color and opacity here
        color: "#FFFFFF", // Change the text color to white
        boxShadow: "none" , // Remove drop shadow
        border: "none", // Remove border
        width: "100%", // Set button width to 100% of the card width
        height: "10vh", // Set button height to 100% of the card height
        "&:hover": {
          backgroundColor: 'rgba(212, 212, 212, .08)', boxShadow: "none", // Change the hover color to transparent
        },
      }}
    >
      ^ Generator ^
    </Button>
  );
}
