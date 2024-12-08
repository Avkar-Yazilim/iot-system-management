import React from "react";
import MainMenu from "../pages/MainMenu";
import DeviceLogs from "../pages/DeviceLogs";
import "./SettingsMenu.css";

const SettingsMenu = () => {
  return (
    <div className="device-main-menu-container">
      <div className="menu-container">
        <MainMenu />
        <DeviceLogs />
      </div>
    </div>
  );
};

export default SettingsMenu;