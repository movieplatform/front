import React, { useState } from "react";
import "../css/timespanel.css";

export default function TimesPanel() {
    const today = new Date();
    const [currentWeekStart, setCurrentWeekStart] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today);

    const getWeekDates = (startDate) => {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            week.push({
                date,
                day: date.toLocaleDateString("ko-KR", { weekday: "short" }),
                num: date.getDate(),
            });
        }
        return week;
    };

    const weekDates = getWeekDates(currentWeekStart);

    const moveWeek = (direction) => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(currentWeekStart.getDate() + direction * 7);
        setCurrentWeekStart(newDate);
    };

    return (
        <div className="times-panel">
            <div className="times-header">
                <h3 className="weather-text">날짜 선택</h3>
            </div>
            <div className="header">
                <button onClick={() => moveWeek(-1)}>〈</button>
                <h3>{currentWeekStart.getMonth() + 1}월</h3>
                <button onClick={() => moveWeek(1)}>〉</button>
            </div>

            <div className="date-row">
                {weekDates.map((d) => {
                    const isToday = d.date.toDateString() === today.toDateString();
                    const isSelected = d.date.toDateString() === selectedDate.toDateString();

                    return (
                        <div
                            key={d.num}
                            className="date-item"
                            onClick={() => setSelectedDate(d.date)}
                        >
                            <div
                                className={`date-num
                                    ${isToday ? "today" : ""}
                                    ${isSelected ? "selected" : ""}`}
                            >
                                {d.num}
                            </div>
                            <div
                                className={`day ${
                                    d.day === "일"
                                        ? "sunday"
                                        : d.day === "토"
                                        ? "saturday"
                                        : ""
                                }`}
                            >
                                {d.day}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
