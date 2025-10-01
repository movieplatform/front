import React from "react";
import "./css/paymentpage.css";

export default function PaymentPage({
    bookingInfo,
    onBack,
    onComplete
}) {
    return (
        <div className="payment-page">
            <h2>결제 페이지</h2>

            {/* 예약 요약 정보 */}
            <div className="summary">
                <p><strong>영화:</strong> {bookingInfo.movieData?.title}</p>
                <p><strong>극장:</strong> {bookingInfo.theaterData?.theaterName}</p>
                <p><strong>시간:</strong> {bookingInfo.screeningData?.screeningDate} {bookingInfo.screeningData?.startTime} ~ {bookingInfo.screeningData?.endTime}</p>
                <p><strong>좌석:</strong> {bookingInfo.selectedSeats?.map(s => s.seatNumber).join(", ")}</p>
                <p><strong>인원:</strong>
                    성인 {bookingInfo.people?.adult || 0},
                    청소년 {bookingInfo.people?.teen || 0},
                    노약자 {bookingInfo.people?.senior || 0},
                    장애인 {bookingInfo.people?.disabled || 0}
                </p>
            </div>

            {/* 버튼 */}
            <div className="actions">
                <button onClick={onBack}>뒤로</button>
                <button onClick={onComplete}>결제 완료</button>
            </div>
        </div>
    );
}
