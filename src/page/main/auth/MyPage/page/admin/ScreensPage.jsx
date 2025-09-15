import React, { useState } from "react";
import "./css/screenspage.css";

function TheaterForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName("");
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
  return (
    <table className="theater-table">
      <thead>
        <tr>
          <th>극장 이름</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {theaters.map((t, idx) => (
          <tr key={idx}>
            <td>{t.name}</td>
            <td>
              <button className="seat-manage-btn" onClick={() => onManageSeats(t)}>
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
      <h3>{theater.name} 좌석 관리</h3>
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
        <button onClick={handleGenerate}>좌석 생성</button>
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
  const [theaters, setTheaters] = useState([
    { id: 1, screen_name: "극장1", seat_rows: 8, seat_cols: 10 },
    { id: 2, screen_name: "극장2", seat_rows: 6, seat_cols: 12 }
  ]);
  const [activeTheater, setActiveTheater] = useState(null);

  const handleAddTheater = (name) => {
    setTheaters([...theaters, { name }]);
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
