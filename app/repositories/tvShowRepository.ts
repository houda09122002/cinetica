export async function fetchOnTheAirShows() {
  const response = await fetch("/api/shows/on-the-air");
  if (!response.ok) {
    throw new Error("Failed to fetch shows on the air");
  }
  const data = await response.json();
  return data.results || [];
}
export async function fetchPopularShows() {
  const response = await fetch("/api/shows/popular");
  if (!response.ok) {
    throw new Error("Failed to fetch popular shows");
  }
  const data = await response.json();
  return data.results || [];
}
export async function fetchTopRatedShows() {
  const response = await fetch("/api/shows/top-rated");
  if (!response.ok) {
    throw new Error("Failed to fetch top-rated shows");
  }
  const data = await response.json();
  return data.results || [];
}
export async function searchShows(query: string) {
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Failed to search TV shows");
  }
  const data = await response.json();
  return data.shows || [];
}
