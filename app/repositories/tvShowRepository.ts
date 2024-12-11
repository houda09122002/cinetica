// src/repositories/tvShowRepository.ts
import axiosClient from "@/app/api/axiosClient";

export const fetchOnTheAirShows = async () => {
  const response = await axiosClient.get("/shows/on-the-air");
  return response.data.results || [];
};
export const fetchPopularShows = async () => {
    const response = await axiosClient.get("/shows/popular");
    return response.data.results || [];
  };
  export const fetchTopRatedShows = async () => {
    const response = await axiosClient.get("/shows/top-rated");
    return response.data.results || [];
  };
export const searchTVShows = async (query: string) => {
  const response = await axiosClient.get(`/search`, {
    params: { query },
  });
  return response.data.shows || [];
};
