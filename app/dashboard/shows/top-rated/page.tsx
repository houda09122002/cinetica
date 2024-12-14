"use client";

import { useTopRatedShows } from "../../../hooks/useTopRatedShows";
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

export default function TopRatedShowsPage() {
  const { shows, searchQuery, setSearchQuery, handleSearch, isLoading } =
    useTopRatedShows();
  const [selectedShow, setSelectedShow] = useState(null);

  return (
    <MainLayout title="Top Rated TV Shows">

    <main className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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
              <CardTitle className="text-lg">{show.name}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>{formatDate(show.first_air_date)}</span>
                <Badge variant="secondary">{show.vote_average.toFixed(1)} ★</Badge>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <MediaDialog
        isOpen={!!selectedShow}
        onOpenChange={(open) => !open && setSelectedShow(null)}
        media={selectedShow}
        isMovie={false}
      />
    </main>
          
    </MainLayout>
  );
}
