"use client"

import { usePathname } from 'next/navigation'

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
} 