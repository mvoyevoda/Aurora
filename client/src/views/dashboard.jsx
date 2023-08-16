import React from "react";
import { useMediaQuery, useTheme } from "@mui/material"; 
import NavGenerator from "../components/Dashboard Section/NavGenerator";
import { QuizGen } from "../components/Dashboard Section/QuizGen";
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
};

const mobileStyles = {
  pcContainer: {
    flexDirection: "column", // Stack columns on smaller screens
  },
  leftColumn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "row",
    //justifyContent: "center",
  },
  recentColumn:{
    position: "relative",
    right: '1em',
    bottom: '7em',
  },
  suggestedColumn: {
    position: "relative",
    right: '6em',
    bottom: '7em',
  },
};
export default function Dashboard() {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  return (
    <>
      

      <div className="scrollUpAnimation">
        <NavGenerator />
        <div style={{ ...styles.pcContainer, ...(isMobile && mobileStyles.pcContainer) }}>
          <div style={{ ...styles.leftColumn, ...(isMobile && mobileStyles.leftColumn)}}>
            <QuizGen />
            <FavCategory />
          </div>
          <div style={{...styles.rightColumn, ...(isMobile && mobileStyles.rightColumn)}}>
            <div style={{...styles.recentColumn, ...(isMobile && mobileStyles.recentColumn)}}>
            <RecentTitle />
            <RecentQuizzesList />
            </div>
            <div style={{...styles.suggestedColumn, ...(isMobile && mobileStyles.suggestedColumn)}}>
            <SuggestedTitle />
            <SuggestedQuizzesList />
            </div>
          </div>
      </div>    
      </div>
    </>
  );
}