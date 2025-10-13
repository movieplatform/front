import React from "react";
import "./css/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3 className="footer-logo">Movie Platform</h3>
                    <p className="footer-desc">영화 예매 & 리뷰 플랫폼</p>
                </div>

                <nav className="footer-links">
                    <a href="/about">회사소개</a>
                    <a href="/terms">이용약관</a>
                    <a href="/privacy">개인정보 처리방침</a>
                    <a href="/faq">FAQ</a>
                </nav>

                <div className="footer-info">
                    <p>고객센터: 미정</p>
                    <p>운영시간: 09:00 ~ 18:00</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 Movie Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}
