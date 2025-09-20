// src/page/admin/ScreeningsPage.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/screeningspage.css";
import Select from "react-select";


export default function ScreeningsPage() {
  const [form, setForm] = useState({
    movie: "",
    theater: "",
    screen: "",
    startDate: "",
    endDate: "",
    time: "",
  });

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const [schedules, setSchedules] = useState([]);


  const [theaterOptions, setTheaterOptions] = useState([]);
  const [screenOptions, setScreenOptions] = useState([]);


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
      setForm({ movie: "", theater: "", screen: "", startDate: "", endDate: "", time: "" });
    } catch (err) {
      console.error("상영일정 등록 실패:", err);
    }
  };

  const fetchTheaters = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/theaters", { withCredentials: true });
      const options = res.data.map((t) => ({
        value: t.id,
        label: t.theaterName
      }));
      setTheaterOptions(options);
    } catch (err) {
      console.error("극장 목록 불러오기 실패:", err);
    }
  };

  // 특정 극장의 상영관 불러오기
  const fetchScreens = async (theaterId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/admin/screens/${theaterId}`,
        { withCredentials: true }
      );
      const options = res.data.map((s) => ({
        value: s.id,
        label: s.screenName
      }));
      setScreenOptions(options);
    } catch (err) {
      console.error("상영관 목록 불러오기 실패:", err);
    }
  };


  useEffect(() => {
    fetchTheaters(); // 페이지 로드 시 극장 목록 불러오기
  }, []);

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
          {/* 극장 선택 */}
          <Select
            placeholder="극장 선택"
            options={theaterOptions}
            value={theaterOptions.find((opt) => opt.value === form.theater) || null}
            onChange={(opt) => {
              setForm({ ...form, theater: opt.value, screen: "" }); // 극장 선택 시 상영관 초기화
              fetchScreens(opt.value); // 해당 극장의 상영관 목록 가져오기
            }}
            styles={customStyles}
          />

          {/* 상영관 선택 */}
          <Select
            placeholder="상영관 선택"
            options={screenOptions}
            value={screenOptions.find((opt) => opt.value === form.screen) || null}
            onChange={(opt) => setForm({ ...form, screen: opt.value })} // screen만 세팅
            styles={customStyles}
            isDisabled={screenOptions.length === 0} // 극장 선택 전에는 비활성화
          />

          <label
            onClick={() => {
              if (startDateRef.current?.showPicker) {
                startDateRef.current.showPicker(); // 크롬/엣지 등 지원
              } else {
                startDateRef.current?.focus(); // fallback
              }
            }}
          >
            상영 시작일:
            <input
              type="date"
              name="startDate"
              ref={startDateRef}
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </label>

          <label
            onClick={() => {
              if (endDateRef.current?.showPicker) {
                endDateRef.current.showPicker();
              } else {
                endDateRef.current?.focus();
              }
            }}
          >
            상영 종료일:
            <input
              type="date"
              name="endDate"
              ref={endDateRef}
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
            />
          </label>
          <button type="submit" className="btn">상영일정 등록</button>
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
