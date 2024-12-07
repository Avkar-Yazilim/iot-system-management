import React from "react";
import DeviceCard from "../components/DeviceCard";
import "../pages/DeviceList.css";

const devices = [
  { name: "Soil Sensor", status: "Offline", image: "src/images/device1.png" },
  { name: "Solar Panel", status: "Online", image: "src/images/device2.jpg" },
  { name: "Soil Sensor 2", status: "Online", image: "/images/device3.jpg" },
  { name: "Temperature Sensor", status: "Online", image: "/images/device4.jpg" },
  { name: "Moisture Sensor", status: "Offline", image: "/images/device5.jpg" },
  { name: "Drone", status: "Online", image: "/images/device6.jpg" },
];

const DeviceList = () => {
  return (
    <div className="device-list">
      <div className="search-bar">
        <input type="text" placeholder="Search Device" />
      </div>
      <div className="device-container">
        <div className="add-device">
          <button className="add-device-btn"> + Add Device</button>
        </div>
        {devices.map((device, index) => (
          <DeviceCard
            key={index}
            name={device.name}
            status={device.status}
            image={device.image}
          />
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
