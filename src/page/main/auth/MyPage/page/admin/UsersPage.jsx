import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/userspage.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 샘플(mock) 데이터
  const mockUsers = [
    {
      id: 1,
      email: "asbek1396@naver.com",
      name: "관리자",
      status: "ACTIVE",
      role: "관리자",
      joinedAt: "2025-09-08 17:30",
      lastLogin: "2025-09-08 17:30",
    },
    {
      id: 2,
      email: "ykm5923@naver.com",
      name: "관리자",
      status: "ACTIVE",
      role: "관리자",
      joinedAt: "2025-09-08 17:30",
      lastLogin: "2025-09-14 13:54",
    },
    {
      id: 3,
      email: "yks5922@gmail.com",
      name: "유광명",
      status: "ACTIVE",
      role: "일반 회원",
      joinedAt: "2025-09-08 17:24",
      lastLogin: "2025-09-14 13:54",
    },
  ];



  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/users", { withCredentials: true })
      .then((res) => {
        setUsers(res.data); // API 결과
      })
      .catch((err) => {
        console.error("회원 목록 불러오기 실패:", err);
        setUsers(mockUsers); // 실패 시 샘플 데이터
      })
      .finally(() => setLoading(false));
  }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("정말로 탈퇴 처리하시겠습니까?")) return;

        try {
            await axios.post(`http://localhost:8080/api/admin/users/${id}/status`, {}, { withCredentials: true });
            setUsers((prev) => prev.filter((u) => u.id !== id));
            alert("탈퇴 처리 완료");
        } catch (error) {
            console.error("탈퇴 처리 실패:", error);
            const errorMessage =
                error.response?.data;
            alert("탈퇴 처리 실패: " + errorMessage);
        }
    };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="users-page">
      <h2>회원 관리</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>이메일</th>
            <th>이름</th>
            <th>상태</th>
            <th>권한</th>
            <th>가입일</th>
            <th>최근 로그인</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.id}>
              <td>{idx + 1}</td>
              <td>{u.email}</td>
              <td>{u.name}</td>
              <td>{u.status}</td>
              <td>{u.role}</td>
                <td>{u.createdAt?.replace("T", " ").slice(0, 16)}</td>
                <td>{u.currentLoginAt?.replace("T", " ").slice(0, 16) || "-"}</td>
              <td>
                <button
                  className="admindelete-btn"
                  onClick={() => handleDelete(u.id)}
                >
                  탈퇴처리
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#aaa" }}>
                회원 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
