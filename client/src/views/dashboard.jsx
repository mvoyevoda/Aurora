//import LogoutButton from "../components/Dashboard Section/LogoutButton"
import NavGenerator from "../components/Dashboard Section/NavGenerator";
import {QuizGen} from "../components/Dashboard Section/QuizGen";
import FavCategory from "../components/Dashboard Section/FavCategory";
//import NavSettings from "../components/Dashboard Section/NavSettings"\
//Will add back later

export default function Dashboard() {
  return (
    <>
      <NavGenerator />
      <QuizGen />
      <FavCategory />
    </>
  );
}
