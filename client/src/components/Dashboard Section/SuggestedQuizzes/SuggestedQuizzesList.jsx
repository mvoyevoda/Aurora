import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const mockRecentQuizzes = [
  "Comming soon...",
 
];

const SuggestedQuizzesList = () => {
  const shouldEnableScroll = mockRecentQuizzes.length > 8;

  return (
    <div style={{ maxHeight: "690px", overflowY: shouldEnableScroll ? "auto" : "initial" }}>
      {mockRecentQuizzes.map((quizTitle, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {quizTitle}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuggestedQuizzesList;
