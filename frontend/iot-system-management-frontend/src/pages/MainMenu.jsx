import React from "react";
import { FaHome, FaRegCalendarAlt, FaCogs, FaTools, FaRegListAlt } from "react-icons/fa";
import "./MainMenu.css";


const MainMenu = () => {
  return (
    <div className="main-menu">
      <header className="main-menu-header">
        <h1>Tarla App</h1>
      </header>
      <div className="user-info">
        <img src="/assets/logo.jpg" alt="User" />
        <h1>User Name</h1>
      </div>
      <nav className="main-menu-navigation">
        <ul>
          <li>
            <a href="/mainmenu">
              <FaHome /> Main Menu
            </a>
          </li>
          <li>
            <a href="/devices">
              <FaTools /> Devices
            </a>
          </li>
          <li>
            <a href="/schedule">
              <FaRegCalendarAlt /> Schedule
            </a>
          </li>
          <li>
            <a href="/reports">
              <FaRegListAlt /> Reports
            </a>
          </li>
          <li>
            <a href="/settings">
              <FaCogs /> Settings
            </a>
          </li>
        </ul>
      </nav>
      <footer className="main-menu-footer">
        <button className="logout-btn">Log Out</button>
      </footer>
    </div>
  );
};

export default MainMenu;
