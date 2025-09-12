// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/register.css";
import { FiEdit3, FiUser } from "react-icons/fi";
import SuccessModal from "./SuccessModal";
import axios from "axios";


export default function Register() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        phoneNumber: "",
        birthDate: "",
    });

    // 필드별 에러
    const [fieldErrors, setFieldErrors] = useState({});
    // 공통 에러 (ex. 이메일 중복)
    const [generalError, setGeneralError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); // 입력 시 해당 필드 에러 초기화
        setGeneralError(""); // 공통 에러 초기화
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("회원가입 정보:", form);
    
        // TODO: 백엔드 전송

        try {
            const response = await axios.post("http://localhost:8080/api/register", form);
            console.log("회원가입 성공:", response.data);

            navigate("/login");

        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    // 필드별 검증 실패
                    setFieldErrors(err.response.data);
                } else if (err.response.status === 409) {
                    // 이메일 중복 같은 충돌 에러
                    setGeneralError(err.response.data);
                } else {
                    setGeneralError("알 수 없는 오류가 발생했습니다.");
                }
            } else {
                setGeneralError("서버와 통신할 수 없습니다.");
            }
        }
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

                {/* 공통 에러 */}
                {generalError && <div className="error-text">{generalError}</div>}

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
                    {fieldErrors.email && <div className="error-text">{fieldErrors.email}</div>}
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
                    {fieldErrors.password && <div className="error-text">{fieldErrors.password}</div>}
                </label>

                <div className="row">
                    <label>
                        <span className="logintext">이름</span>
                        <input
                            name="name"
                            type="text"
                            placeholder="이름"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {fieldErrors.name && <div className="error-text">{fieldErrors.name}</div>}
                    </label>

                    <label>
                        <span className="logintext">전화번호</span>
                        <input
                            name="phoneNumber"
                            type="tel"
                            placeholder="전화번호"
                            value={form.phoneNumber}
                            onChange={handleChange}
                        />
                        {fieldErrors.phoneNumber && <div className="error-text">{fieldErrors.phoneNumber}</div>}
                    </label>
                </div>

                <label>
                    <span className="logintext">생년월일</span>
                    <input
                        name="birthDate"
                        type="date"
                        value={form.birthDate}
                        onChange={handleChange}
                    />
                    {fieldErrors.birthDate && <div className="error-text">{fieldErrors.birthDate}</div>}
                </label>

                <button type="submit" className="submit-btn">회원가입 완료</button>
            </form>

            <SuccessModal
                open={showSuccess}
                name={form.name}
                onClose={() => navigate("/login")}
            />
        </div>
    );
}
