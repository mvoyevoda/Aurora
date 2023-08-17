import { useEffect, useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import { AuthContext } from '../AuthContext';

const RecentQuizzesList = () => {
  const authContext = useContext(AuthContext); 
  const userId = authContext.currentUser?.id;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [recentQuizzes, setRecentQuizzes] = useState([]);
  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/quizzes/${userId}`) 
      .then((response) => {
        const data = response.data;
        setRecentQuizzes(data);
        const newIndex = 10 < data.length ? 10 : data.length;
        setEndIndex(newIndex);
        // console.log("Changed endIndex: ", newIndex);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

// const [endIndex, setEndIndex] = useState(0);
const [endIndex, setEndIndex] = useState(recentQuizzes.length);

  // const handleShowMore = () => {
  //   // setCurrentPage(prevPage => prevPage + 1);
  //   setEndIndex(() => endIndex+10 <= recentQuizzes.length ? endIndex+10 : recentQuizzes.length)
  // };

  // const handleShowLess = () => {
  //   setCurrentPage(prevPage => prevPage - 1);
  // };

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const shouldEnableScroll = recentQuizzes.length > itemsPerPage;   

  return (
    
    <div className="recent-quizzes-list">
      
      {/* {console.log(endIndex)} */}
      {recentQuizzes.slice(0, endIndex).map((quiz, index) => (
        
        <Link to={`/portal/${quiz.id}`} key={quiz.id} style={{ textDecoration: "none" }}>
          <Card
            key={index}
            variant="outlined"
            style={{
              margin: "10px",
              backgroundColor: "rgba(212, 212, 212, .05)",
              color: "white",
              borderRadius: '20px',
              width: "28em",
              height: "5em",
              // marginLeft: "47px",
              ...(isMobile && {
                width: "80vw", // Apply this style for small screens
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
                  textAlign: "center",
                  ":hover": {
                    whiteSpace: "normal", // Display full text on hover
                    overflow: "visible",  // Show all text
                    textOverflow: "unset", // Remove ellipsis
                    fontSize: "1.3em", // Increase font size on hover
                  },
              //     ...(isMobile && {
              //   fontSize: "1.3em", // Apply this style for small screens
              // }),
            }}>
              {quiz.category}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      ))}
      {/* {shouldEnableScroll && (
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
      )} */}
      {/* {
        endIndex !== recentQuizzes.length && 
        <Button color="inherit" onClick={handleShowMore}>
          V Show More V
        </Button>
      } */}

    </div>
  );
};

export default RecentQuizzesList;
