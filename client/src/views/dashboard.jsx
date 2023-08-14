import React from "react";
import NavGenerator from "../components/Dashboard Section/NavGenerator";
import {QuizGen} from "../components/Dashboard Section/QuizGen";
import FavCategory from "../components/Dashboard Section/FavCategory";
import RecentTitle from "../components/Dashboard Section/RecentQuizzes/RecentTitle";
import RecentQuizzesList from "../components/Dashboard Section/RecentQuizzes/RecentQuizzesList";
import SuggestedTitle from "../components/Dashboard Section/SuggestedQuizzes/SuggestedTitle";
import SuggestedQuizzesList from "../components/Dashboard Section/SuggestedQuizzes/SuggestedQuizzesList";
//import Footer from "../components/Footer";

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
    
  },
  '@media (max-width: 768px)': {
    pcContainer: {
      flexDirection: 'column', // Change to a single column layout
    },
    leftColumn: {
      marginLeft: 0, // Remove the left margin
    },
    rightColumn: {
      marginLeft: 0, // Remove the left margin
    },
    recentColumn: {
      marginLeft: 0, // Remove the left margin
    },
    suggestedColumn: {
      marginLeft: 0, // Remove the left margin
    },
  },
};

export default function Dashboard() {



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
