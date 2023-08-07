import * as React from "react";
import Button from "@mui/material/Button";
import LogoutButton from "./LogoutButton";

export default function NavGenerator() {
  return (
    <Button
      variant="contained"
      color="primary"
      href="./generator"
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
        alignItems: "center",
        justifyContent: "space-between", // Aligns items with space between
        paddingLeft: "29rem", // Add padding to the left side
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
  );
}
