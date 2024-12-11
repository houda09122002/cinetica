// src/hooks/useOnTheAirShows.ts
import { useQuery } from "@tanstack/react-query";
import { fetchOnTheAirShows, searchTVShows } from "../repositories/tvShowRepository";
import { useState } from "react";

export const useOnTheAirShows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);

  const { data: shows = [], isLoading, isError } = useQuery(
    ["onTheAirShows"],
    fetchOnTheAirShows,
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
