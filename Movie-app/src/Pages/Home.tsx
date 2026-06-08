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
        setError("");
        setLoading(true);

        const res = await getPopularMovies();
        setMovies(res.data.results || []);
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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

  if (loading)
    return <p className="text-center mt-5">🎬 Loading movies...</p>;

  if (error)
    return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-4">

      <h2 className="mb-3">🎬 Popular Movies</h2>

      {movies.length === 0 ? (
        <p className="text-muted text-center mt-5">
          No movies found.
        </p>
      ) : (
        <div className="row">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onFavorite={addToFavorites}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;