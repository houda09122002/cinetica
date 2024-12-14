"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useThemeToggle } from "../../app/hooks/useThemeToggle";
import { Search } from "lucide-react";
import { useSearch } from "../../app/hooks/useSearch";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Image from "next/image";

interface MainLayoutProps {
  children: ReactNode;
  title: string; // Nouvelle prop pour le titre
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const { theme, mounted } = useThemeToggle();
  const { query, setQuery, handleSearch, isLoading, results } = useSearch();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
        <header className="p-4 border-b flex items-center justify-between">
          {/* Titre dynamique */}
          <h1 className="text-xl font-bold">{title}</h1>

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
        </header>

        {/* Contenu principal */}
        <main className="p-8">
          {query && results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((item: any) => (
                <Card
                  key={item.id}
                  className="overflow-hidden cursor-pointer transition-all hover:scale-105"
                >
                  <div className="aspect-[2/3] relative">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{item.title || item.name}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>
                        {item.release_date || item.first_air_date || "Date inconnue"}
                      </span>
                      <Badge variant="secondary">
                        {item.vote_average ? item.vote_average.toFixed(1) : "N/A"} ★
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center text-muted-foreground">No results found</div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
