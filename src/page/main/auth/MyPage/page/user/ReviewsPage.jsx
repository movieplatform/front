import React, { useEffect, useMemo, useState } from "react";
import "./css/reviewspage.css";
import crimecicty from "../../../../../asset/crimecity.jpg";


export default function ReviewsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const mock = [
    {
      id: 5001,
      movieDocId: "K37869",
      movieTitle: "범죄도시4",
      posterUrl: crimecicty,
      rating: 4,
      postedAt: "2025-09-10T15:12:00",
      content: "액션 시원! 서스펜스 좋고 러닝타임도 딱.",
    },
  ];

    useEffect(() => {
        fetch("http://localhost:8080/api/my-page/reviews", {
            credentials: "include"
        })
            .then((res) => {
                if (!res.ok) throw new Error("API 실패");
                return res.json();
            })
            .then((data) => {
                // DTO 필드 변환
                const mapped = data.map((r, idx) => ({
                    id: r.id, // DTO에 id가 없으므로 임의 생성
                    posterUrl: r.moviePosterUrl,
                    movieTitle: r.movieTitle,
                    rating: r.rating,
                    content: r.reviewComment,
                    postedAt: r.postedAt,
                }));
                setRows(mapped);
            })
            .catch((err) => {
                console.error("리뷰 API 실패, mock 사용:", err);
                setRows(mock);
            })
            .finally(() => setLoading(false));
    }, []);


    const Star = ({ value }) => {
    return (
      <span className="stars">
        {"★".repeat(value)}
        {"☆".repeat(5 - value)}
        <span className="score">{value}</span>
      </span>
    );
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 최신순 정렬
  const data = useMemo(
    () =>
      [...rows].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)),
    [rows]
  );

  if (loading) return <div className="reviews-section">로딩 중...</div>;

  return (
    <div className="reviews-section">
      <h2>내가 남긴 리뷰</h2>
  
      {data.length === 0 ? (
        <div className="no-reviews">남긴 리뷰가 없습니다.</div>
      ) : (
        <div className="review-timeline">
          {data.map((review) => (
            <div key={review.id} className="timeline-item">
              <div className="poster-wrap">
                <img
                  src={review.posterUrl}
                  alt={review.movieTitle}
                  className="poster"
                />
              </div>
  
              <div className="timeline-content">
                <h3 className="movie-title">{review.movieTitle}</h3>
                <Star value={review.rating} />
                <p className="review-text">{review.content}</p>
  
                <div className="timeline-footer">
                  <span className="date">{formatDate(review.postedAt)}</span>
                  {/* <div className="actions">
                    <button className="edit-btn">수정</button>
                    <button className="delete-btn">삭제</button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}