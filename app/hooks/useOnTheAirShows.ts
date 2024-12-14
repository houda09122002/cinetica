import { useState, useEffect } from "react";
import { fetchOnTheAirShows, searchShows } from "../../app/repositories/tvShowRepository";

export const useOnTheAirShows = () => {
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadOnTheAirShows();
  }, []);

  const loadOnTheAirShows = async () => {
    setIsLoading(true);
    try {
      const onTheAirShows = await fetchOnTheAirShows();
      setShows(onTheAirShows);
      setOriginalShows(onTheAirShows);
    } catch (error) {
      console.error("Error loading shows on the air:", error);
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
