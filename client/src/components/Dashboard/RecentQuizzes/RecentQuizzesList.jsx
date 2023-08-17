import React, { useEffect, useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import { AuthContext } from '../../../AuthContext';



const RecentQuizzesList = () => {
  const authContext = useContext(AuthContext); 
  const userId = authContext.currentUser?.id;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const itemsPerPage = isMobile ? 5 : 8; 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch recent quizzes from your backend API
    axios
      .get(`/api/quizzes/q/${userId}`) 
      .then((response) => {
        setRecentQuizzes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShowMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleShowLess = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const shouldEnableScroll = recentQuizzes.length > itemsPerPage;

  return (
    
    <div style={{ maxHeight: "690px", overflowY: shouldEnableScroll ? "auto" : "initial" }}>
      
      {recentQuizzes.slice(startIndex, endIndex).map((quiz, index) => (
        
        <Link to={`/portal/${quiz.id}`} key={quiz.id} style={{ textDecoration: "none" }}>
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
              {quiz.category}
            </Typography>
          </CardContent>
        </Card>
      </Link>
            ))}
      {shouldEnableScroll && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {currentPage > 1 && (
            <Button color="inherit" backgroundColor="rgba(212, 212, 212, .08)" onClick={handleShowLess}>
              Show Less ^
            </Button>
          )}
          {endIndex < recentQuizzes.length && (
            <Button color="inherit" backgroundColor="rgba(212, 212, 212, .08)" onClick={handleShowMore}>
              Show More V
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentQuizzesList;
