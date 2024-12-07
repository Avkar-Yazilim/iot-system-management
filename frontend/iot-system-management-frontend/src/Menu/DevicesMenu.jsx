import React from "react";
import MainMenu from "../pages/MainMenu";
import DevicePart from "../pages/DevicePart";
import DeviceList from "../pages/DeviceList";
import "./DevicesMenu.css";



const DevicesMenu = () => {

  return (
    <div className="menu-container">
      <MainMenu />      
      <DevicePart />      
      <div className="device-page-container">
        <DeviceList />
      </div>
    </div>
  );
};

export default DevicesMenu;