"use client";

import { useState, useEffect, ReactNode } from "react";
import { useDiscover } from "../../app/hooks/useDiscover";
import { useThemeToggle } from "../../app/hooks/useThemeToggle";
import { useSearch } from "../../app/hooks/useSearch";
import Sidebar from "@/components/layout/Sidebar";
import { MediaCarousel } from "@/components/ui/media-carousel";
import { MediaDialog } from "@/components/ui/media-dialog";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation"; // Pour la navigation
import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
export default function MainPage() {
  const { theme, toggleTheme, mounted } = useThemeToggle();
  const { query, setQuery, handleSearch, isLoading } = useSearch();
  const { discoverData } = useDiscover();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const movieScrollRef = useRef<HTMLDivElement>(null);
  const tvShowScrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Assurez-vous que le rendu se fait côté client
  if (!mounted) return null;

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Header */}
        <header className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold">Discover</h1>

          {/* SearchBar */}
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 rounded-lg w-48"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className={isLoading ? "animate-spin" : ""}
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>

          {/* Dark Mode Switch */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Dark Mode</span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="bg-gray-500"
            />
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-gray-500" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        </header>

        {/* Main Content (Media Carousel) */}
        <main className="p-8">
          {discoverData && (
            <div className="space-y-12">
              {/* Movies Carousel */}
              {discoverData.movies.length > 0 && (
                <MediaCarousel
                  title="Movies"
                  items={discoverData.movies}
                  scrollRef={movieScrollRef}
                  onItemClick={(item) => setSelectedMedia(item)}
                  isMovie={true}
                />
              )}
              {/* TV Shows Carousel */}
              {discoverData.shows.length > 0 && (
                <MediaCarousel
                  title="TV Shows"
                  items={discoverData.shows}
                  scrollRef={tvShowScrollRef}
                  onItemClick={(item) => setSelectedMedia(item)}
                  isMovie={false}
                />
              )}
            </div>
          )}

          {/* Media Dialog */}
          <MediaDialog
            isOpen={!!selectedMedia}
            onOpenChange={(open) => !open && setSelectedMedia(null)}
            media={selectedMedia}
            isMovie={!!selectedMedia?.title}
          />
        </main>
      </div>
    </div>
  );
}
