"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import type { SearchResult } from "../../app/hooks/useSearch";

interface SearchResultsProps {
  query: string;
  onItemClick: (item: SearchResult) => void;
}

export default function SearchResults({ query, onItemClick }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.movies.concat(data.shows));
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading...</div>;
  }

  if (results.length === 0) {
    return <div className="text-center text-muted-foreground">No results found</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {results.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden cursor-pointer transition-all hover:scale-90"
          onClick={() => onItemClick(item)} 
        >
          <div className="aspect-[2/3] relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name || "Image indisponible"}
            fill
            className="object-cover"
          />

          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{item.title || item.name}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <span>
                {item.release_date || item.first_air_date || "Date inconnue"}
              </span>
              <Badge variant="secondary">
                {item.vote_average ? item.vote_average.toFixed(1) : "N/A"} ★
              </Badge>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
