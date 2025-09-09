import React, { useEffect, useState } from "react";
import "./main.css";
import Header from "../commonUI/Header";
import CarouselRow from "./CarouselRow";
import { getMovies } from "../api/movies";

export default function Main() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then(setMovies) // 바로 배열로 들어옴
      .catch(err => console.error("영화 로딩 실패:", err));
  }, []);


  return (
    <div className="page">
      <main className="container">
        <CarouselRow title="평점 높은 영화" movies={movies} />
      </main>
    </div>
  );
}
