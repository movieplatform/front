import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/moviesdetail.css";

export default function MovieDetail() {
    const { docId } = useParams();
    const [movie, setMovie] = useState(null);

    // ✅ API 구조에 맞게 필드명 통일 (posters)
    const mockMovie = {
        docId,
        title: "귀멸의 칼날 무한성",
        titleEng: "Demon Slayer: Infinity Castle",
        genre: "애니메이션, 액션",
        runtime: 148,
        rating: "15세 관람가",
        repRlsDate: "2025-08-22",
        posters: "https://i.namu.wiki/i/gwqbq98J0nv5hKDlCnnlu7KJ_zFDzvN9Cj8y5ss64uohGgY_3A5HzFKnxlCNWbxRfIepjW1aAr5q7Zf-QA5lYg.webp",
        plot: "귀칼 꿀잼 귀칼 꿀잼 귀칼 꿀잼 귀칼 꿀잼"
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/movies/${docId}`)
            .then((res) => {
                const data =res.data;
                console.log("응답:", res);
                if (typeof res.data === "object" && Object.keys(res.data).length > 0) {
                    setMovie({
                        ...data,
                        posters: data.posterUrl, // 변환
                      });
                } else {
                    console.warn("응답이 문자열 → 목업 사용");
                    setMovie(mockMovie);
                }
            })
            .catch((err) => {
                console.error("영화 상세 불러오기 실패:", err);
                setMovie(mockMovie);
            });
    }, [docId]);


    if (!movie) return <div className="loading">로딩중...</div>;

    return (
        <div className="movie-detail">
            <div className="detail-header">
                {/* ✅ API, 목업 모두 posters 필드로 통일 */}
                <img src={movie.posters} alt={movie.title} className="poster" />
                <div className="info">
                    <h2>{movie.title}</h2>
                    <p className="eng-title">{movie.titleEng}</p>
                    <p><strong>장르:</strong> {movie.genre}</p>
                    <p><strong>상영시간:</strong> {movie.runtime}분</p>
                    <p><strong>관람등급:</strong> {movie.rating}</p>
                    <p><strong>개봉일:</strong> {movie.repRlsDate}</p>
                    <button className="reserve-btn">예매하기</button>
                </div>
            </div>
            <div className="synopsis">
                <h3>줄거리</h3>
                <p>{movie.plot || "줄거리 정보가 없습니다."}</p>
            </div>
        </div>
    );
}
