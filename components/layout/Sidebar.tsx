"use client";

import { cn } from "../../lib/utils";
import {
  Clapperboard,
  Compass,
  Film,
  Users,
  Star,
  Tv,
  ChevronLeft,
  ChevronRight,
  Trophy,
  TrendingUp,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../app/hooks/useAuth";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { useThemeToggle } from "../../app/hooks/useThemeToggle"; 
import { Switch } from "../../components/ui/switch"; 

export default function Sidebar({
  isCollapsed,
  toggleCollapse,
}: {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}) {
  const { handleLogout } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme, setTheme } = useThemeToggle();

  const handleLogoutAndSwitchTheme = () => {
    // Basculer en mode clair avant de se déconnecter
    if (theme === "dark") {
      setTheme("light");
    }

    // Effectuer la déconnexion
    handleLogout();
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Bouton pour réduire ou élargir la sidebar */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 h-8 w-8 rounded-full bg-background border"
        onClick={toggleCollapse}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex-1 p-6">
        {/* Logo */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2">
            <Clapperboard className="w-5 h-5" />
            {!isCollapsed && <span className="text-xl font-bold">Cinetica</span>}
          </h2>
        </div>

        {/* Menu principal */}
        <nav className="space-y-6">
          <MenuItem
            icon={<Compass className="w-4 h-4 shrink-0" />}
            label="Discover"
            collapsed={isCollapsed}
            onClick={() => router.push("/dashboard")}
          />

          {/* Section des films */}
          {!isCollapsed && (
            <p className="text-sm text-muted-foreground mb-2">Movies</p>
          )}
          <MenuItem
            icon={<Film className="w-4 h-4 shrink-0" />}
            label="Now Playing"
            collapsed={isCollapsed}
            onClick={() => router.push("/dashboard/movies/now-playing")}
          />
          <MenuItem
            icon={<TrendingUp className="w-4 h-4 shrink-0" />}
            label="Popular"
            collapsed={isCollapsed}
            onClick={() => router.push("/dashboard/movies/popular")}
          />
          <MenuItem
            icon={<Trophy className="w-4 h-4 shrink-0" />}
            label="Top Rated"
            collapsed={isCollapsed}
            onClick={() => router.push("/dashboard/movies/top-rated")}
          />

          {/* Section des séries TV */}
          {!isCollapsed && (
            <p className="text-sm text-muted-foreground mb-2">TV Shows</p>
          )}
          <MenuItem
            icon={<Tv className="w-4 h-4 shrink-0" />}
            label="On the Air"
            collapsed={isCollapsed}
            onClick={() => router.push("/dashboard/shows/on-the-air")}
          />
          <MenuItem
            icon={<Users className="w-4 h-4 shrink-0" />}
            label="Popular"
            collapsed={isCollapsed}
            onClick={() => router.push("/dashboard/shows/popular")}
          />
          <MenuItem
            icon={<Star className="w-4 h-4 shrink-0" />}
            label="Top Rated"
            collapsed={isCollapsed}
            onClick={() => router.push("/dashboard/shows/top-rated")}
          />
        </nav>
      </div>

      <div className="p-6 border-t space-y-4">
        {/* Dark Mode Toggle */}
        <div
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && <span className="text-sm">Dark Mode</span>}
          <div className="flex items-center gap-2">
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
        {/* Bouton de déconnexion */}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20",
            isCollapsed && "px-2"
          )}
          onClick={handleLogoutAndSwitchTheme}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Déconnexion</span>}
        </Button>
      </div>
    </aside>
  );
}
