import React, { useState, useEffect } from "react";
import "./css/seatmovie.css";

export default function SeatMovie({ screening, onBack, onNext }) {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [people, setPeople] = useState({
        adult: 0,
        teen: 0,
        senior: 0,
        disabled: 0,
    });

    useEffect(() => {
        if (!screening) return;

        fetch(`http://localhost:8080/api/reservation/seats?screeningInfoId=${screening.screeningInfoId}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("좌석 데이터:", data);
                console.log("선택된 상영정보:", screening);

                if (Array.isArray(data) && data.length > 0) {
                    setSeats(data);
                } else if (data && Array.isArray(data.seats) && data.seats.length > 0) {
                    setSeats(data.seats);
                } else {
                    // ✅ fallback: 5x5 좌석 생성
                    const fallbackSeats = [];
                    for (let row = 1; row <= 5; row++) {
                        for (let col = 1; col <= 5; col++) {
                            fallbackSeats.push({
                                id: `${row}-${col}`,   // 임시 id
                                row: row,
                                col: col,
                                status: "AVAILABLE",
                                occupied: false,
                            });
                        }
                    }
                    setSeats(fallbackSeats);
                }
            })
            .catch((err) => {
                console.error("좌석 불러오기 실패", err);

                // ❌ 에러 시에도 fallback 5x5 생성
                const fallbackSeats = [];
                for (let row = 1; row <= 5; row++) {
                    for (let col = 1; col <= 5; col++) {
                        fallbackSeats.push({
                            id: `${row}-${col}`,
                            row: row,
                            col: col,
                            status: "AVAILABLE",
                            occupied: false,
                        });
                    }
                }
                setSeats(fallbackSeats);
            });
    }, [screening]);


    const toggleSeat = (seat) => {
        if (seat.status !== "AVAILABLE") return;

        setSelectedSeats((prev) =>
            prev.find((s) => s.id === seat.id)
                ? prev.filter((s) => s.id !== seat.id)
                : [...prev, seat]
        );
    };

    const totalPeople = Object.values(people).reduce((a, b) => a + b, 0);

    const groupedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.row]) acc[seat.row] = [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    return (
        <div className="seat-page">
            {/* 영화 정보 */}
            <div className="seat-header">
                <img src={screening.posterUrl} alt={screening.movieTitle} className="poster" />
                <div className="movie-info">
                    <h3>{screening.movieTitle}</h3>
                    <p>
                        {screening.screeningDate} | {screening.startTime} ~ {screening.endTime}
                    </p>
                    <p>{screening.screenName}</p>
                </div>
            </div>

            {/*  인원 선택 */}
            <div className="people-select">
                {["adult", "teen", "senior", "disabled"].map((type) => (
                    <div key={type} className="counter">
                        <span className="label">
                            {type === "adult" && "성인"}
                            {type === "teen" && "청소년"}
                            {type === "senior" && "노약자"}
                            {type === "disabled" && "장애인"}
                        </span>
                        <button
                            onClick={() =>
                                setPeople((p) => ({ ...p, [type]: Math.max(0, p[type] - 1) }))
                            }
                        >
                            −
                        </button>
                        <span>{people[type]}</span>
                        <button
                            onClick={() =>
                                setPeople((p) => ({ ...p, [type]: Math.min(8, p[type] + 1) }))
                            }
                        >
                            +
                        </button>
                    </div>
                ))}
            </div>

            {/*  스크린 */}
            <div className="screen-bar">SCREEN</div>

            <div className="seat-area">
                {Object.keys(groupedSeats).map((row) => (
                    <div key={row} className="seat-row">
                        <span className="row-label">{row}</span>
                        <div className="row-seats">
                            {groupedSeats[row]
                                .sort((a, b) => a.col - b.col) // 열 순서대로 정렬
                                .map((seat) => (
                                    <div
                                        key={seat.id}
                                        className={`seat ${seat.occupied ? "reserved" : "available"} ${selectedSeats.find((s) => s.id === seat.id) ? "selected" : ""
                                            }`}
                                        onClick={() => !seat.occupied && toggleSeat(seat)}
                                    >
                                        {seat.col}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {/*  하단 버튼 */}
            <div className="actions">
                <button onClick={onBack}>이전</button>
                <button
                    disabled={selectedSeats.length === 0 || selectedSeats.length !== totalPeople}
                    onClick={onNext}
                >
                    결제하기
                </button>
            </div>
        </div>
    );
}
