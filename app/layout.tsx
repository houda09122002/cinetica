'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "./globals.css"; // Fichier pour les styles globaux

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="transition-colors bg-background text-foreground">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
