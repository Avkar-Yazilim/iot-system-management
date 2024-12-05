import React, { useState } from "react";
import Calendar from "react-calendar"; // react-calendar kütüphanesi
import "react-calendar/dist/Calendar.css"; // React Calendar için varsayılan stil
import "./Schedule.css"; // Özel CSS dosyamız
import { FaSearch, FaBell, FaRegCommentDots } from "react-icons/fa"; 

const Schedule = () => {
  const [date, setDate] = useState(new Date()); // Seçilen tarihi sakla

  // Örnek program verileri
  const scheduleData = [
    {
      day: "Thu",
      date: "17",
      events: [
        { title: "Device 1", time: "8:00 am - 12:00 am", status: "Planned" },
        { title: "Device 3", time: "2:00 pm - 6:00 pm", status: "Planned" },
      ],
    },
  ];

  return (
    <div className="schedule">
      {/* Sağ üstteki butonlar */}
      <div className="top-buttons">
        <button className="top-button">
          <FaSearch />
        </button>
        <button className="top-button">
          <FaBell />
        </button>
        <button className="top-button">
          <FaRegCommentDots />
        </button>
      </div>
      <div className="calendar-header-wrapper">
        <h2>Select date</h2>
        <div className="calendar-wrapper">
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
      <div className="selected-date">
        <h3>
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </h3>
      </div>
    </div>
  );
};

export default Schedule;
