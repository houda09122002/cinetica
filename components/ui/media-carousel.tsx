"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { TVShow } from "../../app/api/entities/TVShow";
import type { Movie } from "../../app/api/entities/movie";
import { Suspense, useRef, useState } from "react";

const formatDate = (date: string | null | undefined) => {
  if (!date) return "Date inconnue";
  return format(new Date(date), "dd/MM/yyyy", { locale: fr });
};

export const MediaCarousel = ({
  title,
  items,
  scrollRef,
  onItemClick,
  isMovie = true,
}: {
  title: string;
  items: any[];
  scrollRef: React.RefObject<HTMLDivElement>;
  onItemClick: (item: any) => void;
  isMovie?: boolean;
}) => {
  if (!items || items.length === 0) return null;

  // Fonction de défilement
  const scroll = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement>) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (ref.current) {
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left", scrollRef)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div ref={scrollRef} className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 w-max">
            {items.map((item) => (
              <Card
                key={item.id}
                className="w-[300px] flex-shrink-0 overflow-hidden cursor-pointer transition-all hover:scale-105"
                onClick={() => onItemClick(item)}
              >
                <div className="aspect-[2/3] relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={isMovie ? (item as Movie).title : (item as TVShow).name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">
                    {isMovie ? (item as Movie).title : (item as TVShow).name}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>
                      {formatDate(
                        isMovie ? (item as Movie).release_date : (item as TVShow).first_air_date
                      )}
                    </span>
                    <Badge variant="secondary">{item.vote_average.toFixed(1)} ★</Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right", scrollRef)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
