import { Link } from "react-router-dom";

export default function MovieCard({ movie }: any) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "10px",
      }}
    >
      <h3>{movie.title}</h3>

      {movie.description && <p>{movie.description}</p>}

      <p>
        This is a short preview of the movie. Click below to see full details
        and learn more about it.
      </p>

      <Link to={`/details/${movie.id}`}>👉 View Details</Link>
    </div>
  );
}