// src/hooks/useNowPlayingMovies.ts
import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovies, searchMovies } from "../repositories/movieRepository";
import { useState } from "react";

export const useNowPlayingMovies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [originalMovies, setOriginalMovies] = useState([]);

  const { data: movies = [], isLoading, isError, refetch } = useQuery(
    ["nowPlayingMovies"],
    fetchNowPlayingMovies,
    {
      onSuccess: (data) => setOriginalMovies(data),
    }
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      refetch(); // Recharge les données originales
    } else {
      const results = await searchMovies(query);
      setOriginalMovies(results);
    }
  };

  return {
    movies: searchQuery ? originalMovies : movies,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleSearch,
  };
};
