import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          🎬 MovieApp
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                🏠 Home
                <small className="d-block text-muted" style={{ fontSize: "10px" }}>
                  Popular movies
                </small>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/search">
                🔎 Search
                <small className="d-block text-muted" style={{ fontSize: "10px" }}>
                  Find any movie
                </small>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                ❤️ Favorites
                <small className="d-block text-muted" style={{ fontSize: "10px" }}>
                  Saved movies
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