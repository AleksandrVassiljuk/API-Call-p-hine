import { Link } from "react-router-dom";
import type { Movie } from "../types/Movie";

type Props = {
  movie: Movie;
  onFavorite: (movie: Movie) => void;
};

function MovieCard({ movie, onFavorite }: Props) {
  return (
    <div className="col-md-3 col-sm-6 mb-4">

      <div className="card h-100 shadow-sm movie-card">

        {/* Poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image+Available"
          }
          className="card-img-top movie-img"
          alt={movie.title}
        />

        <div className="card-body d-flex flex-column">

          {/* Title */}
          <h5
            className="card-title text-truncate"
            title={movie.title}
          >
            {movie.title}
          </h5>

          {/* Subtitle / hint text */}
          <p className="text-muted small mb-2">
            🎬 Movie from TMDb database • Click details to learn more
          </p>

          {/* Rating + year */}
          <div className="d-flex justify-content-between align-items-center mb-2">

            <span className="text-warning">
              ⭐ Rating:{" "}
              {movie.vote_average
                ? movie.vote_average.toFixed(1)
                : "Not rated"}
            </span>

            {movie.release_date && (
              <small className="text-muted">
                📅 {movie.release_date.slice(0, 4)}
              </small>
            )}

          </div>

          {/* Description */}
          <p className="card-text text-muted small movie-overview">
            {movie.overview
              ? movie.overview.slice(0, 100) + "..."
              : "No description available for this movie. This usually means TMDb does not have extended information for this title yet."}
          </p>

          {/* Extra info line */}
          <p className="text-muted small">
            ℹ️ You can open details page to see full description, ratings and more data.
          </p>

          {/* Buttons */}
          <div className="mt-auto d-flex flex-column gap-2">

            <Link
              to={`/movie/${movie.id}`}
              className="btn btn-primary btn-sm w-100"
            >
              🔍 View Full Details
            </Link>

            <button
              className="btn btn-outline-danger btn-sm w-100"
              onClick={() => onFavorite(movie)}
              title="Add to favorites"
            >
              ❤️ Save to Favorites
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieCard;