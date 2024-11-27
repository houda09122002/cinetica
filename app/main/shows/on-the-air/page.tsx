"use client"

import { useState, useEffect } from "react"
import { TVShow } from "@/app/api/entities/TVShow"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Image from "next/image"
import { Suspense } from "react"
import { MediaDialog } from "@/components/ui/media-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const formatDate = (date: string | null | undefined) => {
  if (!date) return "Date inconnue"
  try {
    return format(new Date(date), 'MMM d, yyyy')
  } catch (error) {
    return "Date invalide"
  }
}

export default function OnTheAirShowsPage() {
  const [shows, setShows] = useState<TVShow[]>([])
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [originalShows, setOriginalShows] = useState<TVShow[]>([])

  useEffect(() => {
    fetchOnTheAirShows()
  }, [])

  const fetchOnTheAirShows = async () => {
    try {
      const response = await fetch('/api/shows/on-the-air')
      const data = await response.json()
      setShows(data.results || [])
      setOriginalShows(data.results || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setShows(originalShows)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setShows(data.shows || [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {searchQuery ? 'Search Results' : 'TV Shows On The Air'}
          </h1>
          <form onSubmit={handleSearch} className="relative w-72">
            <Search className={cn(
              "absolute left-2 top-2.5 h-4 w-4",
              isSearching ? "animate-spin" : "text-muted-foreground"
            )} />
            <Input
              placeholder="Search TV shows..."
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
        {shows.length === 0 && searchQuery && (
          <div className="text-center text-muted-foreground">
            No results found for "{searchQuery}"
          </div>
        )}

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
                  <span>{formatDate(show.first_air_date)}</span>
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
    </div>
  )
}