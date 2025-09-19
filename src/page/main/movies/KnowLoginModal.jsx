// src/components/LoginAlertModal.jsx
import React from "react";
import "./css/knowloginmodal.css";

export default function KnowLoginModal({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>로그인 필요</h3>
                <p>리뷰 작성은 로그인 후에 이용할 수 있습니다.</p>
                <div className="modal-actions">
                    <button onClick={onClose}>닫기</button>
                    <button
                        onClick={() => (window.location.href = "/login")}
                        className="confirm-btn"
                    >
                        로그인하러 가기
                    </button>
                </div>
            </div>
        </div>
    );
}
