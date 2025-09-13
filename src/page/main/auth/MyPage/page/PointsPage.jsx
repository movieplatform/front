import React, { useEffect, useState } from "react";
import "./css/pointspage.css";

export default function PointsPage() {
  const [points, setPoints] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  //endpoint만 수정필요
  useEffect(() => {
    fetch("http://localhost:8080/api/my-page/points",{
        credentials: "include"
    })
      .then((res) => {
        console.log("데이터 못가져옴")
        if (!res.ok) throw new Error("오류 발생");
        return res.json();
      })
      .then((data) => {
          setPoints(data.points);
          setTotal(data.total);
      })
      .catch((err) => {
        console.error("포인트 조회 실패:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="points-section">
      <h2>포인트 내역</h2>

      <div className="points-table">
        <div className="table-header">
          <div>날짜</div>
          <div>구분</div>
          <div>사유</div>
          <div>포인트</div>
        </div>

        {loading ? (
          <div className="table-row">로딩 중...</div>
        ) : points.length === 0 ? (
          <div className="table-row">포인트 내역이 없습니다.</div>
        ) : (
          points.map((item, idx) => (
            <div className="table-row" key={idx}>
              <div>{new Date(item.date).toLocaleString()}</div>
              <div>{item.type}</div>
              <div>{item.reason}</div>
              <div>{item.amount}</div>
            </div>
          ))
        )}
      </div>

      <div className="total-points">
        총 포인트: <span className="highlight">{total}</span> 점
      </div>
    </div>
  );
}
