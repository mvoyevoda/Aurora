import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

const RecentQuizzesList = () => {
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    // Fetch recent quizzes from your backend API
    axios
      .get("/api/quizzes") 
      .then((response) => {
        setRecentQuizzes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const shouldEnableScroll = recentQuizzes.length > 8;

  return (
    <div style={{ maxHeight: "690px", overflowY: shouldEnableScroll ? "auto" : "initial" }}>
      {recentQuizzes.map((quiz, index) => (
        <Link to={`/portal/${quiz.id}`} key={quiz.id}>
          <Card key={quiz.id} variant="outlined" style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="h2">
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
