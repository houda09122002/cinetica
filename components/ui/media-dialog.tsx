"use client"

import { Movie } from "@/app/api/entities/movie"
import { TVShow } from "@/app/api/entities/TVShow"
import { format } from "date-fns"
import Image from "next/image"
import { Badge } from "./badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Dot } from "lucide-react"
import { GENRES_MAP , TV_GENRES_MAP} from "@/app/constants/genres"


interface MediaDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  media: Movie | TVShow | null
  isMovie?: boolean
}

export function MediaDialog({ isOpen, onOpenChange, media, isMovie = true }: MediaDialogProps) {
  if (!media) return null

  const getGenreName = (genreId: number) => {
    const genresMap = isMovie ? GENRES_MAP : TV_GENRES_MAP
    return genresMap[genreId] || "Unknown"
  }

  const getDate = () => {
    const date = isMovie 
      ? (media as Movie).release_date 
      : (media as TVShow).first_air_date
    return new Date(date)
  }

  const getTitle = () => {
    return isMovie ? (media as Movie).title : (media as TVShow).name
  }

  const getOriginalTitle = () => {
    return isMovie ? (media as Movie).original_title : (media as TVShow).original_name
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90">
        <DialogHeader className="relative h-[300px] sm:h-[400px] overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
            alt={getTitle()}
            fill
            className="object-cover"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                {media.vote_average.toFixed(1)} ★
              </Badge>
              <Dot className="w-4 h-4 text-white/60" />
              <span>{format(getDate(), 'yyyy')}</span>
              <Dot className="w-4 h-4 text-white/60" />
              <span>{media.original_language.toUpperCase()}</span>
              {!isMovie && (media as TVShow).origin_country && (
                <>
                  <Dot className="w-4 h-4 text-white/60" />
                  <span>{(media as TVShow).origin_country.join(', ')}</span>
                </>
              )}
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
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

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-white/60">
                {isMovie ? "Release Date" : "First Air Date"}
              </span>
              <span className="text-sm text-white">
                {format(getDate(), 'MMM d, yyyy')}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-white/60">Vote Count</span>
              <span className="text-sm text-white">{media.vote_count.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-white/60">Popularity</span>
              <span className="text-sm text-white">{media.popularity.toFixed(0)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
            <p className="text-base leading-relaxed text-white/80">
              {media.overview}
            </p>
          </div>

          <div className="text-sm text-white/60">
            Original Title: <span className="text-white">{getOriginalTitle()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}