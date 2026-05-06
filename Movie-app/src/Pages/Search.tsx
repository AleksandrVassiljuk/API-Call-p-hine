import { useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [query, setQuery] = useState("");

  const movies = [
    { id: 1, title: "Inception" },
    { id: 2, title: "Interstellar" },
    { id: 3, title: "Batman Begins" },
  ];

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Search Movies 🔍</h1>

      <p>
        Use the search bar below to find your favorite movies. You can search
        by title and explore different films instantly.
      </p>

      <input
        placeholder="Type movie name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h2>Results</h2>

      {filtered.length > 0 ? (
        filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No movies found. Try a different search.</p>
      )}
    </div>
  );
}