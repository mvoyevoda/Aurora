// import NavGenerator from "../components/Dashboard/NavGenerator";
// import { QuizGen } from "../components/Dashboard/QuizGen";
// import FavCategory from "../components/Dashboard/FavCategory";
// import RecentTitle from "../components/Dashboard/RecentQuizzes/RecentTitle";
import RecentQuizzesList from "../components/Dashboard/RecentQuizzes/RecentQuizzesList";
// import SuggestedTitle from "../components/Dashboard/SuggestedQuizzes/SuggestedTitle";
// import SuggestedQuizzesList from "../components/Dashboard/SuggestedQuizzes/SuggestedQuizzesList";
// import Footer from "../components/Footer";
import { useEffect, useState, useContext } from "react";
import { useMediaQuery, useTheme, Button } from "@mui/material"; 
// import List from '@mui/material/List';
import axios from "axios";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import LogoutButton from "../components/LogoutButton"
import { AuthContext } from "../AuthContext";
import "../styles/dashboard.css"

// const styles = {
//   pcContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     height: '82vh', // Adjust the height based on your requirement
//   },
//   leftColumn: {
//     flex: 2,
//     display: 'flex',
//     flexDirection: 'column',  

//   },
//   rightColumn: {
//     flex: 2,
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   recentColumn:{
//     flex: 2,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   suggestedColumn:{
//     flex: 2,
//     display: 'flex',
//     flexDirection: 'column',

//   },
// };

// const mobileStyles = {
//   pcContainer: {
//     flexDirection: "column", // Stack columns on smaller screens
//   },
//   leftColumn: {
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "start",
//   },
//   rightColumn: {
//     display: "flex",
//     flexDirection: "row",
//     //justifyContent: "center",
//   },
//   recentColumn:{
//     position: "relative",
//     right: '1em',
//     bottom: '7em',
//   },
//   suggestedColumn: {
//     position: "relative",
//     right: '6em',
//     bottom: '7em',
//   },
// };


export default function Dashboard() {

  const authContext = useContext(AuthContext); 
  const userId = authContext.currentUser?.id;
  
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const [quizzes, setquizzes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/quizzes/${userId}`) 
      .then((response) => {
        setquizzes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div className="dash-header-left"></div>
        <div className="dash-header-mid">
          <Button
            color="inherit"
            href="/generator"
            disableRipple
            sx={{
              fontSize: "1rem",
              fontWeight: "100",
              opacity: "0.7",
              textTransform: "none",
              "&:hover": {
                opacity: "1.0",
                backgroundColor: "transparent",
              }
            }}
          >
            <KeyboardDoubleArrowUpIcon /> Generator <KeyboardDoubleArrowUpIcon />
          </Button>
        </div>
        <div className="dash-header-right">
          <LogoutButton />
        </div>
      </div>
      <div className="dash-main-container">
        <div className="dash-main-left">
          <div className="quizzes-generated">
            <div className="quizzes-generated-content">
              <h1>{quizzes.length}</h1>
              <p>Quizzes Generated</p>
            </div>
          </div>
            {/* <div className="favorite-category">
              <div className="favorite-category-content">
                <h1>N/A</h1>
                <p>Favorite Category</p>
              </div>
            </div> */}
        </div>
        <div className="dash-main-right">
            <h3>Recent</h3>
            {/* <div className="recent-quizzes"> */}
              <RecentQuizzesList />
            {/* </div> */}
        </div>
      </div>
      <div className="dash-footer"></div>
    </div>
    // <>
    //   <div className="scrollUpAnimation">
    //     <NavGenerator />
    //     <div style={{ ...styles.pcContainer, ...(isMobile && mobileStyles.pcContainer) }}>
    //       <div style={{ ...styles.leftColumn, ...(isMobile && mobileStyles.leftColumn)}}>
    //         <QuizGen />
    //         <FavCategory />
    //       </div>
    //       <div style={{...styles.rightColumn, ...(isMobile && mobileStyles.rightColumn)}}>
    //         <div style={{...styles.recentColumn, ...(isMobile && mobileStyles.recentColumn)}}>
    //         <RecentTitle />
    //         <RecentQuizzesList />
    //         </div>
    //         <div style={{...styles.suggestedColumn, ...(isMobile && mobileStyles.suggestedColumn)}}>
    //         <SuggestedTitle />
    //         <SuggestedQuizzesList />
    //         </div>
    //       </div>
    //     </div>    
    //   </div>
    // </>
  );
}