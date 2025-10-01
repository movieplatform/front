// MoviesPage.jsx
import { useState } from "react";
import MoviesPanel from "./MoviesPanel";
import MovieReviews from "./MovieReviews";
export default function MoviesPage() {
  const [activeGenre, setActiveGenre] = useState("ALL");
  // const [selectedDocId, setSelectedDocId] = useState(null);

  return (
    <div className="movies-page">
      <MoviesPanel defaultGenre={activeGenre}
      // onSelect={(id) => setSelectedDocId(id)}
      />
    </div>
  );
}
