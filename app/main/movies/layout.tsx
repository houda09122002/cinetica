"use client"

import { usePathname } from 'next/navigation'

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div>
      {children}
    </div>
  )
} 