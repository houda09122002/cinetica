"use client"

import { useState, useEffect} from "react"
import { Movie } from "@/app/api/entities/movie"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Image from "next/image"
import { Suspense } from "react"
import { MediaDialog } from "@/components/ui/media-dialog"

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  useEffect(() => {
    fetchPopularMovies()
  }, [])

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch('/api/movies/popular')
      const data = await response.json()
      setMovies(data.results || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
                <CardTitle className="text-lg">{movie.title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>
                    {format(new Date(movie.release_date), 'MMM d, yyyy')}
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

      <MediaDialog
        isOpen={!!selectedMovie}
        onOpenChange={(open) => !open && setSelectedMovie(null)}
        media={selectedMovie}
        isMovie={true}
      />
    </>
  )
}
