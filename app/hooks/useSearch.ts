import { useState } from "react";
import { searchMoviesAndShows } from "../repositories/searchRepository";

// Définir le type pour les résultats
export interface SearchResult {
  id: number;
  title?: string; // Pour les films
  name?: string; // Pour les séries
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}


export const useSearch = () => {
  const [query, setQuery] = useState<string>(""); // Recherche courante
  const [results, setResults] = useState<SearchResult[]>([]); // Résultats de recherche
  const [isLoading, setIsLoading] = useState<boolean>(false); // État de chargement
  const [error, setError] = useState<string | null>(null); // Pour capturer les erreurs

  // Fonction de recherche avec option de query dynamique
  const handleSearch = async (customQuery?: string) => {
    const searchQuery = customQuery ?? query; // Utiliser customQuery si fourni, sinon query
    if (!searchQuery.trim()) return; // Empêcher les recherches vides

    setIsLoading(true);
    setError(null); // Réinitialiser les erreurs avant une nouvelle recherche

    try {
      const data = await searchMoviesAndShows(searchQuery); // Appeler l'API
      const combinedResults: SearchResult[] = [...data.movies, ...data.shows]; // Combiner les résultats
      setResults(combinedResults); // Mettre à jour les résultats
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch results. Please try again."); // Capturer l'erreur
    } finally {
      setIsLoading(false); // Arrêter l'état de chargement
    }
  };

  return { query, setQuery, handleSearch, isLoading, results, error }; // Retourner les valeurs nécessaires
};
