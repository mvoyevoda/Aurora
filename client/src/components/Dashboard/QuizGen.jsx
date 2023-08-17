import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../AuthContext';


export function QuizGen() {

  const [quizCount, setQuizCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext); 
  const userId = authContext.currentUser?.id;

  useEffect(() => {
    axios.get(`/api/users/${userId}/quizzes`)
      .then((response) => {
        setQuizCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Data fetching is complete
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      sx={{
        background: "rgba(212, 212, 212, 0.0)",
        height: "30vh",
        width: "40vh",
        boxShadow: "none",
        marginLeft: "275px",
        marginTop: "120px",
        '@media (max-width: 700px)':{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "start",
          margin: '2em 2em',
        }
      }}
    >
      <CardContent>
        {/* First Text */}
        <Typography
          variant="h5"
          color="white"
          fontSize={180}
          sx={{ lineHeight: 1,
            '@media (max-width: 700px)':{
                fontSize: "6em",
            } }}
        >
          {quizCount.count}
        </Typography>
        {/* Additional Content */}
        <Typography
          variant="subtitle2"
          color="rgba(255, 255, 255, .5)"
          fontSize={25}
          sx={{ lineHeight: 1, 
            '@media (max-width: 700px)':{
              fontSize: "1em",
            }}}
        >
          Quizzes Generated
        </Typography>
      </CardContent>
    </Card>
  );
}
