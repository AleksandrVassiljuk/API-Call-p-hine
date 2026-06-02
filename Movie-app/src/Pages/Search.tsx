import { useState } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (q: string) => {
    setQuery(q);

    if (!q.trim()) {
      setMovies([]);
      return;
    }

    const res = await searchMovies(q);
    setMovies(res.data.results);
  };

  const addToFavorites = (movie: Movie) => {
    const favs: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favs.find((m) => m.id === movie.id)) {
      favs.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  };

  return (
    <div className="container mt-4">

      <h2>🔎 Search Movies</h2>

      <input
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="row mt-3">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} onFavorite={addToFavorites} />
        ))}
      </div>

    </div>
  );
}

export default Search;