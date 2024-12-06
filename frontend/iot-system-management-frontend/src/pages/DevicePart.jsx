import React from "react";
import { FaPlus, FaMicrochip } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./DevicePart.css";

const DevicePart = () => {
  const navigate = useNavigate();

  const handleLog = () => {
    navigate("/devicelogs");
  };

  return (
    <div className="device-menu">
      <button className="log-history-btn" onClick={handleLog}>
        Log History
      </button>
      <div className="System-info">
        <h1>Device Management</h1>
      </div>
      <nav className="device-menu-navigation">
        <ul>
          <li>
            <a href="/home">
              <FaPlus /> Add New Category
            </a>
          </li>
          <li>
            <a href="/devices">
              <FaMicrochip /> Delete Category
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DevicePart;
