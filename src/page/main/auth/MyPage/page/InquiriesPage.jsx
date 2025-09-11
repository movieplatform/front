import React, { useEffect, useState } from "react";
import "./css/inquiriespage.css";

export default function InquiriesPage() {
  const [items, setItems] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const mockInquiries = [
    {
      id: 101,
      title: "예매 취소는 어디서 하나요?",
      category: "예매/결제",
      createdAt: "2025-09-09 12:10",
      status: "ANSWERED", // or PENDING
      question: "어제 예매한 표를 취소하고 싶은데 경로가 안 보여요.",
      answer:
        "마이페이지 > 예매 내역에서 예매건을 선택 후 ‘예매 취소’ 버튼을 눌러주세요. 상영 20분 전까지 가능합니다.",
      answeredAt: "2025-09-09 14:01",
    },
    {
      id: 102,
      title: "포인트 적립이 되지 않았습니다",
      category: "포인트",
      createdAt: "2025-09-08 09:35",
      status: "PENDING",
      question:
        "9/7일 예매 2건에 대해 포인트가 들어오지 않았습니다. 확인 부탁드립니다.",
      answer: null,
      answeredAt: null,
    },
  ];

  useEffect(() => {
    fetch("/api/my-inquiries")
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 오류");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((e) => {
        console.warn("API 실패, 목업 데이터 사용:", e?.message);
        setItems(mockInquiries);
        setErr("");
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleOpen = (id) => setOpenId((cur) => (cur === id ? null : id));

  if (loading) return <div className="inquiries-section">로딩 중...</div>;
  if (err) return <div className="inquiries-section error">{err}</div>;

  return (
    <div className="inquiries-section">
      <h2>문의 내역</h2>

      {items.length === 0 ? (
        <div className="empty">등록된 문의가 없습니다.</div>
      ) : (
        <div className="inquiry-list">
          {items.map((it) => {
            const isOpen = openId === it.id;
            const isAnswered = it.status === "ANSWERED";
            return (
              <div className="inquiry-card" key={it.id}>
                <div className="inquiry-head" onClick={() => toggleOpen(it.id)}>
                  <div className="left">
                  <span className={`status-badge ${isAnswered ? "answered" : "pending"}`}>
      {isAnswered ? "답변완료" : "대기"}
    </span>
                    <span className="title">{it.title}</span>
                  </div>
                  <div className="right">
                    <span className="meta">{it.category}</span>
                    <span className="dot">·</span>
                    <span className="meta">{it.createdAt}</span>
                    <button
                      className="toggle"
                      aria-label="열기/닫기"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOpen(it.id);
                      }}
                    >
                      {isOpen ? "닫기" : "보기"}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="inquiry-body">
                    <div className="qa">
                      <div className="q-label">문의 내용</div>
                      <div className="q-text">{it.question}</div>
                    </div>

                    <div className="divider" />

                    <div className="qa answer-block">
                      <div className="a-label">
                        답변{" "}
                        {isAnswered && it.answeredAt && (
                          <span className="answered-at">({it.answeredAt})</span>
                        )}
                      </div>

                      <div className={`a-text ${isAnswered ? "" : "muted"}`}>
                        {isAnswered ? it.answer : "아직 담당자가 확인 중입니다."}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
