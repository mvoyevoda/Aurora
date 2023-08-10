import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const mockRecentQuizzes = [
  "Movie Quote",
  "Witty Brain Teasers",
  "World Trivia Challenge",
  "Pop Culture Quiz",
  "Mysteries of History",
  "Cosmic Science Quiz",
  "Classic Lit Challenge",
  "Geography Explorer",
  "Movie Magic",
  "Mind Benders",
  "Global Facts",
  "Cultural Quotient",
  "Time Traveler",
  "Cosmic Journey",
  "Book Buff",
  "Geo Genius",
];

const SuggestedQuizzesList = () => {
  const shouldEnableScroll = mockRecentQuizzes.length > 7;

  return (
    <div
      style={{
        maxHeight: "690px",
        overflowY: shouldEnableScroll ? "auto" : "initial",
      }}
    >
      {mockRecentQuizzes.map((quizTitle, index) => (
        <Card
          key={index}
          variant="outlined"
          style={{
            marginBottom: "10px",
            backgroundColor: "rgba(212, 212, 212, .05)",
            color: "white",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              style={{ fontSize: "40px" }}
            >
              {quizTitle}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuggestedQuizzesList;
