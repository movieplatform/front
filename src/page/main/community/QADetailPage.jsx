import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./qapage.css";

export default function QADetailPage() {
  const { id } = useParams();
  const [qa, setQa] = useState(null);

  useEffect(() => {
    axios.get(`/api/community/qa/${id}`)
      .then(res => setQa(res.data))
      .catch(() => {
        // 샘플 데이터
        setQa({
          id,
          title: "예매 취소는 어떻게 하나요?",
          answer: "마이페이지 > 예매내역에서 취소 가능합니다.",
          date: "2025-09-10",
        });
      });
  }, [id]);

  if (!qa) return <div>로딩 중...</div>;

  return (
    <div className="qa-detail">
      <h2>Q. {qa.title}</h2>
      <p className="qa-meta">등록일: {qa.date || "-"} </p>
      <div className="qa-answer-box">
        {qa.answer ? (
          <p><strong>A.</strong> {qa.answer}</p>
        ) : (
          <p className="no-answer">아직 답변이 등록되지 않았습니다.</p>
        )}
      </div>

      <Link to="/qa" className="back-btn">← 목록으로</Link>
    </div>
  );
}
