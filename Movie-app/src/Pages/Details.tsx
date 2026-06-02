import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import type { Movie } from "../types/Movie";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieDetails(id!);
        setMovie(res.data);
      } catch (err) {
        console.log("Error loading movie", err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <p className="text-center mt-5">
        🎬 Loading movie details...
      </p>
    );

  return (
    <div className="container mt-4">

      <button
        className="btn btn-sm btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        🔙 Back
      </button>

      <div className="row">

        {/* Poster */}
        <div className="col-md-4 mb-3">

          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid rounded shadow"
            alt={movie.title}
          />

          <p className="text-muted mt-2 small text-center">
            Official poster from TMDb
          </p>

        </div>

        {/* Info */}
        <div className="col-md-8">

          <h1 className="mb-2">{movie.title}</h1>

          <p className="text-muted mb-3">
            Movie details, rating, release date and overview from TMDb API.
          </p>

          <p className="text-warning fs-5 mb-1">
            ⭐ Rating:{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
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

          <h5>🎯 Info</h5>

          <div className="text-muted small">
            <p>Movie ID: {movie.id}</p>
            <p>Source: TMDb API</p>
          </div>

          <hr />

          <div className="d-flex gap-2 flex-wrap">

            <button className="btn btn-primary">
              ▶ Trailer (soon)
            </button>

            <button className="btn btn-outline-danger">
              ❤️ Favorite
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