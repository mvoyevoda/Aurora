import React from "react";
import Configurator from "../components/Configurator";
import NavDashboard from "../components/Dashboard Section/NavDashboard";
import LogoutButton from "../components/Dashboard Section/LogoutButton";
import "../styles/dashboard.css";


const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
  },
  content: {
    //marginBottom: "1rem", // Adjust the padding to make space for the NavDashboard button
  },
  navDashboard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "4rem",
    marginBottom: "4.3rem",
  },
};

function Generator() {
  return (
    <>
    <div className="scrollDownAnimation">
      <LogoutButton />
      <div style={styles.container}>
        <div style={styles.content}>
          <Configurator />
        </div>
        <div style={styles.navDashboard}>
          <NavDashboard />
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Generator;
