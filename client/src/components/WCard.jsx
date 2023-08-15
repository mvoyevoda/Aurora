import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WLogo from "../images/WLogo.png";
import "../styles/signup.css";
import { Grid } from "@mui/material";

export default function WCard() {
  return (
    <Grid
      container
      justifyContent="center" // Center items horizontally
      alignItems="center" // Center items vertically
      spacing={2} // Add spacing between Grid items
      sx={{
        paddingLeft: "7.5em",
        "@media (max-width: 700px)": {
          display: "flex",
          flexDirection: "column",
          paddingLeft: "4vh",
          margin: 0,
        },
      }}
    >
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            minWidth: "12.5em",
            maxWidth: "80%",
            minHeight: "18.75",
            textAlign: "center",
            backgroundColor: "rgba(212, 212, 212, 0.0)",
            boxShadow: "none",
            // Add right margin to shift the card to the right
            marginRight: "3.125em",
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={{ xs: "2rem", sm: "3rem", md: "4rem" }}
              color="white"
              paddingTop={3}
              sx={{ lineHeight: 1 }}
            >
              WELCOME TO
            </Typography>

            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={{ xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }}
              color="white"
              paddingTop={1}
              paddingBottom={1}
              sx={{ lineHeight: 1 }}
            >
              AURORA
            </Typography>

            <Typography
              variant="body2"
              fontWeight="light-bold"
              color="white"
              fontSize={{ xs: "0.9rem", sm: "1.5rem", md: "2rem" }}
              paddingTop={1}
              sx={{ lineHeight: 1 }}
            >
              Generate, assess, and improve with interactive quizzes. Track
              progress, receive valuable feedback, and unlock your learning
              potential.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "80%",
            paddingRight: 22,
            paddingTop: 10,
            mx: "auto",
          }}
        >
          <img
            src={WLogo}
            alt="AURORA"
            className="rotate-image"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
