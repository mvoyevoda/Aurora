import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const mockRecentQuizzes = [
  "Quiz 1",
  "Quiz 2",

];

const SuggestedQuizzesList = () => {
  return (
    <div>
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
