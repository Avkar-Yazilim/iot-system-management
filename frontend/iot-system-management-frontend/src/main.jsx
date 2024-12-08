import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MMenu from './Menu/MMenu';
import ScheduleMenu from './Menu/ScheduleMenu';
import DevicesMenu from './Menu/DevicesMenu';
import ReportsMenu from './Menu/ReportsMenu';
import SettingsMenu from './Menu/SettingsMenu';
import DeviceLogMenu from './Menu/DeviceLogMenu'; // DeviceLogs bileşenini içe aktarın
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainmenu" element={<MMenu />} />
        <Route path="/schedule" element={<ScheduleMenu />} />
        <Route path="/devices" element={<DevicesMenu />} />
        <Route path="/reports" element={<ReportsMenu />} />
        <Route path="/settings" element={<SettingsMenu />} />
        <Route path="/devicelogs" element={<DeviceLogMenu />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);
