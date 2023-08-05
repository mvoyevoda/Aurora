import NavBar from "../components/NavBar";
import WCard from "../components/WCard";

export default function Welcome() {
  return (
    <div style={{ height: "100vh", overflowY: 'scroll'}}>
      <NavBar />
      <WCard />
    </div>
  );
}
