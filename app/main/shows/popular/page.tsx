"use client"

import { useState, useEffect } from "react"
import { TVShow } from "@/app/api/entities/TVShow"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Image from "next/image"
import { Suspense } from "react"
import { MediaDialog } from "@/components/ui/media-dialog"

export default function PopularShowsPage() {
  const [shows, setShows] = useState<TVShow[]>([])
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null)

  useEffect(() => {
    fetchPopularShows()
  }, [])

  const fetchPopularShows = async () => {
    try {
      const response = await fetch('/api/shows/popular')
      const data = await response.json()
      setShows(data.results || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
                <CardTitle className="text-lg">{show.name}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>
                    {format(new Date(show.first_air_date), 'MMM d, yyyy')}
                  </span>
                  <Badge variant="secondary">
                    {show.vote_average.toFixed(1)} ★
                  </Badge>
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
    </>
  )
}
