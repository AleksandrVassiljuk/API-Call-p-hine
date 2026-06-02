import axios from "axios";
import type { Movie } from "../types/Movie";

const API_KEY = import.meta.env.VITE_API_KEY as string;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getPopularMovies = () => {
  return api.get<{ results: Movie[] }>(
    `/movie/popular?api_key=${API_KEY}`
  );
};

export const searchMovies = (query: string) => {
  return api.get<{ results: Movie[] }>(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
};

export const getMovieDetails = (id: string | number) => {
  return api.get<Movie>(
    `/movie/${id}?api_key=${API_KEY}`
  );
};