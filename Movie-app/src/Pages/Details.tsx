import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import type { Movie } from "../types/Movie";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovieDetails(id!);
      setMovie(res.data);
    };

    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <p className="text-center mt-5">
        Loading movie details, please wait...
      </p>
    );

  return (
    <div className="container mt-4">

      <div className="row">

        {/* Poster */}
        <div className="col-md-4 mb-3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid rounded shadow"
            alt={movie.title}
          />

          <p className="text-muted mt-2 small text-center">
            🎬 Official movie poster from TMDb database
          </p>
        </div>

        {/* Info */}
        <div className="col-md-8">

          {/* Title */}
          <h1 className="mb-2">{movie.title}</h1>

          <p className="text-muted mb-3">
            Detailed information about this movie, including rating, release
            year and overview.
          </p>

          {/* Rating */}
          <p className="text-warning fs-5 mb-1">
            ⭐ Rating:{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>

          {/* Release date */}
          <p className="text-muted mb-1">
            📅 Release date: {movie.release_date || "Unknown"}
          </p>

          {/* Extra info line */}
          <p className="text-muted mb-3">
            ℹ️ Data provided by TMDb API
          </p>

          <hr />

          {/* Overview */}
          <h5>📖 Overview</h5>
          <p className="mt-2">
            {movie.overview ||
              "No description available for this movie. This means TMDb database does not currently include a full overview."}
          </p>

          <hr />

          {/* Extra section */}
          <h5>🎯 More Information</h5>
          <ul className="text-muted">
            <li>Movie ID: {movie.id}</li>
            <li>Language: not available in current response</li>
            <li>Status: available in TMDb database</li>
          </ul>

          <hr />

          {/* Buttons */}
          <div className="d-flex gap-2 flex-wrap">

            <button className="btn btn-primary">
              ▶ Watch Trailer (coming soon)
            </button>

            <button className="btn btn-outline-danger">
              ❤️ Add to Favorites
            </button>

            <button className="btn btn-secondary">
              🔙 Go Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Details;