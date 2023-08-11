import NavBar from "../components/NavBar";
import WCard from "../components/WCard";
//need to add overflowY: 'scroll' into styling
import Footer from "../components/Footer";

export default function Welcome() {
  return (
    <div style={{ height: "100vh"}}>
      <NavBar />
      <WCard />
      <Footer />
    </div>
  );
}
