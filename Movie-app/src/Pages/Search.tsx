import { useState } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await searchMovies(value);
      setMovies(res.data.results || []);
    } catch {
      setMovies([]);
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie: Movie) => {
    try {
      const favs: Movie[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      const exists = favs.some((m) => m.id === movie.id);

      if (!exists) {
        const updated = [...favs, movie];
        localStorage.setItem("favorites", JSON.stringify(updated));
      }
    } catch {
      localStorage.setItem("favorites", JSON.stringify([movie]));
    }
  };

  return (
    <div className="container mt-4">

      <h2>🔎 Search Movies</h2>

      <input
        className="form-control"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {loading && (
        <p className="text-muted mt-2">Searching...</p>
      )}

      {error && (
        <p className="text-danger mt-2">{error}</p>
      )}

      {!loading && movies.length === 0 && query && (
        <p className="text-muted mt-3">
          No results found.
        </p>
      )}

      <div className="row mt-3">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onFavorite={addToFavorites}
          />
        ))}
      </div>

    </div>
  );
}

export default Search;