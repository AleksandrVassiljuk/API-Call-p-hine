import { useState, useEffect, useCallback } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async (searchText: string) => {
    try {
      setLoading(true);
      setError("");

      const res = await searchMovies(searchText);
      setMovies(res.data.results || []);
    } catch (err) {
      setError("Failed to search movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchMovies(query);
      } else {
        setMovies([]);
        setError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, fetchMovies]);

  const addToFavorites = (movie: Movie) => {
    const favs: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favs.some((m) => m.id === movie.id)) {
      favs.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  };

  const clearSearch = () => {
    setQuery("");
    setMovies([]);
    setError("");
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center">
        <h2>🔎 Search Movies</h2>

        {query && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={clearSearch}
          >
            Clear
          </button>
        )}
      </div>

      <p className="text-muted mb-3">
        Search for movies from TMDb database and discover new titles.
      </p>

      {/* INPUT */}
      <input
        className="form-control"
        placeholder="Type movie name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* STATES */}
      {!query && (
        <p className="text-muted mt-3">
          Start typing to search for movies.
        </p>
      )}

      {loading && (
        <p className="mt-3">⏳ Searching movies...</p>
      )}

      {error && (
        <p className="text-danger mt-3">{error}</p>
      )}

      {!loading && query && movies.length > 0 && (
        <p className="text-muted mt-3">
          Found {movies.length} movies
        </p>
      )}

      {!loading && query && movies.length === 0 && !error && (
        <p className="text-muted mt-3">
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