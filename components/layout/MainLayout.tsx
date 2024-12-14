"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useThemeToggle } from "../../app/hooks/useThemeToggle";
import { Search } from "lucide-react";
import { useSearch } from "../../app/hooks/useSearch";
import { Button } from "../../components/ui/button";
import SearchResults from "../../components/layout/SearchResults";
import { MediaDialog } from "../../components/ui/media-dialog";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const { theme, mounted } = useThemeToggle();
  const { query, setQuery, handleSearch, isLoading, results } = useSearch();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // État pour le média sélectionné
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  if (!mounted) return null;
  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
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
        <header className="p-4 border-b flex items-center justify-between sticky top-0 z-10 bg-white dark:bg-black">
          {/* Titre dynamique */}
          <h1 className="text-2xl font-bold ml-4">{query ? "Search Results" : title}</h1>

          {/* SearchBar */}
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

          {/* Contenu principal */}
          <main className="p-8">
          {query ? (
            <SearchResults query={query} onItemClick={setSelectedItem} />
          ) : (
            children
          )}
        </main>
      </div>

      {/* Dialog pour afficher les détails du média */}
      <MediaDialog
        isOpen={isMediaDialogOpen}
        onOpenChange={setIsMediaDialogOpen}
        media={selectedMedia}
        isMovie={!!selectedMedia?.title}
      />
    </div>
  );
}
