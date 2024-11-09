// app/main/page.tsx

import { MovieCard } from "@/components/ui/movie-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Suspense } from "react";

export default function MainPage() {
  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Découvrez</h1>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un film..."
              className="pl-8"
            />
          </div>
        </div>
      </header>

      {/* Grille de films/séries */}
      <Suspense fallback={<div>Chargement...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </Suspense>
    </div>
  );
}
