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

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          className="card-img-top movie-img"
          alt={movie.title}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title text-truncate" title={movie.title}>
            {movie.title}
          </h5>

          <p className="text-muted small mb-2">
            Movie available in TMDb database
          </p>

          <div className="d-flex justify-content-between align-items-center mb-2">

            <span className="text-warning">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>

            {movie.release_date && (
              <small className="text-muted">
                {movie.release_date.slice(0, 4)}
              </small>
            )}

          </div>

          <p className="text-muted small mb-3">
            {movie.overview
              ? movie.overview.slice(0, 90) + "..."
              : "No overview available for this movie."}
          </p>

          <div className="mt-auto d-flex flex-column gap-2">

            <Link
              to={`/movie/${movie.id}`}
              className="btn btn-primary btn-sm w-100"
            >
              View Details
            </Link>

            <button
              className="btn btn-outline-danger btn-sm w-100"
              onClick={() => onFavorite(movie)}
            >
              Add to Favorites
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieCard;