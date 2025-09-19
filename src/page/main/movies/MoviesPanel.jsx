import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/moviespanel.css";
import axios from "axios";

export default function MoviesPanel() {
  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("ALL");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // 모의 데이터
  const mock = useMemo(() => [
    { docId: "1", title: "귀멸의 칼날", rating: "15", posterUrl: "https://i.namu.wiki/i/gwqbq98J0nv5hKDlCnnlu7KJ_zFDzvN9Cj8y5ss64uohGgY_3A5HzFKnxlCNWbxRfIepjW1aAr5q7Zf-QA5lYg.webp", repRlsDate: "2025-08-22", genres: ["드라마"] },
    { docId: "2", title: "아임 스틸 히어", rating: "15", posterUrl: "...", repRlsDate: "2025-07-03", genres: ["다큐"] },
    { docId: "3", title: "어쩔 수가 없다", rating: "15", posterUrl: "...", repRlsDate: "2025-05-10", genres: ["코메디"] },
  ], []);

  const genres = ["ALL", "드라마", "멜로/로맨스", "코메디", "액션", "스릴러", "공포", "SF"];

  //실패하면 목업데이터 들어감
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies", {
        params: {
          genre: activeGenre,
          page: page,
          size: 10, // 한 페이지에 10개씩
        },
      })
      .then((res) => {
        setMovies(res.data.content); // Page<Movie> → content
        setTotalPages(res.data.totalPages); // 전체 페이지 수
      })
      .catch((err) => {
        console.error("영화 목록 불러오기 실패:", err);
        setMovies(mock);
        setTotalPages(1);
      });
  }, [activeGenre, page, mock]);


  // 장르 버튼 클릭 시
  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
    setPage(0); // 장르 바꾸면 첫 페이지로
  };

  return (
    <div className="panel movies-panel">
      <MoviesContainer
        genres={genres}
        activeGenre={activeGenre}
        setActiveGenre={handleGenreClick}
        movies={movies}
      />

      {/* 페이지네이션 */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}


function MoviesContainer({ genres, activeGenre, setActiveGenre, movies }) {
  return (
    <div className="movies-container">
      {/* 장르 탭 */}
      <div className="genre-tabs">
        {genres.map((g) => (
          <button
            key={g}
            className={activeGenre === g ? "tab active" : "tab"}
            onClick={() => setActiveGenre(g)}
          >
            {g === "ALL" ? "전체" : g}
          </button>
        ))}
      </div>

      {/* 영화 목록 */}
      <div className="movies-body grid">
        {movies.length === 0 ? (
          <div className="empty">조건에 맞는 영화가 없습니다.</div>
        ) : (
          movies.map((m) => <MovieCard key={m.docId} movie={m} />)
        )}
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  const navigate = useNavigate();

  //movie-card눌렀을때 doc_id로 보냄
  return (
    <div
      className="movie-card"
      onClick={() => {
        console.log("클릭됨:", movie.docId);
        navigate(`/movies/${movie.docId}`);
      }}
    >
      <img src={movie.posterUrl} alt={movie.title} />
      <div className="meta">
        <div className="title">{movie.title}</div>
        <div className="sub">{movie.repRlsDate}</div>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, setPage }) {
  // 페이지 번호 배열 생성
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        이전
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? "page-btn active" : "page-btn"}
          onClick={() => setPage(p)}
        >
          {p + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages - 1}
        onClick={() => setPage(page + 1)}
      >
        다음
      </button>
    </div>
  );
}
