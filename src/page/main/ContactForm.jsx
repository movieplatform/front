import React, { useState } from "react";
import "./contactform.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    inquiryType: "영화", // Enum key
    title: "",
    content: "",
  });

  const inquiryTypes = {
    MOVIE: "영화",
    REVIEW: "리뷰",
    RESERVATION_PAYMENT: "예약/결제",
    POINT: "포인트",
    USER: "사용자",
    THEATER_SCREEN: "극장/상영관",
  };

  const resetForm = () =>
    setFormData({ inquiryType: "MOVIE", title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 프론트에서 전송 준비 데이터:", formData);

    try {
      const res = await fetch("http://localhost:8080/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 세션/토큰 쿠키 함께 전송
        body: JSON.stringify(formData),
      });

      console.log("📡 요청 보낸 JSON:", JSON.stringify(formData));

      if (!res.ok) {
        console.error("❌ 서버 응답 상태:", res.status, res.statusText);
        throw new Error("서버 응답 실패");
      }

      const result = await res.text();
      console.log("✅ 서버 응답 본문:", result);

      alert(result);
      resetForm();
    } catch (err) {
      console.error("❌ 문의 전송 에러:", err);
      alert("문의 전송 중 오류가 발생했습니다.");
    }
  };


  return (
    <div className="contact-form">
      <div className="cf-header">
        <h2>문의하기</h2>
        <p className="cf-sub">빠르게 도와드릴게요. 아래 내용을 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="cf-form">
        <div className="cf-grid">
          {/* 문의 유형 */}
          <div className="cf-group cf-full">
            <label htmlFor="inquiryType">문의 유형</label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
            >
              {Object.entries(inquiryTypes).map(([key, label]) => (
                <option key={key} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* 제목 */}
          <div className="cf-group cf-full">
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="문의 제목을 입력하세요"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* 문의 내용 */}
          <div className="cf-group cf-full">
            <label htmlFor="content">문의 내용</label>
            <textarea
              id="content"
              name="content"
              rows="6"
              placeholder="문의 내용을 입력하세요"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="cf-actions">
          <button type="button" className="btn ghost" onClick={resetForm}>
            초기화
          </button>
          <button type="submit" className="btn primary">
            전송하기
          </button>
        </div>
      </form>
    </div>
  );
}
