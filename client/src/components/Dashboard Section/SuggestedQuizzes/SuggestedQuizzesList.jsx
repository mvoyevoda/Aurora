import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useMediaQuery, useTheme } from "@mui/material";


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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerPage = isMobile ? 5 : 8; 
  const [currentPage, setCurrentPage] = useState(1);

  const handleShowMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleShowLess = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  return (
    <div>
      <div>
        {mockRecentQuizzes.slice(startIndex, endIndex).map((quizTitle, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{
              marginBottom: "10px",
              backgroundColor: "rgba(212, 212, 212, .05)",
              color: "white",
              borderRadius: '20px',
              width: "40vh",
              height: "7vh",
              marginLeft: "47px",
              ...(isMobile && {
                width: "20vh", // Apply this style for small screens
              }),
              
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                style={{ fontSize: "30px", color:"rgba(255, 255, 255, .9)",
                whiteSpace: "nowrap", // Prevent text from wrapping
                  overflow: "hidden",   // Hide overflowing text
                  textOverflow: "ellipsis", // Display ellipsis (...) for overflow
                  transition: "all 0.3s", // Add smooth transition effect
                  ":hover": {
                    whiteSpace: "normal", // Display full text on hover
                    overflow: "visible",  // Show all text
                    textOverflow: "unset", // Remove ellipsis
                    fontSize: "1.3em", // Increase font size on hover
                  },
                  ...(isMobile && {
                fontSize: "1.3em", // Apply this style for small screens
              }),
            }}>
                {quizTitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {currentPage > 1 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button  color="inherit" backgroundcolor="rgba(212, 212, 212, .08)" onClick={handleShowLess}>
            Show Less ^
          </Button>
        </div>
      )}
      {endIndex < mockRecentQuizzes.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button  color="inherit" backgroundcolor="rgba(212, 212, 212, .08)" onClick={handleShowMore}>
            Show More V
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuggestedQuizzesList;