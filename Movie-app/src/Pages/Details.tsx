import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import type { Movie } from "../types/Movie";

const IMG = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMG = "https://via.placeholder.com/500x750";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        setError("");
        const res = await getMovieDetails(id);
        setMovie(res.data);
      } catch {
        setError("Failed to load movie details.");
      }
    };

    fetchMovie();
  }, [id]);

  const addToFavorites = (movie: Movie) => {
    const favs: Movie[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const exists = favs.some((m) => m.id === movie.id);

    if (!exists) {
      const updated = [...favs, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  if (error) {
    return (
      <div className="container mt-4">
        <p className="text-danger">{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          🏠 Go Home
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <p className="text-center mt-5">
        🎬 Loading movie details...
      </p>
    );
  }

  const imageUrl =
    movie.poster_path ? `${IMG}${movie.poster_path}` : FALLBACK_IMG;

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="container mt-4">

      <button
        className="btn btn-sm btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        🔙 Back
      </button>

      <div className="row">

        {/* POSTER */}
        <div className="col-md-4 mb-3">
          <img
            src={imageUrl}
            className="img-fluid rounded shadow"
            alt={`${movie.title} poster`}
          />

          <p className="text-muted mt-2 small text-center">
            Official TMDb poster
          </p>
        </div>

        {/* INFO */}
        <div className="col-md-8">

          <h1 className="mb-2">{movie.title || "No title"}</h1>

          <p className="text-warning fs-5 mb-1">
            ⭐ Rating: {rating}
          </p>

          <p className="text-muted mb-3">
            📅 Release date: {movie.release_date || "Unknown"}
          </p>

          <hr />

          <h5>📖 Overview</h5>
          <p className="mt-2">
            {movie.overview || "No overview available for this movie."}
          </p>

          <hr />

          <h5>🎯 Extra Info</h5>
          <div className="text-muted small">
            <p>Movie ID: {movie.id}</p>
            <p>Data source: TMDb API</p>
          </div>

          <hr />

          <div className="d-flex gap-2 flex-wrap">

            <button className="btn btn-primary">
              ▶ Trailer (coming soon)
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => addToFavorites(movie)}
            >
              ❤️ Add to Favorites
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              🏠 Home
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Details;