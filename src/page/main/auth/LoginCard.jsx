// src/components/LoginCard.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import googlelogo from "../../asset/googlelogo.jpg"
import "./css/logincard.css";

export default function LoginCard() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [saveId, setSaveId] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("로그인 시도:", account, password, saveId);
        // TODO: 백엔드 API 호출
        try {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                { username: account, password: password },
                {
                    withCredentials: true, //쿠키 주고 받는거 true
                }
            );

            console.log("로그인 성공!", response.data);
            alert("로그인 성공!");
            window.location.href = "/";
        } catch (error) {
            console.error("로그인 실패", error.response.data);
            alert("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    const handleGoogleLogin = () => {
        // 백엔드 서버의 OAuth2 시작 URL로 리다이렉션
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <form className="login-card" onSubmit={handleSubmit}>
            <h1 className="login-title">LOGIN</h1>

            <label className="field">
                <span className="logintext">계정</span>
                <div className="input-wrap">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        placeholder="이메일 계정을 입력해주세요"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                </div>
            </label>

            <label className="field">
                <span className="logintext">비밀번호</span>
                <div className="input-wrap">
                    <FaLock className="icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <AiOutlineEyeInvisible
                        className="icon eye"
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                    />
                </div>
            </label>

            <div className="login-options">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={saveId}
                        onChange={() => setSaveId(!saveId)}
                    />
                    <span className="checkmark" />
                    아이디 저장
                </label>
                <a href="/register" className="signup-link">회원가입</a>
            </div>

            <button type="submit" className="btn primary">로그인</button>

            <button type="button" className="btn google" onClick={handleGoogleLogin}>
                <img src={googlelogo} alt="Google Logo" />
                Google 계정으로 로그인
            </button>
        </form>
    );
}
