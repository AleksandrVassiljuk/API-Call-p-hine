import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getPopularMovies();
        setMovies(res.data.results);
      } catch (err) {
        console.log("Error loading movies", err);
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
        Discover trending and popular movies from TMDb. Click on a movie to
        view details or save it to your favorites list.
      </p>

      {/* CONTENT */}
      {loading ? (
        <p>⏳ Loading movies, please wait...</p>
      ) : movies.length === 0 ? (
        <div className="text-center mt-4">
          <h4>😢 No movies found</h4>
          <p className="text-muted">
            Try refreshing the page or check your internet connection.
          </p>
        </div>
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