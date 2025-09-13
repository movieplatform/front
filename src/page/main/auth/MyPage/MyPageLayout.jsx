import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./mypagelayout.css";
import ProfilePage from "./page/ProfilePage";
import PointsPage from "./page/PointsPage";
import ReservationsPage from "./page/ReservationsPage";
import ReviewsPage from "./page/ReviewsPage";
import InquiriesPage from "./page/InquiriesPage";


export default function MyPageLayout() {
  const [activeTab, setActiveTab] = useState("profile");

  // 관리자인지 유저인지 확인해서 랜더링하는 로직만들어야할듯?
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfilePage />;
      case "points":
        return <PointsPage />;
      case "reservations":
        return <ReservationsPage />;
      case "reviews":
        return <ReviewsPage />;
      case "inquiries":
        return <InquiriesPage />;

      // 관리자 탭들
      case "admin-users":
        return <div>회원 관리 페이지</div>;
      case "admin-movies":
        return <div>영화 관리 페이지</div>;
      case "admin-screens":
        return <div>상영관 및 좌석 관리 페이지</div>;
      case "admin-screenings":
        return <div>상영일정 관리 페이지</div>;
      case "admin-payments":
        return <div>결제 내역 페이지</div>;
      case "admin-setting":
        return <div>포인트 적립률 및 리뷰정책 페이지</div>;

      default:
        return <ProfilePage />;
    }
  };


  return (
    <div className="side-layout">
      <aside className="sidebar">
        <ul>
          {/* 일반 사용자 메뉴 */}
          <li>
            <button onClick={() => setActiveTab("profile")}
              className={activeTab === "profile" ? "active" : ""}>
              회원정보
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab("points")}
              className={activeTab === "points" ? "active" : ""}>
              포인트 내역
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab("reservations")}
              className={activeTab === "reservations" ? "active" : ""}>
              예약 내역
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab("reviews")}
              className={activeTab === "reviews" ? "active" : ""}>
              리뷰 내역
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab("inquiries")}
              className={activeTab === "inquiries" ? "active" : ""}>
              문의 내역
            </button>
          </li>

          {/* 관리자 메뉴 */}
          <hr className="divider" />
          <li><button onClick={() => setActiveTab("admin-users")}>회원관리</button></li>
          <li><button onClick={() => setActiveTab("admin-movies")}>영화 관리</button></li>
          <li><button onClick={() => setActiveTab("admin-screens")}>상영관 및 좌석 관리</button></li>
          <li><button onClick={() => setActiveTab("admin-screenings")}>상영일정 관리</button></li>
          <li><button onClick={() => setActiveTab("admin-payments")}>결제 내역</button></li>
          <li><button onClick={() => setActiveTab("admin-setting")}>포인트/리뷰 정책</button></li>
        </ul>
      </aside>
      <section className="page-content">
        {renderTabContent()}
      </section>
    </div>
  );
}
