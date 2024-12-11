// src/repositories/movieRepository.ts
import axiosClient from "@/app/api/axiosClient";

export const fetchNowPlayingMovies = async () => {
  const response = await axiosClient.get("/movies/now-playing");
  return response.data.results || [];
};
export const fetchPopularMovies = async () => {
    const response = await axiosClient.get("/movies/popular");
    return response.data.results || [];
};
export const fetchTopRatedMovies = async () => {
    const response = await axiosClient.get("/movies/top-rated");
    return response.data.results || [];
  };
export const searchMovies = async (query: string) => {
  const response = await axiosClient.get(`/search`, {
    params: { query },
  });
  return response.data.movies || [];
};
