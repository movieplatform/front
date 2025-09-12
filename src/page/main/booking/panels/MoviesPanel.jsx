import { useState, useEffect } from "react";
import axios from "axios";
import "../css/moviespanel.css";
import { FiList, FiGrid } from "react-icons/fi";

export default function MoviesPanel() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState("list");

    const mockMovies = [
        { doc_id: "1", title: "부재", rating: "12", poster_url: "https://via.placeholder.com/150x220?text=부재" },
        { doc_id: "2", title: "아임 스틸 히어", rating: "15", poster_url: "https://via.placeholder.com/150x220?text=아임+스틸+히어" },
        { doc_id: "3", title: "어쩔수가없다", rating: "15", poster_url: "https://via.placeholder.com/150x220?text=어쩔수가없다" },
        { doc_id: "4", title: "극장판 귀멸의 칼날", rating: "15", poster_url: "https://via.placeholder.com/150x220?text=귀멸의+칼날" },
        { doc_id: "5", title: "악마가 이사왔다", rating: "12", poster_url: "https://via.placeholder.com/150x220?text=악마가+이사왔다" },
        { doc_id: "6", title: "얼굴", rating: "15", poster_url: "https://via.placeholder.com/150x220?text=얼굴" },
    ];

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/movies")
            .then((res) => setMovies(res.data))
            .catch(() => {
                console.warn("API 실패 → 목업 사용");
                setMovies(mockMovies);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>불러오는 중...</p>;


    return (
        <div className="panel movies-panel">
            <div className="movies-header">
                <h3>영화 선택</h3>
                <div className="view-toggle">
                    <button onClick={() => setViewMode("list")}>
                        <FiList size={20} />
                    </button>
                    <button onClick={() => setViewMode("grid")}>
                        <FiGrid size={20} />
                    </button>
                </div>
            </div>

            {/* 리스트/그리드 모드 전환 */}
            {viewMode === "list" ? (
                <ul className="movie-list">
                    {movies.map((movie) => (
                        <li
                            key={movie.doc_id}
                            className={`movie-row ${selectedId === movie.doc_id ? "active" : ""}`}
                            onClick={() => setSelectedId(movie.doc_id)}
                        >
                            <span className={`badge rating-${movie.rating}`}>
                                {movie.rating}
                            </span>
                            <span className="movie-title">{movie.title}</span>
                            {selectedId === movie.doc_id && (
                                <span className="checkmark">✔</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="movie-grid-wrapper">
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <div
                                key={movie.doc_id}
                                className={`movie-card horizontal ${selectedId === movie.doc_id ? "active" : ""}`}
                                onClick={() => setSelectedId(movie.doc_id)}
                            >
                                {/* 왼쪽 포스터 */}
                                {movie.poster_url ? (
                                    <img src={movie.poster_url} alt={movie.title} className="poster-thumb" />
                                ) : (
                                    <div className="poster-thumb placeholder"></div>
                                )}

                                {/* 오른쪽 정보 */}
                                <div className="card-info">
                                    <div className="top-line">
                                        <span className={`badge rating-${movie.rating}`}>{movie.rating}</span>
                                        <h4 className="card-title">{movie.title}</h4>
                                        {selectedId === movie.doc_id && <span className="checkmark">✔</span>}
                                    </div>
                                    <div className="bottom-line">
                                        <span className="runtime">⏱ {movie.runtime ?? "??"}분</span>
                                        <span className="release">개봉일 {movie.rep_rls_date ?? "-"}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            )}

        </div>
    );
}
