"use client"

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
    <div>
      {children}
    </div>
  )
} 