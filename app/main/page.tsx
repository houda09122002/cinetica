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
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { MediaDialog } from "@/components/ui/media-dialog"
import { cn } from "@/lib/utils"

interface DiscoverData {
  movies: Movie[];
  shows: TVShow[];
}

const formatDate = (date: string | null | undefined, isMovie: boolean) => {
  if (!date) return "Date inconnue"
  try {
    return format(new Date(date), 'dd/MM/yyyy', { locale: fr })
  } catch (error) {
    return "Date invalide"
  }
}

export default function MainPage() {
  const [discoverData, setDiscoverData] = useState<DiscoverData | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const movieScrollRef = useRef<HTMLDivElement>(null)
  const tvShowScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchDiscoverData()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      fetchDiscoverData()
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      if (data.movies && data.shows) {
        setDiscoverData(data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const fetchDiscoverData = async () => {
    try {
      const response = await fetch('/api/discover')
      const data = await response.json()
      setDiscoverData(data)
    } catch (error) {
      console.error('Erreur:', error)
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
    onItemClick
  }: { 
    title: string, 
    items: Movie[] | TVShow[], 
    scrollRef: React.RefObject<HTMLDivElement>,
    onItemClick: (item: Movie | TVShow) => void
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
                <Card 
                  key={item.id} 
                  className="w-[300px] flex-shrink-0 overflow-hidden cursor-pointer transition-all hover:scale-105"
                  onClick={() => onItemClick(item)}
                >
                  <div className="aspect-[2/3] relative">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>
                        {formatDate(
                          item.release_date,
                          true
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
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {searchQuery ? 'Search Results' : 'Discover'}
          </h1>
          <form onSubmit={handleSearch} className="relative w-72">
            <Search className={cn(
              "absolute left-2 top-2.5 h-4 w-4",
              isSearching ? "animate-spin" : "text-muted-foreground"
            )} />
            <Input
              placeholder="Search movies & TV shows..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm"
              className="absolute right-0 top-0 h-full"
            >
              Search
            </Button>
          </form>
        </div>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        {discoverData && (
          <div className="space-y-12">
            {/* Message si aucun résultat */}
            {searchQuery && 
             discoverData.movies.length === 0 && 
             discoverData.shows.length === 0 && (
              <div className="text-center text-muted-foreground">
                No results found for "{searchQuery}"
              </div>
            )}

            {/* Résultats */}
            {discoverData.movies.length > 0 && (
              <MediaCarousel 
                title={searchQuery ? "Movies Results" : "Movies"} 
                items={discoverData.movies} 
                scrollRef={movieScrollRef}
                onItemClick={(item) => setSelectedMovie(item as Movie)}
              />
            )}
            {discoverData.shows.length > 0 && (
              <MediaCarousel 
                title={searchQuery ? "TV Shows Results" : "TV Shows"}
                items={discoverData.shows}
                scrollRef={tvShowScrollRef}
                onItemClick={(item) => setSelectedShow(item as TVShow)}
              />
            )}
          </div>
        )}
      </Suspense>

      {/* Dialogs */}
      <MediaDialog
        isOpen={!!selectedMovie}
        onOpenChange={(open) => !open && setSelectedMovie(null)}
        media={selectedMovie}
        isMovie={true}
      />
      <MediaDialog
        isOpen={!!selectedShow}
        onOpenChange={(open) => !open && setSelectedShow(null)}
        media={selectedShow}
        isMovie={false}
      />
    </div>
  )
}
