import React, { useState, useEffect, useMemo } from "react";
import { FiFilm, FiMonitor, FiClock } from "react-icons/fi";
import KnowLoginModal from "../../movies/KnowLoginModal";
import "../css/timespanel.css";

function DateItem({ date, isToday, isSelected, onClick }) {
    return (
        <div className="date-item" onClick={() => onClick(date)}>
            <div className={`date-num ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}>
                {date.getDate()}
            </div>
            <div className="day">
                {date.toLocaleDateString("ko-KR", { weekday: "short" })}
            </div>
        </div>
    );
}

function ScheduleCard({ screening, onSelect }) {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleClick = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/booking/isLogin`, {
                credentials: "include",
            });

            if (!res.ok) {
                // 401 → 로그인 안 된 상태
                setShowLoginModal(true);
                return;
            }

            // 200 OK → 로그인됨
            const msg = await res.text();
            console.log(msg);
            onSelect?.(screening);
            if (msg.includes("로그인이 필요")) {
                setShowLoginModal(true);
            } else {
                onSelect?.(screening); // 로그인 OK → 예약 진행
            }
        } catch (err) {
            console.error("❌ 로그인 체크 실패:", err);
            setShowLoginModal(true);
        }
    };

    return (
        <>
            <div className="schedule-card" onClick={handleClick}>
                <div className="movie-info">
                    <FiFilm className="icon" /> {screening.movieTitle.trim()}
                </div>
                <div className="screen-info">
                    <span className="screen-name">
                        <FiMonitor className="icon" /> {screening.screenName}
                    </span>
                    <div className="time-chip">
                        <FiClock className="icon" />
                        {screening.startTime.slice(0, 5)} ~ {screening.endTime.slice(0, 5)}
                    </div>
                </div>
            </div>
            {/* 🔹 로그인 필요 모달 */}
            {showLoginModal && (
                <KnowLoginModal onClose={() => setShowLoginModal(false)} />
            )}
        </>
    );
}



export default function TimesPanel({
    selectedDate,
    onChangeDate,
    selectedTheater,
    selectedMovie,
    onSelectScreening,
}) {
    const today = new Date();
    const [currentWeekStart, setCurrentWeekStart] = useState(today);
    const [times, setTimes] = useState([]);

    //  주 단위 날짜 계산
    const weekDates = useMemo(
        () =>
            Array.from({ length: 7 }, (_, i) => {
                const d = new Date(currentWeekStart);
                d.setDate(currentWeekStart.getDate() + i);
                return d;
            }),
        [currentWeekStart]
    );

    //  주차 이동
    const moveWeek = (direction) => {
        setCurrentWeekStart((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + direction * 7);
            return newDate;
        });
    };

    // API 호출
    useEffect(() => {
        if (!selectedTheater || !selectedMovie || !selectedDate) {
            setTimes([]);
            return;
        }

        const dateStr = selectedDate.toISOString().slice(0, 10);

        fetch(
            `${process.env.REACT_APP_API_URL}/api/reservation/screenInfo?theaterId=${selectedTheater.id}&docId=${selectedMovie.docId}&screeningDate=${dateStr}`,
            { credentials: "include" }
        )
            .then((res) => {
                if (!res.ok) throw new Error("API 실패: " + res.status);
                return res.json(); //  Response → JSON 변환
            })
            .then((data) => {
                console.log("🎬 상영 일정 응답 JSON:", data);
                setTimes(Array.isArray(data) ? data : data.screenings || []);
            })
            .catch((err) => {
                console.error("❌ 상영 일정 호출 실패:", err);
                setTimes([]);
            });
    }, [selectedTheater, selectedMovie, selectedDate]);


    // 상영 일정 렌더링
    const renderShowtimes = () => {
        if (!selectedTheater || !selectedMovie || !selectedDate) {
            return <div className="empty">극장과 영화를 먼저 선택해주세요</div>;
        }
        if (times.length === 0) {
            return <div className="empty">상영 일정이 없습니다.</div>;
        }
        return (
            <div className="schedule-list">
                {Array.isArray(times) && times.map((t, idx) => (
                    <ScheduleCard key={idx} screening={t} onSelect={onSelectScreening} />
                ))}
            </div>
        );
    };

    return (
        <div className="times-panel">
            <div className="times-header">
                <h3 className="times-text">날짜 선택</h3>
            </div>

            <div className="header">
                <button onClick={() => moveWeek(-1)}>〈</button>
                <h3>{currentWeekStart.getMonth() + 1}월</h3>
                <button onClick={() => moveWeek(1)}>〉</button>
            </div>

            <div className="date-row">
                {weekDates.map((d) => (
                    <DateItem
                        key={d.toDateString()}
                        date={d}
                        isToday={d.toDateString() === today.toDateString()}
                        isSelected={d.toDateString() === selectedDate?.toDateString()}
                        onClick={onChangeDate}
                    />
                ))}
            </div>

            <div className="showtimes">{renderShowtimes()}</div>
        </div>
    );
}
