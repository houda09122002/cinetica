"use client";

import { useTopRatedMovies } from "../../../hooks/useTopRatedMovies";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { MediaDialog } from "../../../../components/ui/media-dialog";
import MainLayout from "../../../../components/layout/MainLayout";
const formatDate = (date: string | null | undefined) => {
  if (!date) return "Date inconnue";
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch (error) {
    console.error("Error:", error);
    return "Date invalide";
  }
};

export default function TopRatedMoviesPage() {
  const { movies } =
    useTopRatedMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <MainLayout title="Top Rated Movies">
    <main className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            className="overflow-hidden cursor-pointer transition-all hover:scale-90"
            onClick={() => setSelectedMovie(movie)}
          >
            <div className="aspect-[2/3] relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{movie.title}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>{formatDate(movie.release_date)}</span>
                <Badge variant="secondary">{movie.vote_average.toFixed(1)} ★</Badge>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <MediaDialog
        isOpen={!!selectedMovie}
        onOpenChange={(open) => !open && setSelectedMovie(null)}
        media={selectedMovie}
        isMovie={true}
      />
    </main>
    </MainLayout>
  );
}
