"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { usePathname } from 'next/navigation'

export default function ShowsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Fonction pour obtenir le titre selon le chemin
  const getTitle = () => {
    switch (pathname) {
      case '/main/shows/on-the-air':
        return 'On The Air Shows'
      case '/main/shows/popular':
        return 'Popular Shows'
      case '/main/shows/top-rated':
        return 'Top Rated Shows'
      default:
        return 'TV Shows'
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{getTitle()}</h1>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une série..."
              className="pl-8"
            />
          </div>
        </div>
      </header>

      {children}
    </div>
  )
} 