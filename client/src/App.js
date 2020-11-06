import React, { useState, useEffect } from "react";
import "./App.css";

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

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Michelle</h1>
      </header>
      {state && <p className="App-intro">{state}</p>}
    </div>
  );
};

export default App;
