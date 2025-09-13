import React, { useState, useEffect } from "react";
import "./css/Header.css";
import logo from "../asset/logo.png";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/session", { withCredentials: true })
            .then((res) => setLoggedIn(res.data)) // res.data가 true면 로그인, false면 미로그인
            .catch(() => setLoggedIn(false));
    }, []);

    //로그아웃하는 컨트롤러만 연결 ㄱㄱ
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true });
            setLoggedIn(false);
            window.location.href = "/"; // 홈으로 이동
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    };

    return (
        <div className="hdr">
            <div className="hdr-top">
                <div className="container">
                    <nav className="top-auth">
                        {loggedIn ? (
                            <>
                                <button onClick={handleLogout} className="logout-btn">
                                    로그아웃
                                </button>
                                <a href="/mypage" className="admin-btn">
                                    관리자 페이지
                                </a>
                            </>
                        ) : (
                            <>
                                <a href="/login">로그인</a>
                                <span className="divider">│</span>
                                <a href="/register">회원가입</a>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            <div className="hdr-main">
                <div className="container">
                    {/* 좌측 */}
                    <div className="left">
                        <button className="icon-btn" aria-label="검색">
                            <FiSearch size={20} />
                        </button>
                        <a className="navlink active" href="/movies">영화</a>
                        <a className="navlink" href="/booking">영화 예매</a>
                    </div>

                    {/* 가운데 로고 */}
                    {/* 로고 */}
                    <a className="logo" href="/">
                        <img src={logo} alt="Movie Score Logo" />
                    </a>

                    {/* 우측 */}
                    <div className="right">
                        <a className="navlink" href="#">버튼 4</a>
                        <a className="navlink" href="#">QA</a>
                        <a className="mypage" href="/mypage">마이페이지</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
