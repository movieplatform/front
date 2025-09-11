import React from "react";
import "./css/Header.css";
import logo from "../asset/logo.png";
import { FiSearch } from "react-icons/fi";

export default function Header() {
    return (
        <div className="hdr">
            <div className="hdr-top">
                <div className="container">
                    <nav className="top-auth">
                        <a href="/login">로그인</a>
                        <span className="divider">│</span>
                        <a href="/register">회원가입</a>
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
                        <a className="navlink" href="#">버튼 5</a>
                        <a className="mypage" href="/mypage">마이페이지</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
