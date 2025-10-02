import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/paymentpage.css";

export default function PaymentPage({ bookingInfo }) {
    const navigate = useNavigate();
    const [reservationInfo, setReservationInfo] = useState(null);
    const [usedPoint, setUsedPoint] = useState(0);

    console.log("📌 PaymentPage bookingInfo:", bookingInfo);

    // 🔹 페이지 진입 시 예약정보 불러오기
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/payment/reservation?bookingId=${bookingInfo.bookingId}`,
                    {
                        method: "GET",
                        credentials: "include",   // 세션 쿠키 같이 보냄
                    }
                );
                if (!res.ok) throw new Error("예약 정보 조회 실패");

                const data = await res.json();
                console.log("예약 상세:", data);
                setReservationInfo(data);
            } catch (err) {
                console.error("❌ 예약 정보 조회 에러:", err);
            }
        };

        if (bookingInfo?.bookingId) {
            fetchReservation();
        }
    }, [bookingInfo]);

    // 🔹 결제 로직은 아직 구현 안 함
   // 🔹 결제 로직
const handlePayment = async () => {
    if (!reservationInfo) return;

    try {
        const res = await fetch(
            `http://localhost:8080/api/payment?usedPoint=${usedPoint}&bookingId=${bookingInfo.bookingId}`,
            {
                method: "POST",
                credentials: "include", // 세션 쿠키 같이 보냄
            }
        );

        if (!res.ok) throw new Error("결제 실패");

        const msg = await res.text();
        alert(msg); // "결제 완료!!"
        navigate("/"); // 결제 후 홈으로 이동 (필요시 다른 페이지로)
    } catch (err) {
        console.error("❌ 결제 에러:", err);
        alert("결제 중 오류가 발생했습니다.");
    }
};

    return (
        <div className="payment-page">
            <h2>결제 페이지</h2>

            {/* 예약 요약 정보 */}
            {reservationInfo ? (
                <div className="summary">
                    <p><strong>영화:</strong> {reservationInfo.movieTitle}</p>
                    <p><strong>극장:</strong> {reservationInfo.theaterName}</p>
                    <p><strong>상영관:</strong> {reservationInfo.screenName}</p>
                    <p><strong>날짜:</strong> {reservationInfo.screeningDate}</p>
                    <p><strong>시간:</strong> {reservationInfo.startTime}</p>
                    <p><strong>좌석:</strong> {reservationInfo.seatSummary}</p>
                    <p><strong>티켓:</strong> {reservationInfo.ticketSummary} ({reservationInfo.ticketCount}매)</p>
                    <p><strong>총 금액:</strong> {reservationInfo.totalPrice.toLocaleString()}원</p>
                    <p><strong>보유 포인트:</strong> {reservationInfo.userPoint.toLocaleString()}P</p>

                    {/* 🔹 포인트 사용 입력칸 */}
                    <div className="point-box">
                        <label>사용할 포인트</label>
                        <div className="point-input">
                            <input
                                type="text"
                                value={usedPoint}
                                onChange={(e) => {
                                    let val = e.target.value.replace(/^0+/, "");
                                    if (val === "") val = "0";
                                    setUsedPoint(Number(val));
                                }}
                            />
                            <span className="unit">P</span>
                            <button
                                type="button"
                                className="use-all"
                                onClick={() => setUsedPoint(reservationInfo.userPoint)}
                            >
                                전액 사용
                            </button>
                        </div>
                        <p className="final-price">
                            최종 결제 금액: <strong>{(reservationInfo.totalPrice - usedPoint).toLocaleString()}</strong> 원
                        </p>
                    </div>

                </div>
            ) : (
                <div className="summary">예약 정보를 불러오는 중...</div>
            )}

            {/* 버튼 */}
            <div className="actions">
                <button onClick={() => navigate("/")}>취소</button>
                <button onClick={handlePayment}>결제 완료</button>
            </div>
        </div>
    );
}
