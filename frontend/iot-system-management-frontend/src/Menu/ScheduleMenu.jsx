import React from "react";
import MainMenu from "../pages/MainMenu";
//import "./ScheduleMenu.css";
import SchedulePage from "../pages/SchedulePage";

const ScheduleMenu = () => {
  return (
    <div className="menu-container">
      <MainMenu />
      <SchedulePage />
    </div>
  );
};

export default ScheduleMenu;