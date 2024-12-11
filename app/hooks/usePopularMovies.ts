// src/hooks/usePopularMovies.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies, searchMovies } from "../repositories/movieRepository";
import { useState } from "react";

export const usePopularMovies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { data: movies = [], isLoading, isError } = useQuery(
    ["popularMovies"],
    fetchPopularMovies,
    {
      onSuccess: (data) => setFilteredMovies(data),
    }
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredMovies(movies); // Réinitialise aux données originales
    } else {
      const results = await searchMovies(query);
      setFilteredMovies(results);
    }
  };

  return {
    movies: filteredMovies,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleSearch,
  };
};
