import React, { useState } from "react";
import "./WeeklySchedule.css";

const WeeklySchedule = () => {
  const days = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const hours = Array.from({ length: 15 }, (_, i) => `${9 + i}:00`);
  const [events, setEvents] = useState([]);

  const addEvent = (day, hour) => {
    const title = prompt("Etkinlik adı girin:");
    if (title) {
      setEvents([...events, { day, hour, title }]);
    }
  };

  return (
    <div className="weekly-schedule">
      {/* Gün Başlıkları */}
      <div className="days-header">
        {days.map((day, index) => (
          <div key={index} className={`day ${index === 6 ? "active-day" : ""}`}>
            <span>{day}</span>
            <span>{index + 1}</span>
          </div>
        ))}
      </div>

      {/* Saatler ve Günlerin Hücreleri */}
      <div className="schedule-grid">
        {/* Saatler Sütunu */}
        <div className="hours-column">
          {hours.map((hour, index) => (
            <div key={index} className="hour">
              {hour}
            </div>
          ))}
        </div>

        {/* Günlere Göre Hücreler */}
        {days.map((_, dayIndex) => (
          <div key={dayIndex} className="day-column">
            {hours.map((_, hourIndex) => (
              <div
                key={hourIndex}
                className="time-slot"
                onClick={() => addEvent(dayIndex, hourIndex)}
              >
                {events
                  .filter((event) => event.day === dayIndex && event.hour === hourIndex)
                  .map((event, eventIndex) => (
                    <div key={eventIndex} className="event">
                      {event.title}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
