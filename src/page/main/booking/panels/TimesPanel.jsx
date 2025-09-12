import React, { useState } from "react";
import "../css/timespanel.css";

export default function TimesPanel() {
    const today = new Date();
    const [currentWeekStart, setCurrentWeekStart] = useState(today);

    // 한 주(7일) 생성
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
            <div className="weather-header">
                <h3 className="weather-text">날짜 선택</h3>
            </div>
            <div className="header">
                <button onClick={() => moveWeek(-1)}>〈</button>
                <h3>{currentWeekStart.getMonth() + 1}월</h3>
                <button onClick={() => moveWeek(1)}>〉</button>
            </div>

            <div className="date-row">
                {weekDates.map((d) => (
                    <div key={d.num} className="date-item">
                        <div className="date">{d.num}</div>
                        <div className="day">{d.day}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
