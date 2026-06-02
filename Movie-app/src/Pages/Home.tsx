import { useEffect, useState, useCallback } from "react";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getPopularMovies();
      setMovies(res.data.results || []);
    } catch (err) {
      setError("Failed to load movies. Please try again later.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addToFavorites = (movie: Movie) => {
    const favs: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favs.some((m) => m.id === movie.id)) {
      favs.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <h2>🎬 Popular Movies</h2>

      <p className="text-muted mb-3">
        Discover trending movies from TMDb. View details or save them to favorites.
      </p>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* STATES */}
      {loading ? (
        <div className="text-center mt-4">
          <p>⏳ Loading movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center mt-4">
          <h4>😢 No movies found</h4>
          <p className="text-muted">
            Try refreshing the page or check your internet connection.
          </p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              Showing {movies.length} popular movies
            </small>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={fetchMovies}
            >
              Refresh
            </button>
          </div>

          <div className="row">
            {movies.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                onFavorite={addToFavorites}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Home;