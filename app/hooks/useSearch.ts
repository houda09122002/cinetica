import { useState } from "react";
import { searchMoviesAndShows } from "../repositories/searchRepository";
export interface SearchResult {
  id: number;
  title?: string; 
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}


export const useSearch = () => {
  const [query, setQuery] = useState<string>(""); 
  const [results, setResults] = useState<SearchResult[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  const handleSearch = async (customQuery?: string) => {
    const searchQuery = customQuery ?? query; 
    if (!searchQuery.trim()) return; 

    setIsLoading(true);
    setError(null); 

    try {
      const data = await searchMoviesAndShows(searchQuery); 
      const combinedResults: SearchResult[] = [...data.movies, ...data.shows]; 
      setResults(combinedResults); 
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch results. Please try again."); 
    } finally {
      setIsLoading(false);
    }
  };

  return { query, setQuery, handleSearch, isLoading, results, error }; 
};
