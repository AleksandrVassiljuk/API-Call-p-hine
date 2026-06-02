import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getPopularMovies();
        setMovies(res.data.results);
      } catch (err) {
        console.log("Error loading movies", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
      <h2>🎬 Popular Movies</h2>

      <p className="text-muted mb-3">
        Discover trending movies from TMDb. View details or save them to your favorites.
      </p>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* CONTENT STATES */}
      {loading ? (
        <div className="text-center mt-4">
          <p>⏳ Loading movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center mt-4">
          <h4>😢 No movies found</h4>
          <p className="text-muted">
            Try refreshing or check your internet connection.
          </p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              Showing {movies.length} popular movies
            </small>
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