// src/dashboard/movies/popular/page.tsx
"use client";

import { usePopularMovies } from "../../../hooks/usePopularMovies";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Suspense, useState } from "react";
import { MediaDialog } from "@/components/ui/media-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const formatDate = (date: string | null | undefined) => {
  if (!date) return "Date inconnue";
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch {
    return "Date invalide";
  }
};

export default function PopularMoviesPage() {
  const {
    movies,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleSearch,
  } = usePopularMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies.</p>;

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {searchQuery ? "Search Results" : "Popular Movies"}
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
            className="relative w-72"
          >
            <Search
              className={cn(
                "absolute left-2 top-2.5 h-4 w-4",
                searchQuery ? "animate-spin" : "text-muted-foreground"
              )}
            />
            <Input
              placeholder="Search movies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full"
            >
              Search
            </Button>
          </form>
        </div>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        {movies.length === 0 && searchQuery && (
          <div className="text-center text-muted-foreground">No results found</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="overflow-hidden cursor-pointer transition-all hover:scale-105"
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
                <CardTitle>{movie.title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{formatDate(movie.release_date)}</span>
                  <Badge>{movie.vote_average.toFixed(1)} ★</Badge>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Suspense>

      <MediaDialog
        isOpen={!!selectedMovie}
        onOpenChange={(open) => !open && setSelectedMovie(null)}
        media={selectedMovie}
        isMovie={true}
      />
    </div>
  );
}
