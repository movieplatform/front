import "./css/bookingpage.css";
import MoviesPanel from "./panels/MoviesPanel";
import TheatersPanel from "./panels/TheatersPanel"
import TimesPanel from "./panels/TimesPanel"
export default function BookingPage() {
    return (
        <div className="booking-page">
            <div className="booking-container">
                <div className="booking-wrap">
                    <aside className="steps">
                        <div className="step active"><div className="no">01</div><div className="label">상영시간</div></div>
                        <div className="divider" />
                        <div className="step"><div className="no">02</div><div className="label">인원/좌석</div></div>
                        <div className="divider" />
                        <div className="step"><div className="no">03</div><div className="label">결제</div></div>
                        <div className="divider" />
                        <div className="step"><div className="no">04</div><div className="label">완료</div></div>
                    </aside>

                    <div className="booking-main">
                        {/* 상단 헤더 바 */}
                        <div className="booking-header">
                            <span className="booking-text">영화관</span>
                            <span className="booking-text">영화 선택</span>
                            <span className="booking-text">날짜 선택</span>
                        </div>

                        {/* 아래 패널 */}
                        <div className="booking-content">
                            <TheatersPanel />
                            <MoviesPanel />
                            <TimesPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
