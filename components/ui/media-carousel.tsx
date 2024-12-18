import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Movie } from "../../app/api/entities/movie";
import type { TVShow } from "../../app/api/entities/TVShow";

type MediaItem = Movie | TVShow;

const formatDate = (date: string | null | undefined) => {
  if (!date) return "Date inconnue";
  return format(new Date(date), "dd/MM/yyyy", { locale: fr });
};

export const MediaCarousel = ({
  title,
  items,
  scrollRef,
  onItemClick,
  isMovie,
}: {
  title: string;
  items: MediaItem[];
  scrollRef: React.RefObject<HTMLDivElement>;
  onItemClick: (item: MediaItem) => void;
  isMovie: boolean;
}) => {
  if (!items || items.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold px-4 sm:px-0">{title}</h2>
      <div className="relative group">
        {/* Bouton pour défiler à gauche */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Conteneur du carrousel */}
        <div
          ref={scrollRef}
          className="carousel-container overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-0"
        >
          <div className="flex gap-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[240px] cursor-pointer transition-transform hover:scale-95"
                onClick={() => onItemClick(item)}
              >
                <div className="aspect-[2/3] relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={
                      isMovie
                        ? (item as Movie).title || "Film Image"
                        : (item as TVShow).name || "Show Image"
                    }
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm md:text-base truncate">
                    {isMovie ? (item as Movie).title : (item as TVShow).name}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between text-xs md:text-sm">
                    <span>
                      {isMovie
                        ? formatDate((item as Movie).release_date)
                        : formatDate((item as TVShow).first_air_date)}
                    </span>
                    <Badge variant="secondary">{item.vote_average.toFixed(1)} ★</Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Bouton pour défiler à droite */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
