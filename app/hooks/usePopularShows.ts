import { useState, useEffect } from "react";
import { fetchPopularShows, searchShows } from "../../app/repositories/tvShowRepository";
import { TVShow } from "../api/entities/TVShow";
export const usePopularShows = () => {
  const [shows, setShows] =useState<TVShow[]>([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPopularShows();
  }, []);

  const loadPopularShows = async () => {
    setIsLoading(true);
    try {
      const popularShows = await fetchPopularShows();
      setShows(popularShows);
      setOriginalShows(popularShows);
    } catch (error) {
      console.error("Error loading popular shows:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShows(originalShows);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchShows(searchQuery);
      setShows(searchResults);
    } catch (error) {
      console.error("Error searching shows:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    shows,
    searchQuery,
    setSearchQuery,
    handleSearch,
    isLoading,
  };
};
