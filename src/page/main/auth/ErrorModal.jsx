// src/components/ErrorModal.jsx
import React from "react";
import "./css/errormodal.css";

export default function ErrorModal({ message, onClose }) {
  if (!message) return null; // message 없으면 렌더링 안함

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>로그인 실패</h3>
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}
