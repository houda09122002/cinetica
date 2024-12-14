import { useState, useEffect } from "react";
import { fetchTopRatedShows, searchShows } from "../../app/repositories/tvShowRepository";

export const useTopRatedShows = () => {
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTopRatedShows();
  }, []);

  const loadTopRatedShows = async () => {
    setIsLoading(true);
    try {
      const topRatedShows = await fetchTopRatedShows();
      setShows(topRatedShows);
      setOriginalShows(topRatedShows);
    } catch (error) {
      console.error("Error loading top-rated shows:", error);
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
