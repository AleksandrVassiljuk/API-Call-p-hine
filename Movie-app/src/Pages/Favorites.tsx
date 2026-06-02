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
    const data = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(data);
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const clearAll = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>⭐ Your Favorite Movies</h2>

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
        Here you can find all movies you saved. Data is stored locally in your
        browser (localStorage).
      </p>

      {/* EMPTY STATE */}
      {favorites.length === 0 && (
        <div className="text-center mt-5">

          <h3>😢 No favorites yet</h3>

          <p className="text-muted">
            You haven’t saved any movies yet. Go back to home and click ❤️ on
            movies you like.
          </p>

          <Link to="/" className="btn btn-primary mt-2">
            🎬 Browse Movies
          </Link>

        </div>
      )}

      {/* GRID */}
      <div className="row">

        {favorites.map((movie) => (
          <div className="col-md-3 col-sm-6 mb-4" key={movie.id}>

            <div className="card h-100 shadow-sm favorite-card">

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top favorite-img"
                alt={movie.title}
              />

              <div className="card-body d-flex flex-column">

                <h5
                  className="card-title text-truncate"
                  title={movie.title}
                >
                  {movie.title}
                </h5>

                <p className="text-muted small mb-1">
                  🎬 Saved movie from TMDb collection
                </p>

                <p className="text-warning mb-2">
                  ⭐ Rating: {movie.vote_average?.toFixed(1) || "N/A"}
                </p>

                <div className="mt-auto d-flex gap-2">

                  <Link
                    to={`/movie/${movie.id}`}
                    className="btn btn-primary btn-sm flex-fill"
                  >
                    🔍 Details
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

    </div>
  );
}

export default Favorites;