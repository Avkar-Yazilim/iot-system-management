import React from "react";
import MainMenu from "../pages/MainMenu";
import "./ScheduleMenu.css";
import SchedulePage from "../pages/SchedulePage";
import WeeklySchedule from "../pages/WeeklySchedule";

const ScheduleMenu = () => {
  return (
    <div className="schedule-menu-container">
      <MainMenu />
      <div className="schedule-page-container">
      <SchedulePage />
      </div>
      <div className="weekly-menu-title">
      <WeeklySchedule />
      </div>
      
    </div>
  );
};

export default ScheduleMenu;