import RecentQuizzesList from "../components/RecentQuizzesList";
import { useEffect, useState, useContext } from "react";
import { useMediaQuery, useTheme, Button } from "@mui/material"; 
import axios from "axios";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import LogoutButton from "../components/LogoutButton"
import { AuthContext } from "../AuthContext";
import "../styles/dashboard.css"

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
        {/* <div className="vertical-divider"></div> */}
        <div className="dash-main-right">
            <h3>Recent</h3>
              <RecentQuizzesList />
        </div>
      </div>
      <div className="dash-footer"></div>
    </div>
  );
}