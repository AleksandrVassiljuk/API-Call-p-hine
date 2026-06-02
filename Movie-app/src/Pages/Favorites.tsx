import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    setFavorites(data ? JSON.parse(data) : []);
  }, []);

  const saveToStorage = (items: Movie[]) => {
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    saveToStorage(updated);
  };

  const clearAll = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to remove all favorites?"
    );

    if (!confirmClear) return;

    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">

        <div>
          <h2>⭐ Favorites</h2>
          <small className="text-muted">
            {favorites.length} movie(s) saved
          </small>
        </div>

        {favorites.length > 0 && (
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={clearAll}
          >
            Clear all
          </button>
        )}

      </div>

      <p className="text-muted mb-3">
        Your personal movie collection stored in your browser.
      </p>

      {/* EMPTY STATE */}
      {favorites.length === 0 ? (
        <div className="text-center mt-5">

          <h3>😢 No favorites yet</h3>

          <p className="text-muted">
            Go back to home and click ❤️ on movies you like.
          </p>

          <Link to="/" className="btn btn-primary mt-2">
            🎬 Browse Movies
          </Link>

        </div>
      ) : (
        <div className="row">

          {favorites.map((movie) => (
            <div className="col-md-3 col-sm-6 mb-4" key={movie.id}>

              <div className="card h-100 shadow-sm">

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />

                <div className="card-body d-flex flex-column">

                  <h5 className="card-title text-truncate" title={movie.title}>
                    {movie.title}
                  </h5>

                  <p className="text-muted small mb-1">
                    Saved from TMDb
                  </p>

                  <p className="text-warning mb-2">
                    ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                  </p>

                  <div className="mt-auto d-flex gap-2">

                    <Link
                      to={`/movie/${movie.id}`}
                      className="btn btn-primary btn-sm flex-fill"
                    >
                      Details
                    </Link>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFavorite(movie.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Favorites;