"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useThemeToggle } from "../../app/hooks/useThemeToggle";
import { Search } from "lucide-react";
import { useSearch } from "../../app/hooks/useSearch";
import { Button } from "../../components/ui/button";
import SearchResults from "../../components/layout/SearchResults";
import { MediaDialog } from "../../components/ui/media-dialog";
import type { SearchResult } from "../../app/hooks/useSearch";
import type { Movie } from "../../app/api/entities/movie";
import type { TVShow } from "../../app/api/entities/TVShow";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}
function mapSelectedMedia(media: SearchResult | Movie | TVShow | null): Movie | TVShow | null {
  if (!media) return null;

  if ("title" in media) {
    return {
      id: media.id,
      title: media.title,
      original_title: media.title || "",
      overview: "overview" in media ? media.overview || "No description available" : "",
      release_date: "release_date" in media ? media.release_date || "" : "",
      genres: "genres" in media ? media.genres || [] : [],
      runtime: "runtime" in media ? media.runtime || 0 : 0,
      popularity: "popularity" in media ? media.popularity || 0 : 0,
      vote_average: media.vote_average,
      vote_count: "vote_count" in media ? media.vote_count || 0 : 0,
      poster_path: media.poster_path,
      backdrop_path: "backdrop_path" in media ? media.backdrop_path || null : null,
      original_language: "original_language" in media ? media.original_language || "en" : "en",
      genre_ids: "genre_ids" in media ? media.genre_ids || [] : [],
      actors: "actors" in media ? media.actors || [] : [], 
    } as Movie;
  } else if ("name" in media) {
    return {
      id: media.id,
      name: media.name,
      original_name: media.name || "",
      overview: "overview" in media ? media.overview || "No description available" : "",
      first_air_date: "first_air_date" in media ? media.first_air_date || "" : "",
      genres: "genres" in media ? media.genres || [] : [],
      origin_country: "origin_country" in media ? media.origin_country || [] : [],
      popularity: "popularity" in media ? media.popularity || 0 : 0,
      vote_average: media.vote_average,
      vote_count: "vote_count" in media ? media.vote_count || 0 : 0,
      poster_path: media.poster_path,
      backdrop_path: "backdrop_path" in media ? media.backdrop_path || null : null,
      original_language: "original_language" in media ? media.original_language || "en" : "en",
      genre_ids: "genre_ids" in media ? media.genre_ids || [] : [],
      actors: "actors" in media ? media.actors || [] : [], 
    } as TVShow;
  }

  return null;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const { theme, mounted } = useThemeToggle();
  const { query, setQuery } = useSearch();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [selectedMedia, setSelectedMedia] = useState<SearchResult | Movie | TVShow | null>(null);
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <header className="p-4 border-b flex items-center justify-between sticky top-0 z-10 bg-white dark:bg-black">
          <h1 className="text-2xl font-bold ml-4">{query ? "Search Results" : title}</h1>

          <form
            className="flex items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 rounded-lg w-48"
            />
            <Button type="submit" variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </header>

        <main className="p-8">
          {query ? (
            <SearchResults
              query={query}
              onItemClick={(item) => {
                setSelectedMedia(item);
                setIsMediaDialogOpen(true);
              }}
            />
          ) : (
            children
          )}
        </main>
      </div>

      <MediaDialog
        isOpen={isMediaDialogOpen}
        onOpenChange={(open) => setIsMediaDialogOpen(open)}
        media={mapSelectedMedia(selectedMedia)}
        isMovie={!!selectedMedia && "title" in selectedMedia}
      />
    </div>
  );
}
