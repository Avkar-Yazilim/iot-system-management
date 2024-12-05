import React from "react";
import { FiInfo, FiTrash2, FiPlusCircle } from "react-icons/fi";

const DeviceCard = ({ name, status, image }) => {
  return (
    <div className="device-card">
      <img src={image} alt={name} className="device-image" />
      <div className="device-info">
        <h3>{name}</h3>
        <p className={status === "Online" ? "online" : "offline"}>{status}</p>
      </div>
      <div className="device-actions">
        <button className="info-btn">
          <FiInfo />
        </button>
        <button className="delete-btn">
          <FiTrash2 />
        </button>
        <button className="add-btn">
          <FiPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;
