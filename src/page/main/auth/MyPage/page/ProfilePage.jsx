import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/profilepage.css"


export default function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch("http://localhost:8080/api/my-page/profile", {
          credentials: "include", // 세션 쿠키 포함
      })
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 오류");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

    const handleWithdraw = async () => {
        if (!window.confirm("정말 탈퇴하시겠습니까?")) return;

        try {
            const res = await fetch("http://localhost:8080/api/my-page/withdraw", {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) throw new Error("탈퇴 실패");

            alert("회원 탈퇴 완료. 로그인 페이지로 이동합니다.");
            navigate("/login"); // 로그인 페이지로 이동
        } catch (err) {
            console.error(err);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

  if (loading) return <div className="profile-section">로딩 중...</div>;
    if(!profile) return null;

  return (
    <div className="profile-section">
      <h2>회원 정보</h2>

      <div className="profile-card">
        <div className="info-row">
          <span className="label">이름:</span>
          <span className="value">{profile.name}</span>
        </div>
        <div className="info-row">
          <span className="label">가입일:</span>
          <span className="value">{profile.createdAt}</span>
        </div>
        <div className="info-row">
          <span className="label">최근 로그인:</span>
          <span className="value">{profile.currentLoginAt}</span>
        </div>
        <div className="info-row">
          <span className="label">권한:</span>
          <span className="value">{profile.role}</span>
        </div>

        <button className="delete-btn" onClick={handleWithdraw}>회원 탈퇴</button>
      </div>
    </div>
  );
}
