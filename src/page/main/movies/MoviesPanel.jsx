import React, { useEffect, useMemo, useState } from "react";
import "./css/moviespanel.css";
import axios from "axios";

export default function MoviesPanel() {
  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("ALL");

  // 모의 데이터
  const mock = [
    { docId: "1", title: "귀멸의 칼날", rating: "15", posterUrl: "https://i.namu.wiki/i/gwqbq98J0nv5hKDlCnnlu7KJ_zFDzvN9Cj8y5ss64uohGgY_3A5HzFKnxlCNWbxRfIepjW1aAr5q7Zf-QA5lYg.webp", date: "2025-08-22", genres: ["드라마"] },
    { docId: "2", title: "아임 스틸 히어", rating: "15", posterUrl: "...", repRlsDate: "2025-07-03", genres: ["다큐"] },
    { docId: "3", title: "어쩔 수가 없다", rating: "15", posterUrl: "...", repRlsDate: "2025-05-10", genres: ["코미디"] },
    { docId: "4", title: "별 헤는 밤", rating: "ALL_AGES", posterUrl: "...", repRlsDate: "2025-09-01", genres: ["로맨스", "드라마"] },
    { docId: "5", title: "라스트 러너", rating: "18", posterUrl: "...", repRlsDate: "2025-04-19", genres: ["스릴러", "액션"] },
    { docId: "6", title: "그 여름의 기억", rating: "12", posterUrl: "...", repRlsDate: "2025-07-29", genres: ["드라마", "로맨스"] },
    { docId: "7", title: "인류의 종말", rating: "18", posterUrl: "...", repRlsDate: "2025-03-12", genres: ["액션", "스릴러"] },
    { docId: "8", title: "웃으면 복이 와요", rating: "ALL_AGES", posterUrl: "...", repRlsDate: "2025-06-01", genres: ["코미디"] }
  ];


  //실패하면 목업데이터 들어감
  useEffect(() => {
    axios.get("http://localhost:8080/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => {
        console.error("영화 목록 불러오기 실패:", err);
        console.log("아직 api 연결못함 목업데이터들어감")
        setMovies(mock); // 실패 시 mock 데이터 사용
      });
  }, []);


  const genres = ["ALL", "드라마", "로맨스", "코미디", "액션", "스릴러", "다큐"];

  const filtered = useMemo(() => {
    if (activeGenre === "ALL") return movies;
    return movies.filter((m) => (m.genres || []).includes(activeGenre));
  }, [movies, activeGenre]);

  return (
    <div className="panel movies-panel">
      <MoviesContainer
        genres={genres}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        movies={filtered}
      />
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
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} />
      <div className="meta">
        <div className="title">{movie.title}</div>
        <div className="sub">{movie.repRlsDate}</div>
      </div>
    </div>
  );
}