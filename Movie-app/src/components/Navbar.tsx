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

  const updateFavorites = () => {
    const favs: Movie[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavoritesCount(favs.length);
  };

  useEffect(() => {
    updateFavorites();

    // kui localStorage muutub TEISES TABIS
    window.addEventListener("storage", updateFavorites);

    return () => {
      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  // 👉 kui lisad favorite samas appis, storage event EI tööta
  // seega lisame "manual refresh hacki"
  useEffect(() => {
    updateFavorites();
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold" to="/">
          🎬 MovieApp
        </Link>

        {/* TOGGLER */}
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
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/search") ? "text-warning" : ""}`}
                to="/search"
              >
                🔎 Search
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/favorites") ? "text-warning" : ""}`}
                to="/favorites"
              >
                ❤️ Favorites ({favoritesCount})
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;