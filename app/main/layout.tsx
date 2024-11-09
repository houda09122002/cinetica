"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Clapperboard, Compass, Film, Users, Star, Tv, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-card border-r transition-all duration-300",
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

        <div className="p-6">
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
              )}>
                <Compass className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>Discover</span>}
              </Button>
            </div>

            {/* Movies Section */}
            <div>
              {!isCollapsed && <p className="text-sm text-muted-foreground mb-2">Movies</p>}
              <div className="space-y-1">
                <Button variant="ghost" className={cn(
                  "w-full justify-start gap-2",
                  isCollapsed && "px-2"
                )}>
                  <Film className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Now playing</span>}
                </Button>
                <Button variant="ghost" className={cn(
                  "w-full justify-start gap-2",
                  isCollapsed && "px-2"
                )}>
                  <Users className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Popular</span>}
                </Button>
                <Button variant="ghost" className={cn(
                  "w-full justify-start gap-2",
                  isCollapsed && "px-2"
                )}>
                  <Star className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Top Rated</span>}
                </Button>
              </div>
            </div>

            {/* TV Shows Section */}
            <div>
              {!isCollapsed && <p className="text-sm text-muted-foreground mb-2">TV Shows</p>}
              <div className="space-y-1">
                <Button variant="ghost" className={cn(
                  "w-full justify-start gap-2",
                  isCollapsed && "px-2"
                )}>
                  <Tv className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>On the air</span>}
                </Button>
                <Button variant="ghost" className={cn(
                  "w-full justify-start gap-2",
                  isCollapsed && "px-2"
                )}>
                  <Users className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Popular</span>}
                </Button>
                <Button variant="ghost" className={cn(
                  "w-full justify-start gap-2",
                  isCollapsed && "px-2"
                )}>
                  <Star className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>Top Rated</span>}
                </Button>
              </div>
            </div>
          </nav>
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
