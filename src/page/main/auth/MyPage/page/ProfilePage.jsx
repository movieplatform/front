import React, { useState, useEffect } from "react";
import "./css/profilepage.css"


export default function ProfilePage() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/my-profile")
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 오류");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("회원정보를 불러오지 못함")
        setError("회원 정보를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="profile-section">로딩 중...</div>;
  //임시로 디자인확인할수있게 만든거 수정하면댐 나중에 그냥 {error} 바꾸셈
  if (error) return <div className="profile-section">
    <h2>회원 정보</h2>
    <div className="profile-card">
      <div className="info-row">
        <span className="label">이름:</span>
        <span className="value">임시데이터 코드주석확인하셈</span>
      </div>
      <div className="info-row">
        <span className="label">가입일:</span>
        <span className="value">임시데이터</span>
      </div>
      <div className="info-row">
        <span className="label">최근 로그인:</span>
        <span className="value">임시데이터</span>
      </div>
      <div className="info-row">
        <span className="label">권한:</span>
        <span className="value">임시데이터</span>
      </div>

      <button className="delete-btn">회원 탈퇴</button>
    </div>
  </div>;


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
          <span className="value">{profile.lastLoginAt}</span>
        </div>
        <div className="info-row">
          <span className="label">권한:</span>
          <span className="value">{profile.role}</span>
        </div>

        <button className="delete-btn">회원 탈퇴</button>
      </div>
    </div>
  );
}
