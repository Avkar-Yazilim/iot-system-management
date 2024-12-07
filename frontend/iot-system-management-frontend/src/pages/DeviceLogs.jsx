import React, { useState } from "react";
import "./DeviceLogs.css";


const DeviceLogs = () => {
  const [logs] = useState([
    { id: 1, user: "Admin", action: "Added Soil Sensor", time: "2023-10-01 10:00:00" },
    { id: 2, user: "User1", action: "Updated Solar Panel", time: "2023-10-01 11:00:00" },
    { id: 3, user: "Admin", action: "Deleted Temperature Sensor", time: "2023-10-01 12:00:00" },
    { id: 4, user: "User2", action: "Added Moisture Sensor", time: "2023-10-01 13:00:00" },
    { id: 5, user: "Admin", action: "Updated Drone", time: "2023-10-01 14:00:00" },
    { id: 1, user: "Admin", action: "Added Soil Sensor", time: "2023-10-01 10:00:00" },
    { id: 2, user: "User1", action: "Updated Solar Panel", time: "2023-10-01 11:00:00" },
    { id: 3, user: "Admin", action: "Deleted Temperature Sensor", time: "2023-10-01 12:00:00" },
    { id: 4, user: "User2", action: "Added Moisture Sensor", time: "2023-10-01 13:00:00" },
    { id: 5, user: "Admin", action: "Updated Drone", time: "2023-10-01 14:00:00" },
    { id: 6, user: "User3", action: "Logged In", time: "2023-10-01 15:00:00" },
    { id: 7, user: "User2", action: "Updated Solar Panel", time: "2023-10-01 16:00:00" },
    { id: 8, user: "Admin", action: "Added Temperature Sensor", time: "2023-10-01 17:00:00" },
    { id: 9, user: "User1", action: "Deleted Moisture Sensor", time: "2023-10-01 18:00:00" },
    { id: 10, user: "Admin", action: "Updated Drone", time: "2023-10-01 19:00:00" },
    { id: 11, user: "User2", action: "Logged Out", time: "2023-10-01 20:00:00" },
    { id: 12, user: "Admin", action: "Added Solar Panel", time: "2023-10-01 21:00:00" },
    { id: 13, user: "User3", action: "Deleted Temperature Sensor", time: "2023-10-01 22:00:00" },
    { id: 14, user: "User1", action: "Updated Moisture Sensor", time: "2023-10-01 23:00:00" },
    { id: 15, user: "Admin", action: "Logged Out", time: "2023-10-01 00:00:00" }
    
    
  ]);

  return (
    <div className="logs-page">
      {/* Header */}
      <div className="logs-header">
        <h1 className="logs-title">Logs</h1>
        <div className="logs-search">
          <input
            type="text"
            className="logs-search-input"
            placeholder="Search in Logs"
          />
        </div>
      </div>

      {/* Logs List */}
      <div className="logs-container">
        {logs.map((log) => (
          <div key={log.id} className="log-item">
            <div className="log-avatar">{log.user[0]}</div>
            <div className="log-details">
              <p className="log-action">{log.action}</p>
              <p className="log-meta">By {log.user} at {log.time}</p>
            </div>
            <div className="log-arrow">›</div>
          </div>
        ))}
      </div>

      {/* Pagination 
      <div className="logs-pagination">
        <button className="pagination-btn">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
      </div> */}
    </div>
  );
};

export default DeviceLogs;
