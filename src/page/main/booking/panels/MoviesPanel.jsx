import { useState, useEffect } from "react";
import axios from "axios";
import "../css/moviespanel.css";
import { FiList, FiGrid } from "react-icons/fi";

export default function MoviesPanel({ onSelect , selectedMovie}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");

  const mockMovies = [
    { doc_id: "1", title: "부재", rating: "12", poster_url: "https://via.placeholder.com/150x220?text=부재" },
    { doc_id: "2", title: "아임 스틸 히어", rating: "15", poster_url: "https://via.placeholder.com/150x220?text=아임+스틸+히어" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/reservation/movies")
      .then((res) => {
        console.log("API 응답:", res.data);
        if (Array.isArray(res.data)) {
          setMovies(res.data);
        } else {
          console.warn("영화 데이터가 배열이 아님", res.data);
          setMovies(mockMovies);
        }
      })
      .catch(() => {
        console.warn("API 실패 → 목업 사용");
        setMovies(mockMovies);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  const handleSelect = (movie) => {
    if (selectedMovie?.docId === movie.docId) {
      // 이미 선택된 영화 다시 클릭 → 해제
      onSelect(null);
    } else {
      // 새로운 영화 선택
      onSelect(movie);
    }
  };

  return (
    <div className="movies-panel">
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
          {movies.map((movie, index) => {
             const isActive = selectedMovie?.docId === movie.docId; 
            return (
              <li
              key={movie.docId}
              className={`movie-row ${selectedMovie?.docId === movie.docId ? "active" : ""}`}
              onClick={() => handleSelect(movie)}
            >
                <span className={`badge rating-${movie.rating.replace(/[^0-9]/g, "") || "all"}`}>
                  {movie.rating.replace(/[^0-9]/g, "") || "All"}
                </span>
                <span className="movie-title">{movie.title}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="movie-grid-wrapper">
          <div className="movie-grid">
            {movies.map((movie, index) => {
              const isActive = selectedMovie?.docId === movie.docId;
              return (
                <div
                  key={movie.docId ?? index}
                  className={`movie-card grid ${isActive ? "active" : ""}`}
                  onClick={() => handleSelect(movie)}
                >
                  {movie.posterUrl ? (
                    <div className="poster-container">
                      {movie.posterUrl ? (
                        <img src={movie.posterUrl} alt={movie.title} className="poster" />
                      ) : (
                        <div className="poster placeholder"></div>
                      )}
                    </div>
                  ) : (
                    <div className="poster placeholder"></div>
                  )}
                  <div className="card-info">
                    <div className="top-line">
                      <span className={`badge rating-${movie.rating.replace(/[^0-9]/g, "") || "ALL"}`}>
                        {movie.rating}
                      </span>
                      <h4 className="card-title">{movie.title}</h4>
                    </div>
                    <div className="bottom-line">
                      <span className="runtime">⏱ {movie.runtime ?? "??"}분</span>
                      <span className="release">개봉일 {movie.repRlsDate ?? "-"}</span>
                    </div>
                  </div>
                </div>

              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
