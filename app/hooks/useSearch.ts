import { useState } from "react";
import { searchMoviesAndShows } from "../repositories/searchRepository";

export const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const data = await searchMoviesAndShows(query);
      const combinedResults = [...data.movies, ...data.shows];
      setResults(combinedResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { query, setQuery, handleSearch, isLoading, results };
};
