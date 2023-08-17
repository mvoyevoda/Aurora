import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FeatureOne() {
  return (
    <div
      style={{
        display: "flex",
        height: 580,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* Left side content */}
      <Card
        sx={{
          flex: 1,
          padding: "16px",
          marginRight: "16px",
          backgroundColor: "lightgray",
        }}
      >
        <CardContent>
          <Typography variant="body1" fontSize={'50px'}>
          <p>Start by telling us your interests in the prompt box</p>
          </Typography>
        </CardContent>
      </Card>

      {/* Right side image */}
      <Card
        sx={{
          flex: 1,
          padding: "16px",
          backgroundColor: "white",
          border: "1px solid lightgray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="path-to-your-image.png"
          alt="Feature"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Card>
    </div>
  );
}
