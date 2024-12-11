// src/hooks/useTopRatedShows.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedShows, searchTVShows } from "../repositories/tvShowRepository";
import { useState } from "react";

export const useTopRatedShows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);

  const { data: shows = [], isLoading, isError } = useQuery(
    ["topRatedShows"],
    fetchTopRatedShows,
    {
      onSuccess: (data) => setFilteredShows(data),
    }
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredShows(shows); // Réinitialise aux données originales
    } else {
      const results = await searchTVShows(query);
      setFilteredShows(results);
    }
  };

  return {
    shows: filteredShows,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleSearch,
  };
};
