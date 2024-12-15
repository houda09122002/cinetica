import { useState, useEffect } from "react";
import { fetchNowPlayingMovies, searchMovies } from "../../app/repositories/movieRepository";
import { Movie } from "../api/entities/movie";
export const useNowPlayingMovies = () => {
  const [movies, setMovies] =  useState<Movie[]>([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNowPlayingMovies();
  }, []);

  const loadNowPlayingMovies = async () => {
    try {
      setIsLoading(true);
      const nowPlayingMovies = await fetchNowPlayingMovies();
      setMovies(nowPlayingMovies);
      setOriginalMovies(nowPlayingMovies);
    } catch (error) {
      console.error("Error loading now-playing movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMovies(originalMovies);
      return;
    }

    try {
      setIsLoading(true);
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
