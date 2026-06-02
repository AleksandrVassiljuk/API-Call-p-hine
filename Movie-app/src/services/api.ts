import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export const getPopularMovies = async () => {
  const res = await api.get("/movie/popular", {
    params: { api_key: API_KEY },
  });
  return res;
};

export const searchMovies = async (query: string) => {
  const res = await api.get("/search/movie", {
    params: { api_key: API_KEY, query },
  });
  return res;
};

export const getMovieDetails = async (id: string | number) => {
  const res = await api.get(`/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return res;
};