import React, { useEffect, useState } from "react";
import "./css/reservationpage.css";
import crimeCityPoster from "../../../../asset/crimecity.jpg";
export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 목업 데이터 예시
const mockReservations = [
  {
    bookingCode: "0074-01",
    movieTitle: "범죄도시4",
    screeningTime: "2025-09-15 19:00",
    theater: "CGV 광주첨단",
    room: "2관",
    people: 2,
    seats: ["C4", "C5"],
    reservedAt: "2025-09-10 14:32",
    totalPrice: 22000,
    posterUrl: crimeCityPoster // public 폴더 기준 경로인데 백엔드연결하면 url로 바뀜
  }
];


  useEffect(() => {
    fetch("/api/my-reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch(() => {
        // 실패 시 목업 사용
        setReservations(mockReservations);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="reservations-section">
      <h2>예매 내역</h2>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <div className="reservation-list">
          {reservations.map((rsv, idx) => (
            <div className="reservation-ticket" key={idx}>
              <div className="ticket-left">
                <img
                  src={rsv.posterUrl}
                  alt={`${rsv.movieTitle} 포스터`}
                  className="poster"
                />
              </div>
              <div className="ticket-right">
                <div className="ticket-header">
                  <span className="ticket-id">예매번호 {rsv.bookingCode}</span>
                  <span className="price">{rsv.totalPrice.toLocaleString()}원</span>
                </div>

                <div className="movie-title">{rsv.movieTitle}</div>

                <div className="ticket-row">
                  <span className="label">관람극장</span>
                  <span>{rsv.theater}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">관람일시</span>
                  <span>{rsv.screeningTime}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">상영관</span>
                  <span>{rsv.room}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">관람인원</span>
                  <span>일반 {rsv.people}명</span>
                </div>
                <div className="ticket-row">
                  <span className="label">관람좌석</span>
                  <span>{rsv.seats?.join(", ")}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">매수</span>
                  <span>{rsv.people}매</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

