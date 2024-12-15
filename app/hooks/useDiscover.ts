import { useState, useEffect } from "react";
import { fetchDiscoverData, searchMoviesAndShows } from "../repositories/discoverRepository";
import type { Movie } from "../../app/api/entities/movie";
import type { TVShow } from "../../app/api/entities/TVShow";

export interface DiscoverData {
  movies: Movie[];
  shows: TVShow[];
}

export const useDiscover = () => {
  const [discoverData, setDiscoverData] = useState<DiscoverData>({ movies: [], shows: [] });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchInitialData();
    }
  }, [searchQuery]);

  const fetchInitialData = async () => {
    setIsSearching(true);
    setError(null);
    try {
      const data = await fetchDiscoverData();
      setDiscoverData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load initial data.");
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
    setError(null);
    try {
      const data = await searchMoviesAndShows(query);
      setDiscoverData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to perform search.");
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
