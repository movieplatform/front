// src/components/ContactForm.jsx
import React, { useState } from "react";
import "./contactform.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("문의 전송 데이터:", formData);

    // 👉 여기서 API 연결 (백엔드에 문의 저장 or 이메일 전송)
    // fetch("http://localhost:8080/api/contact", { ... })
    
    alert("문의가 정상적으로 전송되었습니다!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-form">
      <h2>문의하기</h2>
      <form onSubmit={handleSubmit}>
        <label>이름</label>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>이메일</label>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>문의 내용</label>
        <textarea
          name="message"
          placeholder="문의 내용을 입력하세요"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">전송하기</button>
      </form>
    </div>
  );
}
