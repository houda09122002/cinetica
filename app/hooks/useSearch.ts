// src/hooks/useSearch.ts
import { useState } from "react";
import { searchMoviesAndShows } from "../repositories/searchRepository";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ movies: [], shows: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults({ movies: [], shows: [] });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchMoviesAndShows(searchQuery);
      setResults(data);
    } catch (err) {
      setError("Failed to fetch search results");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    handleSearch,
  };
};
