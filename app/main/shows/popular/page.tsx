"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState, useEffect, Suspense } from "react"
import type { TVShow } from "@/app/api/entities/TVShow"

export default function OnTheAirShowsPage() {
  const [shows, setShows] = useState<TVShow[]>([])

  useEffect(() => {
    fetchOnTheAirShows()
  }, [])

  const fetchOnTheAirShows = async () => {
    try {
      const response = await fetch('/api/shows/popular')
      const data = await response.json()
      setShows(data.results)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shows.map((show) => (
          <Card key={show.id} className="overflow-hidden">
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
                  {format(
                    new Date(show.first_air_date),
                    'd MMMM yyyy',
                    { locale: fr }
                  )}
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
  )
}
