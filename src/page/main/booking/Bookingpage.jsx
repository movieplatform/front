import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/bookingpage.css";
import MoviesPanel from "./panels/MoviesPanel";
import TheatersPanel from "./panels/TheatersPanel"
import TimesPanel from "./panels/TimesPanel"
import SeatMovie from "./SeatMovie";


export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedScreening, setSelectedScreening] = useState(null);
    const [showSeatModal, setShowSeatModal] = useState(false);


    // 단계 이동 핸들러
    const goToStep = (num) => setStep(num);
    const navigate = useNavigate();

    // 극장 선택 핸들러
    const handleSelectTheater = (theater) => {
        if (!theater) {
            // 극장 취소 → 영화/날짜/상영정보 모두 초기화
            setSelectedTheater(null);
            setSelectedMovie(null);
            setSelectedDate(null);
            setSelectedScreening(null);
        } else {
            setSelectedTheater(theater);
            // 극장 바뀌면 뒤 단계 초기화
            setSelectedMovie(null);
            setSelectedDate(null);
            setSelectedScreening(null);
        }
    };

    // 영화 선택 핸들러
    const handleSelectMovie = (movie) => {
        if (!movie) {
            setSelectedMovie(null);
            setSelectedDate(null);
            setSelectedScreening(null);
        } else {
            setSelectedMovie(movie);
            setSelectedDate(null);
            setSelectedScreening(null);
        }
    };

    // 날짜 선택 핸들러
    const handleSelectDate = (date) => {
        if (!date) {
            setSelectedDate(null);
            setSelectedScreening(null);
        } else {
            setSelectedDate(date);
            setSelectedScreening(null);
        }
    };

    const handleSelectScreening = (screening) => {
        setSelectedScreening(screening);
        setShowSeatModal(true); // BookingPage 안에서 SeatMovie 보여주기
        setStep(2);             // 단계 전환
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
                        {/* 단계별 컴포넌트 */}
                        {step === 1 && (
                            <>
                                <div className="booking-header">
                                    <span className="booking-text">
                                        {selectedTheater?.theater || "영화관"}
                                    </span>
                                    <span className="booking-text">
                                        {selectedMovie ? selectedMovie.title : "영화 선택"}
                                    </span>
                                    <span className="booking-text">
                                        {selectedDate
                                            ? selectedDate.toLocaleDateString()
                                            : "날짜 선택"}
                                    </span>
                                </div>
                                <div className="booking-content">
                                    <TheatersPanel
                                        onSelect={setSelectedTheater}
                                        selectedTheater={selectedTheater}
                                    />
                                    <MoviesPanel
                                        selectedMovie={selectedMovie}
                                        onSelect={setSelectedMovie}
                                        selectedTheater={selectedTheater}
                                    />
                                    <TimesPanel
                                        selectedDate={selectedDate}
                                        onChangeDate={setSelectedDate}
                                        selectedTheater={selectedTheater}
                                        selectedMovie={selectedMovie}
                                        onSelectScreening={handleSelectScreening}
                                    />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <SeatMovie
                            screeningInfoId={selectedScreening.screeningInfoId}
                                onBack={() => goToStep(1)} // 뒤로 가기 버튼
                                onNext={() => goToStep(3)} // 다음 단계 (결제)
                            />
                        )}

                        {step === 3 && (
                            <div>
                                <h2>결제 페이지</h2>
                                <button onClick={() => goToStep(2)}>뒤로</button>
                                <button onClick={() => goToStep(4)}>결제 완료</button>
                            </div>
                        )}

                        {step === 4 && <h2>예매가 완료되었습니다 🎉</h2>}
                    </div>
                </div>
            </div>
        </div>
    );
}
