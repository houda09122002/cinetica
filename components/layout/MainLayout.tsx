"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useThemeToggle } from "../../app/hooks/useThemeToggle";
import {Search } from "lucide-react";
import { Switch } from "@/components/ui/switch"; 
import { useSearch } from "../../app/hooks/useSearch"; 
import { Button } from "@/components/ui/button"; 
export default function MainLayout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme, mounted } = useThemeToggle();
  const { query, setQuery, handleSearch, isLoading } = useSearch();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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
        <header className="p-4 border-b flex items-center justify-between">
          {/* Titre */}
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

        </header>

        {/* Contenu principal */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
