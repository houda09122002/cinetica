"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Clapperboard, 
  Compass, 
  Film, 
  Users, 
  Star, 
  Tv, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Trophy,
  TrendingUp
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Handler pour la déconnexion
  const handleLogout = () => {
    // Ici vous pouvez ajouter la logique de déconnexion (supprimer le token, etc.)
    router.push("/") // Redirige vers la page d'accueil
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-card border-r transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Bouton pour réduire/agrandir */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-6 h-8 w-8 rounded-full bg-background border"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 
            <ChevronRight className="h-4 w-4" /> : 
            <ChevronLeft className="h-4 w-4" />
          }
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
            {/* Navigation principale */}
            <div>
              <Button variant="ghost" className={cn(
                "w-full justify-start gap-2",
                isCollapsed && "px-2"
              )} onClick={() => router.push('/main')}>
                <Compass className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>Discover</span>}
              </Button>
            </div>

            {/* Movies Section */}
            <div>
              {!isCollapsed && <p className="text-sm text-muted-foreground mb-2">Movies</p>}
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "px-2"
                  )}
                  onClick={() => router.push('/main/movies/now-playing')}
                >
                  <Film className="w-4 h-4" />
                  {!isCollapsed && <span>Now Playing</span>}
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "px-2"
                  )}
                  onClick={() => router.push('/main/movies/popular')}
                >
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Popular</span>}
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "px-2"
                  )}
                  onClick={() => router.push('/main/movies/top-rated')}
                >
                  <Trophy className="w-4 h-4" />
                  {!isCollapsed && <span>Top Rated</span>}
                </Button>
              </div>
            </div>

            {/* TV Shows Section */}
            <div>
              {!isCollapsed && <p className="text-sm text-muted-foreground mb-2">TV Shows</p>}
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "px-2"
                  )}
                  onClick={() => router.push('/main/shows/on-the-air')}
                >
                  <Tv className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>On the air</span>}
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "px-2"
                  )}
                  onClick={() => router.push('/main/shows/popular')}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Popular</span>}
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "px-2"
                  )}
                  onClick={() => router.push('/main/shows/top-rated')}
                >
                  <Star className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Top Rated</span>}
                </Button>
              </div>
            </div>
          </nav>
        </div>

        {/* Footer avec bouton de déconnexion */}
        <div className="p-6 border-t">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-100",
              isCollapsed && "px-2"
            )}
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Déconnexion</span>}
          </Button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className={cn(
        "transition-all duration-300",
        isCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
