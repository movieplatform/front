// src/page/admin/ScreeningsPage.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import "./css/screeningspage.css";
import Select from "react-select";


export default function ScreeningsPage() {
  const [form, setForm] = useState({
    movie: "",
    theater: "",
    startDate: "",
    endDate: "",
    time: "",
  });


  // Screening_info에 끝나는시점 칼럼없어서 만들어야할듯
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
      timeRef.current.showPicker();
    } else if (timeRef.current) {
      timeRef.current.focus();
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

  // react-select 옵션
  const movieOptions = [
    { value: "귀시", label: "귀시" },
    { value: "좀비딸", label: "좀비딸" },
  ];

  const theaterOptions = [
    { value: "극장1", label: "극장1" },
    { value: "극장2", label: "극장2" },
  ];

  // 스타일 커스텀
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#1a1d26",
      border: "1px solid #ffcc00",
      borderRadius: "8px",
      minHeight: "38px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#2c2f38",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#444" : "#2c2f38",
      color: "#fff",
      cursor: "pointer",
    }),
  };

  return (
    <div className="screenings-page">
      <h2>상영일정 등록</h2>
      <form className="screening-form" onSubmit={handleSubmit}>
        {/* 1줄 */}
        <div className="form-row">
          <Select
            placeholder="영화 선택"
            options={movieOptions}
            value={movieOptions.find((opt) => opt.value === form.movie) || null}
            onChange={(opt) => setForm({ ...form, movie: opt.value })}
            styles={customStyles}
          />

          <Select
            placeholder="상영관 선택"
            options={theaterOptions}
            value={theaterOptions.find((opt) => opt.value === form.theater) || null}
            onChange={(opt) => setForm({ ...form, theater: opt.value })}
            styles={customStyles}
          />

          <label>
            상영 시작일:
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </label>

          <label>
            상영 종료일:
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
              onChange={(e) => setForm({ ...form, time: e.target.value })}
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
            {/* <th>상영 시간</th> */}
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
