// src/components/LoginAlertModal.jsx
import React from "react";
import "./css/knowloginmodal.css";

export default function KnowLoginModal({ onClose,
    title = "로그인 필요",
    message = "로그인 후 이용할 수 있습니다.",
    confirmText = "로그인하러 가기",
    redirectTo = "/login", }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onClose} className="close-btn">닫기</button>
                    <button
                        onClick={() => (window.location.href = redirectTo)}
                        className="confirm-btn"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
