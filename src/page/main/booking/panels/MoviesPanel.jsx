import { useState } from "react";
import "../css/moviespanel.css";

export default function MoviesPanel() {
    const [activeMovie, setActiveMovie] = useState("");


    return (
        <div className="panel movies-panel">
            {/* 헤더 영역 */}
            <div className="movies-header">
                <h3>영화 선택</h3>
            </div>

            {/* 리스트 영역 */}
            <ul className="movie-list">

            </ul>
        </div>
    );
}
