import { Link } from "react-router-dom";
import type { Movie } from "../types/Movie";

type Props = {
  movie: Movie;
  onFavorite: (movie: Movie) => void;
};

function MovieCard({ movie, onFavorite }: Props) {
  return (
    <div className="col-md-3 col-sm-6 mb-4">

      <div className="card h-100 shadow-sm">

        {/* POSTER */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          className="card-img-top"
          alt={movie.title}
        />

        <div className="card-body d-flex flex-column">

          {/* TITLE */}
          <h5 className="card-title text-truncate" title={movie.title}>
            {movie.title}
          </h5>

          {/* INFO LINE */}
          <p className="text-muted small mb-2">
            🎬 TMDb movie • click details for more info
          </p>

          {/* RATING + YEAR */}
          <div className="d-flex justify-content-between align-items-center mb-2">

            <span className="text-warning">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>

            <small className="text-muted">
              {movie.release_date ? movie.release_date.slice(0, 4) : "—"}
            </small>

          </div>

          {/* OVERVIEW */}
          <p className="text-muted small mb-3">
            {movie.overview
              ? movie.overview.slice(0, 100) + "..."
              : "No description available for this movie."}
          </p>

          {/* BUTTONS */}
          <div className="mt-auto d-flex flex-column gap-2">

            <Link
              to={`/movie/${movie.id}`}
              className="btn btn-primary btn-sm w-100"
            >
              🔍 View Details
            </Link>

            <button
              className="btn btn-outline-danger btn-sm w-100"
              onClick={() => onFavorite(movie)}
            >
              ❤️ Add to Favorites
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieCard;