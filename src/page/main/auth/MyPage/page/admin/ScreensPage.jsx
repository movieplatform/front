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
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const [seats, setSeats] = useState([]);

    const handleGenerate = () => {
        const newSeats = [];
        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                newSeats.push({ row: r, col: c, available: true });
            }
        }
        setSeats(newSeats);
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
                        onChange={(e) => setRows(Number(e.target.value))}
                    />
                </label>
                <label>
                    열(1~10):
                    <input
                        type="number"
                        value={cols}
                        onChange={(e) => setCols(Number(e.target.value))}
                    />
                </label>
                <button type="button" onClick={handleGenerate}>
                    좌석 생성
                </button>
            </div>

            <p>총 좌석 수: {seats.length}</p>

            <div
                className="seat-grid"
                style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
            >
                {seats.map((s, i) => (
                    <div key={i} className="seat">
                        {s.row}-{s.col}
                    </div>
                ))}
            </div>
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
        fetchTheaters();
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
