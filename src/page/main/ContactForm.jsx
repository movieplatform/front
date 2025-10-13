import React, { useState } from "react";
import "./contactform.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    inquiryType: "MOVIE", // Enum key
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

  const payload = {
    title: formData.title,
    content: formData.content,
    inquiryType: inquiryTypes[formData.inquiryType], // "영화" 같은 한글 라벨로 변환
  };


  const resetForm = () =>
    setFormData({ inquiryType: "MOVIE", title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(" 전송 데이터:", payload);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // 2. 응답 체크
      if (!res.ok) {
        const errMsg = await res.text();
        console.error("❌ 서버 에러:", res.status, res.statusText, errMsg);
        alert(`서버 오류 (${res.status}): ${errMsg}`);
        return;
      }

      // 3. 정상 처리
      const result = await res.text();
      console.log("✅ 서버 응답:", result);
      alert(result);

      resetForm();
    } catch (err) {
      console.error("❌ 네트워크/클라이언트 에러:", err);
      alert("문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
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
                <option key={key} value={key}>
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
