import axios from "axios";
import type { Movie } from "../types/Movie";

const API_TOKEN = import.meta.env.VITE_API_TOKEN as string;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getPopularMovies = () => {
  return api.get<{ results: Movie[] }>("/movie/popular");
};

export const searchMovies = (q: string) => {
  return api.get<{ results: Movie[] }>(
    `/search/movie?query=${encodeURIComponent(q)}`
  );
};

export const getMovieDetails = (id: string | number) => {
  return api.get<Movie>(`/movie/${id}`);
};