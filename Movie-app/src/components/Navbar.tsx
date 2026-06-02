import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

function Navbar() {
  const location = useLocation();
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const favs: Movie[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavoritesCount(favs.length);
    };

    updateCount();
    window.addEventListener("storage", updateCount);

    return () => window.removeEventListener("storage", updateCount);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold" to="/">
          🎬 MovieApp
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto gap-3">

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "text-warning" : ""}`}
                to="/"
              >
                🏠 Home
                <small className="d-block text-muted">
                  Popular movies
                </small>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/search") ? "text-warning" : ""}`}
                to="/search"
              >
                🔎 Search
                <small className="d-block text-muted">
                  Find movies fast
                </small>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/favorites") ? "text-warning" : ""}`}
                to="/favorites"
              >
                ❤️ Favorites
                <small className="d-block text-muted">
                  Saved ({favoritesCount})
                </small>
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;