// src/repositories/searchRepository.ts
export const searchMoviesAndShows = async (query: string) => {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    return response.json();
  };
  