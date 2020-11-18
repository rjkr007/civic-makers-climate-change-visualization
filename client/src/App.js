import React, { useState, useEffect } from "react";

import "./App.css";
import BushfireAnimation from "./vis/bushfires/BushfireAnimation";
import ACORNWeather from "./vis/acorn_weather/ACORNWeather";

const App = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then(
        (result) => {
          setState(result.message);
        },
        (error) => {
          console.warn("Failed to get express msg:", error);
        }
      );
  }, []);

  /*
        <header className="App-header">
        <h1 className="App-title">Welcome to Michelle</h1>
      </header>
      {state && <p className="App-intro">{state}</p>}

   */

  return (
    <div className="App">
        <ACORNWeather/>
        <BushfireAnimation/>
    </div>
  );
};

export default App;
