// src/components/SuccessModal.jsx
import React from "react";
import "./css/SuccessModal.css";

export default function SuccessModal({ open, name, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3 className="modal-title">회원가입 성공 🎉</h3>
        <p className="modal-message">
          {name ? <strong>{name}</strong> : "회원님"} 환영합니다!
          <br />
          잠시 후 메인으로 이동합니다.
        </p>
        <button className="modal-btn" onClick={onClose}>
          바로 이동
        </button>
      </div>
    </div>
  );
}
