import React from "react";
import { FaPlus, FaMicrochip, FaRegCalendarAlt, FaDesktop } from "react-icons/fa";
import "./QuickMenu.css"; // QuickMenu.css dosyasını import ediyoruz

const QuickMenu = () => {
  return (
    <div className="quick-menu">
      <div className="user-info">
        <h1>User Name</h1>
      </div>
      <footer className="log-footer">
        <button className="log-history-btn">Log History</button>
      </footer>
      <div className="System-info">
        <h1>Eskisehir Osmangazi</h1>
      </div>
      <nav className="main-menu-navigation">
        <ul>
          <li>
            <a href="/home">
              <FaPlus /> Add Device
            </a>
          </li>
          <li>
            <a href="/devices">
              <FaMicrochip /> Add Command
            </a>
          </li>
          <li>
            <a href="/schedule">
              <FaRegCalendarAlt /> Quick Schedule
            </a>
          </li>
          <li>
            <a href="/reports">
              <FaDesktop /> Administration Panel
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default QuickMenu;
