const API_KEY = "1dc3689c8de4873fb37ccc2a4fea1e17";
const BASE_URL = "https://api.themoviedb.org/3";

// 🎥 POPULAR FILMS
export async function getPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return res.json();
}

// 🔍 SEARCH
export async function searchMovies(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return res.json();
}

// 🎬 DETAILS
export async function getMovieDetails(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return res.json();
}