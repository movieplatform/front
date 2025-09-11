import React, { useEffect, useMemo, useState } from "react";
import "./css/reviewspage.css";

export default function ReviewsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // 목업 (API 실패 시)
  const mock = [
    {
      id: 5001,
      movieTitle: "범죄도시4",
      posterUrl: "/asset/crimecity.jpg",
      rating: 4.5,
      createdAt: "2025-09-10 15:12",
      isPublic: true,
      content:
        "액션 시원! 서스펜스 좋고 러닝타임도 딱. 후반부 템포 더 끌어올렸으면 별 5개였음!",
    },
    {
      id: 5002,
      movieTitle: "인사이드 아웃 2",
      posterUrl: "/asset/insideout2.jpg",
      rating: 3.0,
      createdAt: "2025-09-08 20:30",
      isPublic: false,
      content: "1편만큼 신선하진 않지만 감정선 표현은 여전히 탁월. 가족 관람 추천!",
    },
  ];

  useEffect(() => {
    fetch("/api/my-reviews")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setRows)
      .catch(() => setRows(mock))
      .finally(() => setLoading(false));
  }, []);

  const Star = ({ value }) => {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    return (
      <span className="stars" aria-label={`별점 ${value}`}>
        {"★".repeat(full)}
        {half ? "☆" : ""}
        {"✩".repeat(5 - full - (half ? 1 : 0))}
        <span className="score">{value.toFixed(1)}</span>
      </span>
    );
  };

  // 간단 정렬(최신순)
  const data = useMemo(
    () =>
      [...rows].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [rows]
  );

  if (loading) return <div className="reviews-section">로딩 중...</div>;

  return (
    <div className="reviews-section">
      <h2>리뷰 내역</h2>

    
    </div>
  );
}
