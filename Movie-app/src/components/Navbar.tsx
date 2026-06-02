import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🎬 MovieApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto gap-3">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                🏠 Home
                <span className="d-block text-muted small">
                  Popular movies
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/search">
                🔎 Search
                <span className="d-block text-muted small">
                  Find movies fast
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                ❤️ Favorites
                <span className="d-block text-muted small">
                  Saved movies
                </span>
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;