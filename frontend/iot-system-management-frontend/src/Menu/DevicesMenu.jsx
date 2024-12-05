import React from "react";
import MainMenu from "../pages/MainMenu";
import DevicePart from "../pages/DevicePart";
import DeviceList from "../pages/DeviceList";
import "./DevicesMenu.css";



const DevicesMenu = () => {
  
  return (
    <div className="menu-container">
      <MainMenu />
      <DevicePart/>
      <DeviceList/>      
    </div>
  );
};

export default DevicesMenu;