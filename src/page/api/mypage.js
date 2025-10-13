// src/services/mypage.js
import { apiFetch as client } from "./client";

// [프로필] 내 정보
export const getMyProfile = () =>
  client.get("/users/me").then((r) => r.data);
// 응답 예시:
// { id:1, name:"관리자", role:"ADMIN", createdAt:"2025-09-08T17:30:27", lastLoginAt:"2025-09-09T17:50:59" }

// [포인트] 페이지네이션 지원
export const getMyPoints = ({ page = 0, size = 10 } = {}) =>
  client.get("/points/me", { params: { page, size } }).then((r) => r.data);
// 응답 예시:
// { content:[{id, type, amount, createdAt}], totalElements, totalPages, number }

// [예약 내역]
export const getMyReservations = ({ page = 0, size = 10 } = {}) =>
  client.get("/reservations/me", { params: { page, size } }).then((r) => r.data);

// [리뷰 내역]
export const getMyReviews = ({ page = 0, size = 10 } = {}) =>
  client.get("/reviews/me", { params: { page, size } }).then((r) => r.data);

// [문의 내역]
export const getMyInquiries = ({ page = 0, size = 10 } = {}) =>
  client.get("/inquiries/me", { params: { page, size } }).then((r) => r.data);

// [회원 탈퇴]
export const deleteMe = () =>
  client.delete("/users/me").then((r) => r.data);
