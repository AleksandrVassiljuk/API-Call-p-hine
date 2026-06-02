import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchMovies();
      } else {
        setMovies([]);
        setError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await searchMovies(query);
      setMovies(res.data.results || []);

    } catch (err) {
      setError("Failed to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
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

      {/* HEADER */}
      <h2>🔎 Search Movies</h2>

      <p className="text-muted mb-3">
        Search for any movie from TMDb database. Results will appear instantly
        as you type.
      </p>

      {/* INPUT */}
      <input
        className="form-control"
        placeholder="Type movie name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* STATUS */}
      {loading && (
        <p className="mt-3">⏳ Searching movies...</p>
      )}

      {error && (
        <p className="text-danger mt-3">{error}</p>
      )}

      {/* EMPTY STATE */}
      {!loading && query && movies.length === 0 && (
        <p className="mt-3 text-muted">
          No results found for "{query}"
        </p>
      )}

      {/* RESULTS */}
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