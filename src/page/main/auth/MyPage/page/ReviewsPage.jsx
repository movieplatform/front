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

      {data.length === 0 ? (
        <div className="board empty">작성한 리뷰가 없습니다.</div>
      ) : (
        <div className="board">
          <div className="board-header">
            <div className="col poster-col">포스터</div>
            <div className="col title-col">영화</div>
            <div className="col rating-col">별점</div>
            <div className="col date-col">작성일</div>
            <div className="col preview-col">내용</div>
            <div className="col action-col">액션</div>
          </div>

          {data.map((rv) => (
            <div className="board-row" key={rv.id}>
              <div className="col poster-col">
                <img
                  src={rv.posterUrl}
                  alt={`${rv.movieTitle} 포스터`}
                  className="poster-xs"
                  onError={(e) => {
                    e.currentTarget.src = "/asset/placeholder_poster.jpg";
                  }}
                />
              </div>
              <div className="col title-col ellipsis" title={rv.movieTitle}>
                {rv.movieTitle}
              </div>
              <div className="col rating-col">
                <Star value={rv.rating} />
              </div>

              <div className="col date-col">{rv.createdAt}</div>
              <div className="col preview-col preview">
                {rv.content}
              </div>
              <div className="col action-col">
                <button className="ghost sm">보기</button>
                {/* <button className="ghost sm">수정</button>
                <button className="danger sm">삭제</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
