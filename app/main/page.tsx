// app/main/page.tsx

"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Suspense, useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "../api/entities/movie"
import type { TVShow } from "../api/entities/TVShow"
import { format } from "date-fns";
import { fr } from "date-fns/locale"; // Pour la localisation française

interface DiscoverData {
  movies: Movie[];
  shows: TVShow[];
}

export default function MainPage() {
  const [discoverData, setDiscoverData] = useState<DiscoverData | null>(null)
  const movieScrollRef = useRef<HTMLDivElement>(null)
  const tvShowScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchDiscoverData()
  }, [])

  const fetchDiscoverData = async () => {
    try {
      const response = await fetch('/api/discover')
      const data = await response.json()
      console.log('Données reçues:', data)
      if (data.movies && data.shows) {
        setDiscoverData(data)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
    }
  }

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = 300
      if (direction === 'left') {
        ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  // Composant pour le carrousel
  const MediaCarousel = ({ 
    title, 
    items, 
    scrollRef,
    isMovie = true 
  }: { 
    title: string, 
    items: Movie[] | TVShow[], 
    scrollRef: React.RefObject<HTMLDivElement>,
    isMovie?: boolean 
  }) => {
    if (!items || items.length === 0) {
      return <div>Aucun contenu disponible</div>
    }

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('left', scrollRef)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div 
            ref={scrollRef}
            className="overflow-x-auto pb-4 scrollbar-hide"
          >
            <div className="flex gap-4 w-max">
              {items.map((item) => (
                <Card key={item.id} className="w-[300px] flex-shrink-0 overflow-hidden">
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
                        {format(
                          new Date(
                            isMovie ? 
                              (item as Movie).release_date : 
                              (item as TVShow).first_air_date
                          ),
                          'dd/MM/yyyy',
                          { locale: fr }
                        )}
                      </span>
                      <Badge variant="secondary">
                        {item.vote_average.toFixed(1)} ★
                      </Badge>
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
            onClick={() => scroll('right', scrollRef)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* En-tête de la page */}
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Découvrez</h1>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-8"
            />
          </div>
        </div>
      </header>

      {/* Contenu */}
      <Suspense fallback={<div>Chargement...</div>}>
        {discoverData && (
          <div className="space-y-12">
            <MediaCarousel 
              title="Films" 
              items={discoverData.movies} 
              scrollRef={movieScrollRef}
              isMovie={true}
            />
            <MediaCarousel 
              title="Séries TV" 
              items={discoverData.shows}
              scrollRef={tvShowScrollRef}
              isMovie={false}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}
