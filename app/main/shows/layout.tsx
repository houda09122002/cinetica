"use client"

import { usePathname } from 'next/navigation'

export default function ShowsLayout({
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