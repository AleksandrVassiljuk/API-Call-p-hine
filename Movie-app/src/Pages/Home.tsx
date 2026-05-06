import MovieCard from "../components/MovieCard";

export default function Home() {
  const movies = [
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller about dreams inside dreams.",
    },
    {
      id: 2,
      title: "Interstellar",
      description: "A journey through space and time to save humanity.",
    },
  ];

  return (
    <div>
      <h1>Welcome to MovieApp 🎬</h1>

      <p>
        Discover amazing movies, explore details, and save your favorites.
        This app helps you find the best films from different genres.
      </p>

      <h2>🔥 Popular Movies</h2>

      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}