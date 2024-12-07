import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SchedulePage.css";
import { FaSearch, FaBell, FaRegCommentDots, FaPlus } from "react-icons/fa";


const SchedulePage = () => {
    const [date, setDate] = useState(new Date());
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        // Etkinlik ekleme işlemleri burada yapılacak
        togglePanel();
    };

    return (
        <div className="schedule-page-container">

            <div className="schedule-page">
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
                <button className="add-event-button" onClick={togglePanel}>
                    <FaPlus /> Add Event
                </button>
                {isPanelOpen && (
                    <div className="event-panel">
                        <h2>Add New Event</h2>
                        <form onSubmit={handleAddEvent}>
                            <label>
                                Event Title:
                                <input type="text" name="title" required />
                            </label>
                            <label>
                                Start Time:
                                <input type="time" name="startTime" required />
                            </label>
                            <label>
                                End Time:
                                <input type="time" name="endTime" required />
                            </label>
                            <label>
                                Status:
                                <select name="status" required>
                                    <option value="Planned">Planned</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </label>
                            <button type="submit">Add Event</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchedulePage;     //merhaba dostlar keyifler nasıl? <3 );