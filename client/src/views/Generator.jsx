import React from "react";
import Configurator from "../components/Configurator";
import NavDashboard from "../components/Dashboard Section/NavDashboard";

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
  },
  content: {
    paddingBottom: "9vh", // Adjust the padding to make space for the NavDashboard button
  },
  navDashboard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "19vh",
  },
};

function Generator() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Configurator />
      </div>
      <div style={styles.navDashboard}>
        <NavDashboard />
      </div>
    </div>
  );
}

export default Generator;
