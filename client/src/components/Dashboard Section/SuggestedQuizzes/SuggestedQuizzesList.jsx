import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const mockRecentQuizzes = [
  "Quiz 1",
  "Quiz 2",
  "Quiz 3",
  "Quiz 4",
  "Quiz 5",
  "Quiz 6",
  "Quiz 7",
  "Quiz 8",
  "Quiz 9",
  "Quiz 5",
  "Quiz 1",
  "Quiz 2",
  "Quiz 3",
  "Quiz 4",
  "Quiz 5",
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
