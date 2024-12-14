export async function fetchNowPlayingMovies() {
  const response = await fetch("/api/movies/now-playing");
  if (!response.ok) {
    throw new Error("Failed to fetch now-playing movies");
  }
  const data = await response.json();
  return data.results || [];
}
export async function fetchPopularMovies() {
  const response = await fetch("/api/movies/popular");
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return data.results || [];
}
export async function fetchTopRatedMovies() {
  const response = await fetch("/api/movies/top-rated");
  if (!response.ok) {
    throw new Error("Failed to fetch top-rated movies");
  }
  const data = await response.json();
  return data.results || [];
}
export async function searchMovies(query: string) {
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  const data = await response.json();
  return data.movies || [];
}
