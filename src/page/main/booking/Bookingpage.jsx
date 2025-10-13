import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/bookingpage.css";
import MoviesPanel from "./panels/MoviesPanel";
import TheatersPanel from "./panels/TheatersPanel"
import TimesPanel from "./panels/TimesPanel"
import SeatMovie from "./SeatMovie";
import PaymentPage from "./PaymentPage";

export default function BookingPage() {
    const [step, setStep] = useState(1);
    // 모든 예약 관련 데이터를 하나의 객체로 관리
    const [bookingState, setBookingState] = useState({
        theater: null,
        movie: null,
        date: null,
        screening: null,
        people: null,
        selectedSeats: null,
    });

    // 단계 이동 핸들러
    const goToStep = (num) => setStep(num);

    const handleSelectTheater = (theater) => {
        setBookingState((prev) => ({
            ...prev,
            theater,
            movie: null,
            date: null,
            screening: null,
        }));
    };

    const handleSelectScreening = (screening) => {
        setBookingState((prev) => ({ ...prev, screening }));
        setStep(2);
    };


    return (
        <div className="booking-page">
            <div className="booking-container">
                <div className="booking-wrap">
                    <aside className="steps">
                        <div className={`step ${step === 1 ? "active" : ""}`}>
                            <div className="no">01</div>
                            <div className="label">상영시간</div>
                        </div>
                        <div className="divider" />
                        <div className={`step ${step === 2 ? "active" : ""}`}>
                            <div className="no">02</div>
                            <div className="label">인원/좌석</div>
                        </div>
                        <div className="divider" />
                        <div className={`step ${step === 3 ? "active" : ""}`}>
                            <div className="no">03</div>
                            <div className="label">결제</div>
                        </div>
                        <div className="divider" />
                        <div className={`step ${step === 4 ? "active" : ""}`}>
                            <div className="no">04</div>
                            <div className="label">완료</div>
                        </div>
                    </aside>

                    <div className="booking-main">
                        {step === 1 && (
                            <>
                                <div className="booking-header">
                                    <span className="booking-text">
                                        {bookingState.theater?.theater || "영화관"}
                                    </span>
                                    <span className="booking-text">
                                        {bookingState.movie?.title || "영화 선택"}
                                    </span>
                                    <span className="booking-text">
                                        {bookingState.date
                                            ? bookingState.date.toLocaleDateString()
                                            : "날짜 선택"}
                                    </span>
                                </div>
                                <div className="booking-content">
                                    <TheatersPanel
                                        onSelect={handleSelectTheater}
                                        selectedTheater={bookingState.theater}
                                    />
                                    <MoviesPanel
                                        selectedMovie={bookingState.movie}
                                        onSelect={(movie) =>
                                            setBookingState((prev) => ({ ...prev, movie }))
                                        }
                                        selectedTheater={bookingState.theater}
                                    />
                                    <TimesPanel
                                        selectedDate={bookingState.date}
                                        onChangeDate={(date) =>
                                            setBookingState((prev) => ({ ...prev, date }))
                                        }
                                        selectedTheater={bookingState.theater}
                                        selectedMovie={bookingState.movie}
                                        onSelectScreening={handleSelectScreening}
                                    />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <SeatMovie
                                screeningInfoId={bookingState.screening?.screeningInfoId}
                                movieData={bookingState.movie}
                                theaterData={bookingState.theater}
                                screeningData={bookingState.screening}
                                onBack={() => goToStep(1)}
                                onNext={(data) => {
                                    setBookingState((prev) => ({ ...prev, ...data }));
                                    goToStep(3);
                                }}
                            />
                        )}

                        {step === 3 && (
                            <PaymentPage
                                bookingInfo={bookingState}
                                onBack={() => goToStep(2)}
                                onComplete={() => goToStep(4)}
                            />
                        )}

                        {step === 4 && <h2>예매가 완료되었습니다 🎉</h2>}
                    </div>
                </div>
            </div>
        </div>
    );
}
