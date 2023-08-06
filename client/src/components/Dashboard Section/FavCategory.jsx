import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function FavCategory() {
  return (
    <Card
      sx={{
        background: "rgba(212, 212, 212, 0.0)",
        height: "30vh",
        width: "50vh",
        boxShadow: "none",
        marginLeft: "225px",
        marginTop: "120px",
      }}
    >
      <CardContent>
        {/* First Text */}
        <Typography
          variant="h5"
          color="white"
          fontSize={80}
          sx={{ lineHeight: 1 }}
        >N/A</Typography>
        {/* Additional Content */}
        <Typography
          variant="subtitle2"
          color="rgba(255, 255, 255, .5)"
          fontSize={25}
          sx={{ lineHeight: 1 }}
        >
            Favorite Category
        </Typography>
      </CardContent>
    </Card>
  );
}
