"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState, useEffect, Suspense } from "react"
import type { Movie } from "@/app/api/entities/movie"

export default function NowPlayingPage() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    fetchNowPlaying()
  }, [])

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('/api/movies/now-playing')
      const data = await response.json()
      setMovies(data.results || [])
    } catch (error) {
      console.error('Erreur lors de la récupération des films:', error)
    }
  }

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden">
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
                <span>
                  {format(
                    new Date(movie.release_date),
                    'd MMMM yyyy',
                    { locale: fr }
                  )}
                </span>
                <Badge variant="secondary">
                  {movie.vote_average.toFixed(1)} ★
                </Badge>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Suspense>
  )
} 