import NavBar from "../components/NavBar";
//need to add overflowY: 'scroll' into styling
import Footer from "../components/Footer";
import FeatureOne from "../components/Features Section/FeatureOne";
import RowOne from "../components/RowOne/RowOne";

export default function Welcome() {
  return (
    <div style={{ height: "100vh"}}>
      <NavBar />
      <RowOne />
      <Footer />
    </div>
  );
}
