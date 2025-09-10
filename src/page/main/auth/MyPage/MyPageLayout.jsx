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
      default:
        return <ProfilePage />;
    }
  };


  return (
    <div className="side-layout">
      <aside className="sidebar">
        <ul>
          <li><button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>회원정보</button></li>
          <li><button onClick={() => setActiveTab('points')} className={activeTab === 'points' ? 'active' : ''}>포인트 내역</button></li>
          <li><button onClick={() => setActiveTab('reservations')} className={activeTab === 'reservations' ? 'active' : ''}>예약 내역</button></li>
          <li><button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>리뷰 내역</button></li>
          <li><button onClick={() => setActiveTab('inquiries')} className={activeTab === 'inquiries' ? 'active' : ''}>문의 내역</button></li>
        </ul>
      </aside>
      <section className="page-content">
        {renderTabContent()}
      </section>
    </div>
  );
}
