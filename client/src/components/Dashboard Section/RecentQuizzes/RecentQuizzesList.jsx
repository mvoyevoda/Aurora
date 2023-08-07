import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const mockRecentQuizzes = [
  "Quiz 1",
  "Quiz 2",
  "Quiz 3",
  "Quiz 1",
  "Quiz 2",
  "Quiz 3",
  "Quiz 1",
  "Quiz 1",

 ];

const RecentQuizzesList = () => {
  return (
    <div>
      {mockRecentQuizzes.map((quizTitle, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6" component="h2" fontSize="2.5rem" >
              {quizTitle}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentQuizzesList;
