//import LogoutButton from "../components/Dashboard Section/LogoutButton"
import NavGenerator from "../components/Dashboard Section/NavGenerator";
import {QuizGen} from "../components/Dashboard Section/QuizGen";
import FavCategory from "../components/Dashboard Section/FavCategory";
import RecentTitle from "../components/Dashboard Section/RecentQuizzes/RecentTitle";
import "../styles/dashboard.css"
import SuggestedTitle from "../components/Dashboard Section/SuggestedQuizzes";
//import NavSettings from "../components/Dashboard Section/NavSettings"


const styles = {
  pcContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh', // Adjust the height based on your requirement
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
          <SuggestedTitle />
        </div>
    </div>    
    </>
  );
}
