// src/page/admin/ScreeningsPage.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import "./css/screeningspage.css";

export default function ScreeningsPage() {
  const [form, setForm] = useState({
    movie: "",
    theater: "",
    startDate: "",
    endDate: "",
    time: "", // ⬅️ 추가
  });

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      movie: "귀시",
      theater: "극장1",
      startDate: "2025-09-20",
      endDate: "2025-09-27",
      time: "14:00",
    },
  ]);

  const timeRef = useRef(null);

  const handleLabelClick = () => {
    if (timeRef.current && timeRef.current.showPicker) {
      timeRef.current.showPicker(); // 크롬/엣지에서 지원
    } else if (timeRef.current) {
      timeRef.current.focus(); // showPicker 없는 브라우저 fallback
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.movie || !form.theater || !form.startDate || !form.endDate || !form.time) return;
  
    const newSchedule = {
      id: Date.now(),
      ...form,
    };
  
    //api연결 
    try {
      await axios.post("/api/screenings", newSchedule, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("상영일정 등록 완료:", newSchedule);
      setSchedules([...schedules, newSchedule]);
      setForm({ movie: "", theater: "", startDate: "", endDate: "", time: "" });
    } catch (err) {
      console.error("상영일정 등록 실패:", err);
    }
  };

  return (
    <div className="screenings-page">
      <h2>상영일정 등록</h2>
      <form className="screening-form" onSubmit={handleSubmit}>
        {/* 1줄 */}
        <div className="form-row">
          <select name="movie" value={form.movie} onChange={handleChange}>
            <option value="">영화 선택</option>
            <option value="귀시">귀시</option>
            <option value="좀비딸">좀비딸</option>
          </select>

          <select name="theater" value={form.theater} onChange={handleChange}>
            <option value="">상영관 선택</option>
            <option value="극장1">극장1</option>
            <option value="극장2">극장2</option>
          </select>

          <label>
            상영 시작일:
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </label>

          <label>
            상영 종료일:
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* 2줄 */}
        <div className="form-row">
          <label className="time-label" onClick={handleLabelClick}>
            상영 시간:
            <input
              ref={timeRef}
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
          </label>

          <button type="submit">상영일정 등록</button>
        </div>
      </form>

      <h3>등록된 상영일정</h3>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>영화</th>
            <th>상영관</th>
            <th>상영 시작일</th>
            <th>상영 종료일</th>
            <th>상영 시간</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map((s) => (
              <tr key={s.id}>
                <td>{s.movie}</td>
                <td>{s.theater}</td>
                <td>{s.startDate}</td>
                <td>{s.endDate}</td>
                <td>{s.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                등록된 일정이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
