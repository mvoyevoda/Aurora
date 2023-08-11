import React, { useEffect } from "react";
import NavGenerator from "../components/Dashboard Section/NavGenerator";
import {QuizGen} from "../components/Dashboard Section/QuizGen";
import FavCategory from "../components/Dashboard Section/FavCategory";
import RecentTitle from "../components/Dashboard Section/RecentQuizzes/RecentTitle";
import "../styles/dashboard.css"
import "../styles/index.css"
import SuggestedTitle from "../components/Dashboard Section/SuggestedQuizzes/SuggestedTitle";
import RecentQuizzesList from "../components/Dashboard Section/RecentQuizzes/RecentQuizzesList";
import SuggestedQuizzesList from "../components/Dashboard Section/SuggestedQuizzes/SuggestedQuizzesList";

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
  recentColumn:{
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  suggestedColumn:{
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    
  }
};

export default function Dashboard() {
  // useEffect(() => {
  //   // When the component mounts, scroll to the top of the page with a smooth animation
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  return (
    <>
      <div className="scrollUpAnimation">
        <NavGenerator />
        <div style={styles.pcContainer}>
          <div style={styles.leftColumn}>
            <QuizGen />
            <FavCategory />
          </div>
          <div style={styles.rightColumn}>
            <div style ={styles.recentColumn}>
            <RecentTitle />
            <RecentQuizzesList />
            </div>
            <div style={styles.suggestedColumn}>
            <SuggestedTitle />
            <SuggestedQuizzesList />
            </div>
          </div>
      </div>    
      </div>
    </>
  );
}
