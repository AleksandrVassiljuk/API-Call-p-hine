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
        console.log(err);
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
      <h2>🎬 Popular Movies</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} onFavorite={addToFavorites} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;