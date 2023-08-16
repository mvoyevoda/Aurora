import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SuggestedTitle() {
  return (
    <Card
      sx={{
        background: "rgba(212, 212, 212, 0)",
        boxShadow: "none",
        height: "10vh",
        width: "50vh",
        '@media (max-width: 700px)':{
          width: "30vh",
          paddingLeft: "0.5em"
        }
      }}
    >
      <CardContent>
        <Typography
          sx={{ mb: 1.5,
            '@media (max-width: 700px)':{
              fontSize: "2em"
            } }}
          color="rgba(255, 255, 255, .7)"
          fontSize="2.5rem"
        >
          Popular
        </Typography>
      </CardContent>
    </Card>
  );
}
