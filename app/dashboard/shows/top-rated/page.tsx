// src/dashboard/shows/top-rated/page.tsx
"use client";

import { useTopRatedShows } from "../../../hooks/useTopRatedShows";
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

export default function TopRatedShowsPage() {
  const {
    shows,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleSearch,
  } = useTopRatedShows();
  const [selectedShow, setSelectedShow] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading TV shows.</p>;

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {searchQuery ? "Search Results" : "Top Rated TV Shows"}
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
              placeholder="Search TV shows..."
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
        {shows.length === 0 && searchQuery && (
          <div className="text-center text-muted-foreground">No results found</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shows.map((show) => (
            <Card
              key={show.id}
              className="overflow-hidden cursor-pointer transition-all hover:scale-105"
              onClick={() => setSelectedShow(show)}
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle>{show.name}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{formatDate(show.first_air_date)}</span>
                  <Badge>{show.vote_average.toFixed(1)} ★</Badge>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Suspense>

      <MediaDialog
        isOpen={!!selectedShow}
        onOpenChange={(open) => !open && setSelectedShow(null)}
        media={selectedShow}
        isMovie={false}
      />
    </div>
  );
}
