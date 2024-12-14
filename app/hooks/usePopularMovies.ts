import { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies } from "../../app/repositories/movieRepository";

export const usePopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setIsLoading(true);
    try {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
      setOriginalMovies(popularMovies);
    } catch (error) {
      console.error("Error loading popular movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMovies(originalMovies);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    movies,
    searchQuery,
    setSearchQuery,
    handleSearch,
    isLoading,
  };
};
