"use client";

import { Movie } from "../../app/api/entities/movie";
import { TVShow } from "../../app/api/entities/TVShow";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "./badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../components/ui/dialog";
import { Dot } from "lucide-react";
import { GENRES_MAP, TV_GENRES_MAP } from "../../app/constants/genres";

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface MediaDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  media: (Movie | TVShow) & { actors?: Actor[] } | null;
  isMovie?: boolean;
}

export function MediaDialog({
  isOpen,
  onOpenChange,
  media,
  isMovie = true,
}: MediaDialogProps) {
  if (!media) return null;

  const getGenreName = (genreId: number) => {
    const genresMap = isMovie ? GENRES_MAP : TV_GENRES_MAP;
    return genresMap[genreId] || "Unknown";
  };

  const getDate = () => {
    const date = isMovie
      ? (media as Movie).release_date
      : (media as TVShow).first_air_date;
    return new Date(date);
  };

  const getTitle = () => {
    return isMovie ? (media as Movie).title : (media as TVShow).name;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* Carte principale */}
      <DialogContent className="h-screen max-h-screen overflow-y-auto p-0 bg-black/90 rounded-lg max-w-6xl mx-auto">
        {/* En-tête */}
        <DialogHeader className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
            alt={getTitle()}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-white/80 text-sm font-medium mb-2">
              <Badge
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              >
                {media.vote_average.toFixed(1)} ★
              </Badge>
              <Dot className="hidden sm:inline w-4 h-4 text-white/60" />
              <span>{format(getDate(), "yyyy")}</span>
              <Dot className="hidden sm:inline w-4 h-4 text-white/60" />
              <span>{media.original_language.toUpperCase()}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {getTitle()}
            </h2>

            <div className="flex flex-wrap gap-2 mt-3">
              {media.genre_ids.map((genreId) => (
                <Badge
                  key={genreId}
                  variant="outline"
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border-white/10 text-white/80"
                >
                  {getGenreName(genreId)}
                </Badge>
              ))}
            </div>
          </div>
        </DialogHeader>

        {/* Contenu Principal */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Synopsis */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              {media.overview}
            </p>
          </div>

          {/* Affichage des Acteurs */}
          {media.actors && media.actors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Actors</h3>
              {/* Grille dynamique */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.actors.map((actor: Actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-lg"
                  >
                    {/* Image de l'acteur */}
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/placeholder.jpg"
                      }
                      alt={actor.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />

                    {/* Informations de l'acteur */}
                    <div className="text-center">
                      <h4 className="text-sm font-semibold text-white">{actor.name}</h4>
                      <p className="text-xs text-white/80">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
