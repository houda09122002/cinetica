// app/main/page.tsx

import { MovieCard } from "../../components/ui/movie-card";
import { Suspense } from "react";

export default function MainPage() {
  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Découvrez</h1>
        <div className="flex gap-4">
          {/* Vous pouvez ajouter des filtres ou des options ici */}
        </div>
      </header>

      {/* Grille de films/séries */}
      <Suspense fallback={<div>Chargement...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Exemple de carte de film/série - à répéter selon vos données */}
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </Suspense>
    </div>
  );
}
