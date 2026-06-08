import { Link } from "react-router-dom";
import type { Movie } from "../types/Movie";

const IMG = import.meta.env.VITE_IMAGE_BASE_URL || "";
const FALLBACK_IMG = "https://via.placeholder.com/500x750";

type Props = {
  movie: Movie;
  onFavorite: (movie: Movie) => void;
  isFavorite?: boolean;
};

function MovieCard({ movie, onFavorite, isFavorite }: Props) {
  const imageUrl =
    movie.poster_path && IMG
      ? `${IMG.replace(/\/$/, "")}${movie.poster_path}`
      : FALLBACK_IMG;

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card h-100">

        <img
          src={imageUrl}
          className="card-img-top"
          alt={`${movie.title} poster`}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title text-truncate">
            {movie.title || "No title"}
          </h5>

          <p className="text-warning">
            ⭐ {rating}
          </p>

          <div className="mt-auto d-flex flex-column gap-2">

            <Link to={`/movie/${movie.id}`} className="btn btn-primary btn-sm">
              Details
            </Link>

            <button
              className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => onFavorite(movie)}
            >
              {isFavorite ? "💔 Remove Favorite" : "❤️ Favorite"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieCard;