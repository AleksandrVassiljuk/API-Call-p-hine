import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>Your Favorite Movies ⭐</h1>

      <p>
        This page shows all the movies you have added to your favorites.
        You can revisit them anytime without searching again.
      </p>

      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>
          You don’t have any favorite movies yet.  
          Go to Home or Search and add some ⭐
        </p>
      )}
    </div>
  );
}