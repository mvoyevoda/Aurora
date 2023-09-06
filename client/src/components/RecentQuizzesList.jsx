import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AuthContext } from '../AuthContext';

const RecentQuizzesList = () => {
  const { currentUser } = useContext(AuthContext); 
  const userId = currentUser?.id;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [endIndex, setEndIndex] = useState(recentQuizzes.length);

  useEffect(() => {
    axios
      .get(`/api/quizzes/${userId}`)
      .then((response) => {
        const data = response.data;
        setRecentQuizzes(data);
        const newIndex = 10 < data.length ? 10 : data.length;
        setEndIndex(newIndex);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="recent-quizzes-list">
      {recentQuizzes.slice(0, endIndex).map((quiz) => (
        <Link to={`/portal/${quiz.id}`} key={quiz.id} style={{ textDecoration: "none" }}>
          <Card
            variant="outlined"
            sx={{
              margin: "10px",
              backgroundColor: "rgba(212, 212, 212, .05)",
              color: "white",
              width: "28em",
              height: "5em",
              borderRadius: "20px",
              // "&:hover": {
              //   borderColor: "white",
              //   borderWidth: "2px",
              //   borderStyle: "solid",
              // },
            }}
          >
        <CardContent 
          sx={{
            display: 'flex',          
            flexDirection: 'column',   
            justifyContent: 'center', 
            alignItems: 'center',      
            height: '100%',            
            p: 0,                      
          }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              opacity: 0.7,
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "all 0.1s",
              textAlign: "center",
              // m: 0,
              "&:hover": {
                whiteSpace: "normal",
                overflow: "visible",
                textOverflow: "unset",
                opacity: 1
              },
            }}
          >
            {quiz.category}
          </Typography>
        </CardContent>

          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecentQuizzesList;
