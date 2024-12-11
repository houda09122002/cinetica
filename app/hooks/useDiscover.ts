// src/hooks/useDiscover.ts
import { useState, useEffect } from "react";
import { fetchDiscoverData, searchMoviesAndShows } from "../repositories/discoverRepository";
import type { Movie } from "@/app/api/entities/movie";
import type { TVShow } from "@/app/api/entities/TVShow";

interface DiscoverData {
  movies: Movie[];
  shows: TVShow[];
}

export const useDiscover = () => {
  const [discoverData, setDiscoverData] = useState<DiscoverData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchInitialData();
    }
  }, [searchQuery]);

  const fetchInitialData = async () => {
    setIsSearching(true);
    try {
      const data = await fetchDiscoverData();
      setDiscoverData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchInitialData();
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchMoviesAndShows(query);
      setDiscoverData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to search");
    } finally {
      setIsSearching(false);
    }
  };

  return {
    discoverData,
    searchQuery,
    setSearchQuery,
    isSearching,
    error,
    handleSearch,
  };
};
