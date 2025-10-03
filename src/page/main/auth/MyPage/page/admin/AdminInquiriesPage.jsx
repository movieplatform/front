import React, { useEffect, useState } from "react";
import "./css/AdminInquiriesPage.css";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [answers, setAnswers] = useState({});
  const [openId, setOpenId] = useState(null); // ✅ 어떤 문의가 열려있는지

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/inquiries", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setInquiries(data))
      .catch((err) => console.error("❌ 문의 목록 불러오기 실패:", err));
  }, []);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id) => {
    const content = answers[id];
    if (!content) {
      alert("답변을 입력해주세요!");
      return;
    }

    fetch(
      `http://localhost:8080/api/admin/inquiries?inquiryId=${id}&content=${encodeURIComponent(content)}`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      })
      .catch((err) => console.error("❌ 답변 제출 실패:", err));
  };

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="admin-inquiries">
      <h2>사용자 문의 관리</h2>
      {inquiries.length === 0 ? (
        <p className="empty">답변 대기 중인 문의가 없습니다.</p>
      ) : (
        <div className="inquiry-list">
          {inquiries.map((inq) => (
            <div key={inq.id} className="inquiry-item">
              <div className="inquiry-header" onClick={() => toggleOpen(inq.id)}>
                <span className="title">{inq.title}</span>
                <span className="meta">
                  {inq.userName} | {new Date(inq.createdAt).toLocaleString()} | {inq.inquiryType}
                </span>
              </div>

              {openId === inq.id && (
                <div className="inquiry-body">
                  <p className="content">{inq.content}</p>
                  <div className="answer-box">
                    <textarea
                      rows="3"
                      value={answers[inq.id] || ""}
                      onChange={(e) => handleChange(inq.id, e.target.value)}
                      placeholder="답변 입력"
                    />
                    <button className="submit-btn" onClick={() => handleSubmit(inq.id)}>
                      등록
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
