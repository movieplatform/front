// MoviesPage.jsx
import { useState } from "react";
import MoviesPanel from "./MoviesPanel";

export default function MoviesPage() {
  const [activeGenre, setActiveGenre] = useState("ALL");

  return (
    <div className="movies-page">
      <MoviesPanel defaultGenre={activeGenre} />
    </div>
  );
}
