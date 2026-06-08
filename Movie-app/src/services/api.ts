import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const API_KEY = import.meta.env.VITE_API_KEY;

export const getPopularMovies = () =>
  api.get("/movie/popular", {
    params: { api_key: API_KEY },
  });

export const searchMovies = (query: string) =>
  api.get("/search/movie", {
    params: { api_key: API_KEY, query },
  });

export const getMovieDetails = (id: string | number) =>
  api.get(`/movie/${id}`, {
    params: { api_key: API_KEY },
  });