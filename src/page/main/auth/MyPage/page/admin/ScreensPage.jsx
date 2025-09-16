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
                "http://localhost:8080/api/admin/screens",
                null,
                { params: { screenName: name }, withCredentials:true }
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

function TheaterTable({ theaters, onManageSeats }) {
    if (theaters.length === 0) {
        return <p>등록된 극장이 없습니다.</p>;
    }

    return (
        <table className="theater-table">
            <thead>
            <tr>
                <th>극장 이름</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {theaters.map((t) => (
                <tr key={t.id}>
                    <td>{t.screenName}</td>
                    <td>
                        <button
                            className="seat-manage-btn"
                            onClick={() => onManageSeats(t)}
                        >
                            좌석 관리/추가
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function SeatManager({ theater }) {
    const [rows, setRows] = useState("");
    const [cols, setCols] = useState("");
    const [seatCount, setSeatCount] = useState(0);

    // 컴포넌트 스코프에서 정의
    const fetchSeatCount = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/admin/seat/${theater.id}`,
                { withCredentials: true }
            );
            setSeatCount(res.data);
        } catch (err) {
            console.error("좌석 수 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchSeatCount(); // 여기서 호출 가능
    }, [theater.id]); // theater.id가 바뀔 때마다 호출

    // 좌석 생성 (백엔드 연동)
    const handleCreateSeats = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8080/api/admin/seat/${theater.id}`,
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
            <h3>{theater.screenName} 좌석 관리</h3>
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
    const [activeTheater, setActiveTheater] = useState(null);

    // 백엔드에서 극장 목록 가져오기
    const fetchTheaters = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/admin/screens", {withCredentials: true});
            setTheaters(res.data);
        } catch (err) {
            console.error("극장 목록 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchTheaters();
    }, []);

    // 극장 추가 후 목록 갱신
    const handleAddTheater = async () => {
        await fetchTheaters();
    };

    return (
        <div className="screens-page">
            <h2>극장 관리</h2>
            <TheaterForm onAdd={handleAddTheater} />
            <TheaterTable theaters={theaters} onManageSeats={setActiveTheater} />

            {activeTheater && <SeatManager theater={activeTheater} />}
        </div>
    );
}
