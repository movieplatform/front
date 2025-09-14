import React, { useState } from "react";
import "./adminpagelayout.css";

// 관리자 전용 페이지들
import UsersPage from "./page/admin/UsersPage";
import MoviesPage from "./page/admin/MoviesPage";
import ScreensPage from "./page/admin/ScreensPage";
import ScreeningsPage from "./page/admin/ScreeningsPage";
import PaymentsPage from "./page/admin/PaymentsPage";
import SettingsPage from "./page/admin/SettingsPage";

export default function AdminPageLayout() {
    const [activeTab, setActiveTab] = useState("users");

    const renderTabContent = () => {
        switch (activeTab) {
            case "users":
                return <UsersPage />;
            case "movies":
                return <MoviesPage />;
            case "screens":
                return <ScreensPage />;
            case "screenings":
                return <ScreeningsPage />;
            case "payments":
                return <PaymentsPage />;
            case "settings":
                return <SettingsPage />;
            default:
                return <UsersPage />;
        }
    };

    return (
        <div className="admin-container">
            <div className="side-layout">
                <aside className="sidebar">
                    <ul>
                        <li>
                            <button
                                onClick={() => setActiveTab("users")}
                                className={activeTab === "users" ? "active" : ""}
                            >
                                회원 관리
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("movies")}
                                className={activeTab === "movies" ? "active" : ""}
                            >
                                영화 관리
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("screens")}
                                className={activeTab === "screens" ? "active" : ""}
                            >
                                상영관 및 좌석 관리
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("screenings")}
                                className={activeTab === "screenings" ? "active" : ""}
                            >
                                상영일정 관리
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("payments")}
                                className={activeTab === "payments" ? "active" : ""}
                            >
                                결제 내역
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={activeTab === "settings" ? "active" : ""}
                            >
                                포인트/리뷰 정책
                            </button>
                        </li>
                    </ul>
                </aside>
                <section className="page-content">{renderTabContent()}</section>
            </div>
        </div>
    );
}
