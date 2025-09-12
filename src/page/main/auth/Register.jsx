// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/register.css";
import { FiEdit3, FiUser } from "react-icons/fi";
import SuccessModal from "./SuccessModal";

export default function Register() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        birth: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("회원가입 정보:", form);

        // TODO: 백엔드 전송
        setShowSuccess(true);
        setTimeout(() => navigate("/"), 1500);
    };

    return (
        <div className="auth-wrapper">
            <form className="register-card" onSubmit={handleSubmit}>
                {/* 상단 탭 아이콘 */}
                <div className="icon-tabs">
                    <FiEdit3 size={24} color="#888" />
                    <div className="tab-line" />
                    <FiUser size={24} color="#888" />
                </div>

                {/* 입력 필드 */}
                <label>
                    <span className="logintext">이메일</span>
                    <input
                        name="email"
                        type="email"
                        placeholder="이메일"
                        value={form.email}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    <span className="logintext">비밀번호</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={handleChange}
                    />
                </label>

                <div className="name-row">
                    <label>
                        <span className="logintext">이름</span>
                        <input
                            name="name"
                            type="text"
                            placeholder="이름"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        <span className="logintext">전화번호</span>
                        <input
                            name="phone"
                            type="tel"
                            placeholder="전화번호"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <label>
                    <span className="logintext">생년월일</span>
                    <input
                        name="birth"
                        type="date"
                        value={form.birth}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit" className="submit-btn">회원가입 완료</button>
            </form>

            <SuccessModal
                open={showSuccess}
                name={form.name}
                onClose={() => navigate("/main")}
            />
        </div>
    );
}
