import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  return (
    <div>
      <h1>Movie Details 🎬</h1>

      <p>
        This page shows detailed information about the selected movie.
        You can learn more about the storyline, actors, and other interesting facts.
      </p>

      <h2>Movie ID: {id}</h2>

      <p>
        (Later you can load real data from an API here, like description,
        rating, release date, and images.)
      </p>
    </div>
  );
}