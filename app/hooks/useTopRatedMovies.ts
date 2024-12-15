import { useState, useEffect } from "react";
import { fetchTopRatedMovies, searchMovies } from "../../app/repositories/movieRepository";
import { Movie } from "../api/entities/movie";
export const useTopRatedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTopRatedMovies();
  }, []);

  const loadTopRatedMovies = async () => {
    setIsLoading(true);
    try {
      const topRatedMovies = await fetchTopRatedMovies();
      setMovies(topRatedMovies);
      setOriginalMovies(topRatedMovies);
    } catch (error) {
      console.error("Error loading top-rated movies:", error);
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
