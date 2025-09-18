import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./qapage.css";

export default function QAPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("/api/community/qa")
      .then(res => setQuestions(res.data))
      .catch(() => {
        setQuestions([
          { id: 1, title: "예매 취소는 어떻게 하나요?", answer: "마이페이지 > 예매내역에서 취소 가능합니다.", date: "2025-09-10" },
          { id: 2, title: "포인트는 어디에 사용되나요?", answer: "영화 예매 시 포인트 차감 사용 가능합니다.", date: "2025-09-12" },
        ]);
      });
  }, []);

  return (
    <div className="qa-container">
      <h2>Q & A 게시판</h2>
      <table className="qa-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>답변 여부</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, idx) => (
            <tr key={q.id}>
              <td>{questions.length - idx}</td>
              <td>
                <Link to={`/qa/${q.id}`} className="qa-link">
                  {q.title}
                </Link>
              </td>
              <td>{q.answer ? "답변 완료" : "미답변"}</td>
              <td>{q.date || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
