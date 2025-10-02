import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/seatmovie.css";

export default function SeatMovie({ screeningInfoId, movieData, screeningData,
    theaterData, onBack, onNext }) {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [people, setPeople] = useState({
        adult: 0,
        teen: 0,
        senior: 0,
        disabled: 0,
    });

    const [screenData, setScreenData] = useState(null);


    console.log("screeningInfoId:", screeningInfoId);
    console.log("movieData:", movieData);
    console.log("theaterData:", theaterData);
    console.log("screeningData:", screeningData);

    useEffect(() => {
        if (!screeningInfoId) return;

        axios
            .get("http://localhost:8080/api/booking/screen", {
                params: { screeningInfoId },
                withCredentials: true,
            })
            .then((res) => {
                console.log("🎬 좌석 응답 원본:", res.data);
                console.log("🎬 좌석 응답(JSON):", JSON.stringify(res.data, null, 2));
                setScreenData(res.data);
                setSeats(res.data.seats || []); // 좌석 상태 업데이트
            })
            .catch((err) => {
                console.error("❌ 좌석 조회 실패:", err);
                if (err.response) {
                    console.error("📌 서버 응답 상태:", err.response.status);
                    console.error("📌 서버 응답 데이터:", err.response.data); // 상세 메시지 확인
                }
            });

    }, [screeningInfoId]);

    const toggleSeat = (seat) => {
        if (seat.occupied) return; // reserved 좌석은 선택 안 되게
        setSelectedSeats((prev) =>
            prev.find((s) => s.id === seat.id)
                ? prev.filter((s) => s.id !== seat.id)
                : [...prev, seat]
        );
    };

    const totalPeople = Object.values(people).reduce((a, b) => a + b, 0);

    const tickets = [
        { customerType: "성인", count: people.adult },
        { customerType: "청소년", count: people.teen },
        { customerType: "노약자", count: people.senior },
        { customerType: "장애인", count: people.disabled },
    ];


    const handlePayment = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/booking", {
                screeningInfoId,
                tickets,
                selectedSeatIds: selectedSeats.map((s) => s.id),
            }, { withCredentials: true });

            const bookingId = res.data;
            alert(res.data); // "예약정보 저장 완료!!"
            onNext({
                bookingId,
                people,
                selectedSeats,
            }); //  BookingPage에 데이터 전달
        } catch (err) {
            console.error("❌ 예약 저장 실패:", err);
            alert("예약 중 오류 발생");
        }
    };

    return (
        <div className="seat-page">
            <div className="seat-header">
                {movieData?.posterUrl && (
                    <img src={movieData.posterUrl} alt={movieData.title} className="poster" />
                )}
                <div className="movie-info">
                    <h3>{movieData?.title || screeningData?.movieTitle}</h3>
                    <p>
                        {screeningData?.screeningDate} | {screeningData?.startTime} ~ {screeningData?.endTime}
                    </p>
                    <p>{theaterData?.theaterName} - {screeningData?.screenName}</p>
                </div>
            </div>


            {/* 인원 선택 */}
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

            {/* 스크린 */}
            <div className="screen-bar">SCREEN</div>

            <div className="seat-area">
                {Array.from({ length: screenData?.rows || 0 }, (_, rowIdx) => (
                    <div key={rowIdx} className="seat-row">
                        <span className="row-label">{String.fromCharCode(65 + rowIdx)}</span>
                        <div className="row-seats">
                            {Array.from({ length: screenData?.cols || 0 }, (_, colIdx) => {
                                const seat = seats.find(
                                    (s) => s.rowNumber === rowIdx + 1 && s.colNumber === colIdx + 1
                                );
                                if (!seat) return <div key={colIdx} className="seat empty" />; // 좌석이 없을 경우 빈칸

                                return (
                                    <div
                                        key={seat.id}
                                        className={`seat 
                ${seat.occupied ? "reserved" : "available"} 
                ${selectedSeats.find((s) => s.id === seat.id) ? "selected" : ""}`}
                                        onClick={() => {
                                            if (!seat.occupied) toggleSeat(seat); // reserved 좌석은 클릭 불가
                                        }}
                                    >
                                        {seat.seatNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>



            {/* 하단 버튼 */}
            <div className="actions">
                <button onClick={onBack}>이전</button>
                <button
                    disabled={
                        selectedSeats.length === 0 ||
                        selectedSeats.length !== totalPeople
                    }
                    onClick={handlePayment} //  handlePayment 호출
                >
                    결제하기
                </button>
            </div>
        </div>
    );
}
