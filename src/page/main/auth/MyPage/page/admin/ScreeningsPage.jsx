// src/page/admin/ScreeningsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/screeningspage.css";
import Select from "react-select";


export default function ScreeningsPage() {
    const [form, setForm] = useState({
        theater: "",
        screen: "",
    });


    const [schedules, setSchedules] = useState([]);
    const [theaterOptions, setTheaterOptions] = useState([]);
    const [screenOptions, setScreenOptions] = useState([]);
    const [selectedTheaterName, setSelectedTheaterName] = useState("");


    // src/page/admin/ScreeningsPage.jsx

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.theater || !form.screen) return;

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/screenings`,
                null,
                { params: { screenId: form.screen }, withCredentials: true }
            );

            console.log("상영일정 등록 완료:", res.data);
            await fetchSchedules(form.theater);
            setForm({ theater: "", screen: "" });
            alert(res.data); // 성공 메시지 알림
        } catch (err) {
            console.error("상영일정 등록 실패:", err);
            if (err.response && err.response.data) {
                alert(err.response.data); // 백엔드 RuntimeException 메시지 알림
            } else {
                alert("상영일정 등록 중 오류가 발생했습니다.");
            }
        }
    };


    const fetchTheaters = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/theaters`, { withCredentials: true });
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
                // URL을 백틱으로 감싸야 ${theaterId} 변수가 제대로 적용됩니다.
                `${process.env.REACT_APP_API_URL}/api/admin/screens/${theaterId}`,
                { withCredentials: true }
            );
            const options = res.data.map((s) => ({
                value: s.id,
                label: s.screenName,
            }));
            setScreenOptions(options);
        } catch (err) {
            console.error("상영관 목록 불러오기 실패:", err);
        }
    };

    const fetchSchedules = async (theaterId) => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/screenings/${theaterId}`,
                { withCredentials: true }
            );
            console.log("조회된 상영일정:", res.data);
            setSchedules(res.data.dates); // dates 배열을 schedules에 저장
        } catch (err) {
            console.error("상영일정 불러오기 실패:", err);
        }
    };



    useEffect(() => {
        fetchTheaters(); // 페이지 로드 시 극장 목록 불러오기
    }, []);
    useEffect(() => {
        if (theaterOptions.length > 0) {
            // 맨 앞 극장 기준으로 상영일정 가져오기
            fetchSchedules(theaterOptions[0].value);
            setSelectedTheaterName(theaterOptions[0].label);
        }
    }, [theaterOptions]);

    // 스타일 커스텀
    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "#1a1d26",
            border: "1px solid #ffcc00",
            borderRadius: "8px",
            minHeight: "38px",
        }),
        singleValue: (base) => ({ ...base, color: "#fff" }),
        menu: (base) => ({ ...base, backgroundColor: "#2c2f38" }),
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
                        onChange={(opt) => setForm({ ...form, screen: opt.value })}
                        styles={customStyles}
                        isDisabled={screenOptions.length === 0}
                    />

                    <button type="submit" className="btn">상영일정 등록</button>
                </div>
            </form>

            <h3>
                등록된 상영일정
                {selectedTheaterName && <p>극장: {selectedTheaterName}</p>}
                {theaterOptions.map((theater) => (
                    <button
                        key={theater.value}
                        className={`theater-btn ${selectedTheaterName === theater.label ? "active" : ""}`}
                        onClick={() => {
                            fetchSchedules(theater.value);
                            setSelectedTheaterName(theater.label);
                        }}
                    >
                        {theater.label}
                    </button>
                ))}
            </h3>

            <div className="schedule-list">
                {schedules.length > 0 ? (
                    schedules.map((dateItem, idx) => (
                        <div key={idx} className="schedule-card">
                            <h4>{dateItem.date}</h4>
                            {dateItem.screens.map((screen, sIdx) => (
                                <div key={sIdx} className="screen-block">
                                    <h5>{screen.screenName}</h5>
                                    <ul>
                                        {screen.movies.map((movie, mIdx) => (
                                            <li key={mIdx}>
                                                <span className="time">
                                                    {movie.startTime} ~ {movie.endTime}
                                                </span>
                                                <span className="title">{movie.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>등록된 일정이 없습니다.</p>
                )}
            </div>

        </div>
    );
}
