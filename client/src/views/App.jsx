import React, { useState } from "react";
import Configurator from "../components/Configurator"
import Portal from "../components/Portal"

function App() {

  const [quiz, setQuiz] = useState({});

  return (
    <div className="app" >
      {quiz ? <Configurator /> : <Portal />}
    </div>
  )
}

export default App
