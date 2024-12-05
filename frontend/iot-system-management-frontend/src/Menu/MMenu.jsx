import React from "react";
import MainMenu from "../pages/MainMenu";
import QuickMenu from "../pages/QuickMenu";
import Schedule from "../pages/Schedule"
import "./MMenu.css";

const App = () => {
  return (
    <div className="menu-container">
      <MainMenu />
      <QuickMenu />
      <Schedule />
    </div>
  );
};

export default App;
