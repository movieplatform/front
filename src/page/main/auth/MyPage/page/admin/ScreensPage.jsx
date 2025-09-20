import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/screenspage.css";

function TheaterForm({ onAdd }) {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            await axios.post(
                "http://localhost:8080/api/admin/theaters",
                null,
                { params: { theaterName: name }, withCredentials:true }
            );
            onAdd(); // 목록 갱신
            setName("");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                // 서버에서 중복 처리 시 400 Bad Request 반환했다고 가정
                alert(`${name} 은 이미 존재하는 극장 이름입니다.`);
            } else {
                console.error("극장 추가 실패:", err);
            }
        }
    };

    return (
        <form className="theater-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="극장 이름"
            />
            <button type="submit">극장 추가</button>
        </form>
    );
}

function TheaterTable({ theaters, onSelectTheater }) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>극장 이름</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {theaters.map((t) => (
                <tr key={t.id}>
                    <td>{t.theaterName}</td>
                    <td>
                        <button onClick={() => onSelectTheater(t)}>
                            상영관 보기
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function ScreenTable({ screens, onManageSeats }) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>극장 + 상영관 이름</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {screens.map((s) => (
                <tr key={s.id}>
                    <td>{s.theater.theaterName} {s.screenName}</td>
                    <td>
                        <button onClick={() => onManageSeats(s)}>
                            좌석 관리
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}



function SeatManager({ screen }) {
    const [rows, setRows] = useState("");
    const [cols, setCols] = useState("");
    const [seatCount, setSeatCount] = useState(0);

    // 컴포넌트 스코프에서 정의
    const fetchSeatCount = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/admin/seat/${screen.id}`,
                { withCredentials: true }
            );
            setSeatCount(res.data);
        } catch (err) {
            console.error("좌석 수 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchSeatCount(); // 여기서 호출 가능
    }, [screen.id]); // theater.id가 바뀔 때마다 호출

    // 좌석 생성 (백엔드 연동)
    const handleCreateSeats = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8080/api/admin/seat/${screen.id}`,
                null,
                { params: { rows, cols }, withCredentials: true }
            );
            alert(res.data); // "좌석 생성 완료" 같은 메시지
            fetchSeatCount(); // 좌석 개수 갱신
        } catch (err) {
            if (err.response && err.response.status === 400) {
                alert(err.response.data); // 예외 메시지 ("행은 1~8까지", "이미 좌석 있음" 등)
            } else {
                alert("좌석 생성 중 오류 발생");
            }
            console.error("좌석 생성 실패:", err);
        }
    };

    return (
        <div className="seat-manager">
            <h3>{screen.theater.theaterName} - {screen.screenName} 좌석 관리</h3>
            <div className="seat-inputs">
                <label>
                    행(1~8):
                    <input
                        type="number"
                        value={rows}
                        onChange={(e) => setRows(e.target.value)}
                    />
                </label>
                <label>
                    열(1~10):
                    <input
                        type="number"
                        value={cols}
                        onChange={(e) => setCols(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleCreateSeats}>
                    좌석 생성
                </button>
            </div>

            <p>총 좌석 수: {seatCount}</p>

        </div>
    );
}

export default function ScreensPage() {
    const [theaters, setTheaters] = useState([]);
    const [screens, setScreens] = useState([]);
    const [activeScreen, setActiveScreen] = useState(null);

    const fetchTheaters = async () => {
        const res = await axios.get("http://localhost:8080/api/admin/theaters", {withCredentials: true});
        setTheaters(res.data);
    };

    const fetchScreens = async (theaterId) => {
        const res = await axios.get(`http://localhost:8080/api/admin/screens/${theaterId}`, {withCredentials: true});
        setScreens(res.data);
        setActiveScreen(null); // 극장 새로 고르면 좌석 관리 초기화
    };

    useEffect(() => { fetchTheaters(); }, []);

    return (
        <div className="screens-page">
            <h2>극장 관리</h2>
            <TheaterForm onAdd={fetchTheaters} />
            <TheaterTable theaters={theaters} onSelectTheater={(t) => fetchScreens(t.id)} />
            {screens.length > 0 && <ScreenTable screens={screens} onManageSeats={setActiveScreen} />}
            {activeScreen && <SeatManager screen={activeScreen} />}
        </div>
    );
}
