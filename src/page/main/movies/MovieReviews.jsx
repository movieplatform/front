import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./css/moviesreview.css";
import axios from "axios";
import KnowLoginModal from "./KnowLoginModal";

export default function MovieReviews({ docId }) {
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, text: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState("rating");  //리뷰 최신순
    const reviewsPerPage = 5;

    const [loginAlert, setLoginAlert] = useState(false); //로그인 완료했는지 안했는지 확인
    const [showLoginModal, setShowLoginModal] = useState(false);
    const mockReviews = [
        { id: 1, author: "유광명", rating: 4, text: "스토리랑 연출 다 좋았어요. 다시 보고 싶네요.", postedAt: "2025-09-17T14:35:00" },
        { id: 2, author: "임동혁", rating: 3, text: "재밌긴 했는데 원작에 비하면 아쉬운 부분도 있었어요.", postedAt: "2025-09-18T10:20:00" },
        { id: 3, author: "홍길동", rating: 5, text: "인생영화 등극!", postedAt: "2025-09-19T09:15:00" },
        { id: 4, author: "성춘향", rating: 2, text: "조금 지루했어요.", postedAt: "2025-09-19T10:10:00" },
        { id: 5, author: "이순신", rating: 4, text: "액션 장면이 정말 좋았습니다.", postedAt: "2025-09-19T11:45:00" },
        { id: 6, author: "강감찬", rating: 5, text: "최고의 명작!", postedAt: "2025-09-19T12:30:00" },
    ];

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    useEffect(() => {
        const endpoint =
            sortType === "latest"
                ? `http://localhost:8080/api/reviews/${docId}/latest`
                : `http://localhost:8080/api/reviews/${docId}/rating`;

        axios
            .get(endpoint)
            .then((res) => {
                console.log("리뷰 API 응답:", res.data);
                setReviews(res.data);
            })
            .catch((err) => {
                console.error("리뷰 불러오기 실패, 목업 데이터 사용:", err);
                setReviews(mockReviews);
            });
    }, [docId, sortType]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReview.text || newReview.rating === 0) {
            alert("별점과 리뷰 내용을 모두 입력해주세요!");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/reviews/${docId}`,
                {
                    rating: newReview.rating,
                    content: newReview.text,
                },
                { withCredentials: true }
            );

            console.log("리뷰 저장 성공:", response.data);

            // 등록 직후 최신 리뷰 다시 불러오기
            setSortType("latest"); // 최신순으로 다시 정렬
            setShowModal(false);
            setNewReview({ rating: 0, text: "" });
            setCurrentPage(1);
        } catch (error) {
            console.error("리뷰 저장 실패:", error);
            if (error.response && error.response.status === 401) {
                // 로그인 안된 경우
                setShowModal(false);
                setShowLoginModal(true);
            } else {
                alert("리뷰 저장 중 오류가 발생했습니다.");
            }
        }
    };



    // 페이지네이션
    const indexOfLast = currentPage * reviewsPerPage;
    const indexOfFirst = indexOfLast - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    return (
        <div className="reviews-container">
            <h3>관람객 리뷰</h3>
            <div className="sort-buttons">
                <button
                    className={sortType === "latest" ? "active" : ""}
                    onClick={() => setSortType("latest")}
                >
                    최신순
                </button>
                <button
                    className={sortType === "rating" ? "active" : ""}
                    onClick={() => setSortType("rating")}
                >
                    평점순
                </button>
            </div>


            {reviews.length > 0 ? (
                <ul>
                    {currentReviews.map((r) => (
                        <li key={r.id}>
                            <div className="review-header">
                                <strong>{r.username}</strong>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} size={18} color={i < r.rating ? "#ffd700" : "#444"} />
                                    ))}
                                </div>
                            </div>
                            <p className="review-text">{r.content}</p>
                            <span className="review-date">{formatDate(r.postedAt)}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>아직 등록된 리뷰가 없습니다.</p>
            )}

            {/*페이지네이션 + 리뷰 작성 버튼 한 줄로 */}
            <div className="reviews-footer">
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button className="open-modal-btn" onClick={() => setShowModal(true)}>
                    리뷰 작성하기
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>리뷰 작성</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="rating-input">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        size={22}
                                        style={{ cursor: "pointer" }}
                                        color={i < newReview.rating ? "#ffd700" : "#444"}
                                        onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                                    />
                                ))}
                            </div>
                            <textarea
                                placeholder="리뷰를 작성해주세요"
                                value={newReview.text}
                                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                            />
                            <div className="modal-actions">
                                <button type="submit">등록</button>
                                <button type="button" className="cancel" onClick={() => setShowModal(false)}>
                                    취소
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showLoginModal && (
                <KnowLoginModal onClose={() => setShowLoginModal(false)} />
            )}
        </div>
    );
}
