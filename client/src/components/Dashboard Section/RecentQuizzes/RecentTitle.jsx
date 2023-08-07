import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function RecentTitle() {
  return (
    <Card
      sx={{
        background: "rgba(212, 212, 212, 0)",
        height: "10vh",
        width: "50vh",
        boxShadow: "none",
      }}
    >
      <CardContent>
        <Typography
          sx={{ mb: 1.5 }}
          color="rgba(255, 255, 255, .7)"
          fontSize="2.5rem"
        >
          Recent
        </Typography>
      </CardContent>
    </Card>
  );
}