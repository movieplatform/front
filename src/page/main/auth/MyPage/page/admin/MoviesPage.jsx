// src/page/admin/MoviesPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/moviespage.css";

function MovieFilterForm({ onFetch }) {
  const [filters, setFilters] = useState({
    genre: "",
    country: "",
    startDate: "",
    endDate: "",
    limit: 10,
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetch(filters);
  };

  return (
    <form className="movie-filter-form" onSubmit={handleSubmit}>
      <label>
        장르:
        <input type="text" name="genre" value={filters.genre} onChange={handleChange} placeholder="예: 공포, 드라마" />
      </label>
      <label>
        국가:
        <input type="text" name="country" value={filters.country} onChange={handleChange} placeholder="예: 대한민국, 미국" />
      </label>

      <div className="date-range">
        <label>
          개봉 시작일:
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </label>
        <label>
          개봉 종료일:
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        </label>
      </div>

      <label>
        불러올 개수:
        <input type="number" name="limit" value={filters.limit} onChange={handleChange} />
      </label>
      <button type="submit">영화 불러오기</button>
    </form>

  );
}


function MovieTable({ movies }) {
  return (
    <table className="movie-table">
      <thead>
        <tr>
          <th>제목</th>
          <th>장르</th>
          <th>개봉일</th>
        </tr>
      </thead>
      <tbody>
        {movies.length > 0 ? (
          movies.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.genre}</td>
              <td>{m.releaseDate}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              데이터가 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchMovies = async (filters) => {
    try {
      const res = await axios.get("/api/movies", { params: filters });
      setMovies(res.data);
      setCurrentPage(1); // 새로운 검색 시 첫 페이지로
    } catch (err) {
      console.error("영화 불러오기 실패:", err);
      setMovies([
        { id: 1, title: "귀시", genre: "공포, 옴니버스", releaseDate: "2025-09-17" },
        { id: 2, title: "좀비딸", genre: "드라마, 코미디", releaseDate: "2025-07-30" },
        { id: 3, title: "구마수녀: 들러붙었구나", genre: "공포", releaseDate: "2025-07-17" },
        { id: 4, title: "2035: 더 그린라이트", genre: "SF, 드라마", releaseDate: "2025-06-04" },
        { id: 5, title: "파과", genre: "액션, 범죄", releaseDate: "2025-04-30" },
        { id: 6, title: "공포특급", genre: "공포, 스릴러", releaseDate: "2025-04-02" },
        { id: 7, title: "부전시장", genre: "드라마", releaseDate: "2025-03-27" },
        { id: 8, title: "당골", genre: "공포", releaseDate: "2025-03-13" },
        { id: 9, title: "차라리 죽여", genre: "드라마, 코미디", releaseDate: "2025-02-26" },
        { id: 10, title: "퇴마록", genre: "액션, 미스터리", releaseDate: "2025-02-21" },
        { id: 11, title: "민들레", genre: "드라마, 가족", releaseDate: "2025-02-11" },
        { id: 12, title: "수호", genre: "드라마", releaseDate: "2025-01-20" },
      ]);
    }
  };

  useEffect(() => {
    fetchMovies({ limit: 50 }); // 처음엔 넉넉히 불러오기
  }, []);

  // 현재 페이지에 맞는 영화만 보여주기
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="movies-page">
      <h2>영화 관리</h2>
      <MovieFilterForm onFetch={fetchMovies} />
      <h3>영화 목록</h3>
      <MovieTable movies={currentMovies} />
      <Pagination
        totalItems={movies.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}