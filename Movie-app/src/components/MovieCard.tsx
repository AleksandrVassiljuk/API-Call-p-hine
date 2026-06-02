import { Link } from "react-router-dom";
import type { Movie } from "../types/Movie";

const IMG = import.meta.env.VITE_IMAGE_BASE_URL;

type Props = {
  movie: Movie;
  onFavorite: (movie: Movie) => void;
};

function MovieCard({ movie, onFavorite }: Props) {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src={
            movie.poster_path
              ? `${IMG}${movie.poster_path}`
              : "https://via.placeholder.com/500x750"
          }
          className="card-img-top"
          alt={movie.title}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title text-truncate">
            {movie.title}
          </h5>

          <p className="text-warning">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>

          <div className="mt-auto d-flex flex-column gap-2">

            <Link
              to={`/movie/${movie.id}`}
              className="btn btn-primary btn-sm"
            >
              Details
            </Link>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onFavorite(movie)}
            >
              ❤️ Favorite
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieCard;