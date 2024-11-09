"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { usePathname } from 'next/navigation'

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Fonction pour obtenir le titre selon le chemin
  const getTitle = () => {
    switch (pathname) {
      case '/main/movies/now-playing':
        return 'Now Playing Movies'
      case '/main/movies/popular':
        return 'Popular Movies'
      case '/main/movies/top-rated':
        return 'Top Rated Movies'
      default:
        return 'Movies'
    }
  }

  return (
    <div>
      {children}
    </div>
  )
} 