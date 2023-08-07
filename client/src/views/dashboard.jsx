import NavGenerator from "../components/Dashboard Section/NavGenerator";
import { QuizGen } from "../components/Dashboard Section/QuizGen";
import FavCategory from "../components/Dashboard Section/FavCategory";
import RecentTitle from "../components/Dashboard Section/RecentQuizzes/RecentTitle";
import SuggestedTitle from "../components/Dashboard Section/SuggestedQuizzes/SuggestedTitle";
import NavSettings from "../components/Dashboard Section/NavSettings";
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const styles = {
  pcContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '82vh', // Adjust the height based on your requirement
  },
  leftColumn: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  rightColumn: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
};

export default function Dashboard() {
  const [recentQuizzes, setRecentQuizzes] = useState([]); // Array to hold recent quizzes data
  const [suggestedQuizzes, setSuggestedQuizzes] = useState([]); // Array to hold suggested quizzes data
  const [recentQuizzesCount, setRecentQuizzesCount] = useState(0); // Number of recent quizzes displayed
  const [suggestedQuizzesCount, setSuggestedQuizzesCount] = useState(0); // Number of suggested quizzes displayed
  const totalRecentQuizzes = 50; // Total number of recent quizzes available
  const totalSuggestedQuizzes = 50; // Total number of suggested quizzes available
  const loadMoreCount = 10; // Number of quizzes to load on each "Load More" click

  useEffect(() => {
    // Fetch recent quizzes and suggested quizzes and store them in state
    // You can use an API call or any other data source here.
    const recentQuizzesData = getRecentQuizzes(); // Implement this function to fetch recent quizzes.
    setRecentQuizzes(recentQuizzesData);
    const suggestedQuizzesData = getSuggestedQuizzes(); // Implement this function to fetch suggested quizzes.
    setSuggestedQuizzes(suggestedQuizzesData);
  }, []);

  // Example function to get recent quizzes from an API.
  async function getRecentQuizzes() {
    const response = await fetch('your_api_endpoint_for_recent_quizzes');
    const data = await response.json();
    return data;
  }

  // Example function to get suggested quizzes from an API.
  async function getSuggestedQuizzes() {
    const response = await fetch('your_api_endpoint_for_suggested_quizzes');
    const data = await response.json();
    return data;
  }

  const handleLoadMoreRecent = () => {
    setRecentQuizzesCount(prevCount => prevCount + loadMoreCount);
  };

  const handleLoadMoreSuggested = () => {
    setSuggestedQuizzesCount(prevCount => prevCount + loadMoreCount);
  };

  return (
    <>
      <NavGenerator />
      <div style={styles.pcContainer}>
        <div style={styles.leftColumn}>
          <QuizGen />
          <FavCategory />
        </div>
        <div style={styles.rightColumn}>
          <RecentTitle />
          {recentQuizzes.slice(0, recentQuizzesCount).map((quiz, index) => (
            <div key={index}>
              {/* Render the recent quizzes here */}
              <p>{quiz.title}</p>
            </div>
          ))}
          {recentQuizzesCount < totalRecentQuizzes && (
            <Button onClick={handleLoadMoreRecent}>Load More</Button>
          )}
        </div>
        <div style={styles.rightColumn}>
          <SuggestedTitle />
          {suggestedQuizzes.slice(0, suggestedQuizzesCount).map((quiz, index) => (
            <div key={index}>
              {/* Render the suggested quizzes here */}
              <p>{quiz.title}</p>
            </div>
          ))}
          {suggestedQuizzesCount < totalSuggestedQuizzes && (
            <Button onClick={handleLoadMoreSuggested}>Load More</Button>
          )}
        </div>
      </div>
      <NavSettings />
    </>
  );
}
