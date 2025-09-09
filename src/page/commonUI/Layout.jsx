import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../commonUI/Header"; // 이미 만든 헤더

export default function Layout() {
    return (
        <>
            <Header />
            {/* 공통 배경 & 페이지 영역 */}
            <main className="page-shell">
                <Outlet />
            </main>
        </>
    );
}
