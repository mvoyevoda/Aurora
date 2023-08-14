import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../contexts/AuthContext';


export function QuizGen() {

  const [quizCount, setQuizCount] = useState(0);
  const authContext = useContext(AuthContext); 
  const userId = authContext.currentUser?.id;

  useEffect(() => {
    axios.get(`/api/users/${userId}/quizzes`)
    .then((response) => {
      setQuizCount(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

    // Assuming you have the user ID available in your component
    
  }, []);
  return (
    <Card
      sx={{
        background: "rgba(212, 212, 212, 0.0)",
        height: "30vh",
        width: "40vh",
        boxShadow: "none",
        marginLeft: "275px",
        marginTop: "120px",
      }}
    >
      <CardContent>
        {/* First Text */}
        <Typography
          variant="h5"
          color="white"
          fontSize={180}
          sx={{ lineHeight: 1 }}
        >
          {quizCount.count}
        </Typography>
        {/* Additional Content */}
        <Typography
          variant="subtitle2"
          color="rgba(255, 255, 255, .5)"
          fontSize={25}
          sx={{ lineHeight: 1 }}
        >
          Quizzes Generated
        </Typography>
      </CardContent>
    </Card>
  );
}
