"use client";

import { useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDiscover } from "../../app/hooks/useDiscover";
import { MediaCarousel } from "../../components/ui/media-carousel";
import { MediaDialog } from "../../components/ui/media-dialog";
import MainLayout from "../../components/layout/MainLayout";

export default function MainPage() {
  const queryClient = new QueryClient(); 
  const { discoverData } = useDiscover();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const movieScrollRef = useRef<HTMLDivElement>(null);
  const tvShowScrollRef = useRef<HTMLDivElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout title="Discover">
        <main className="p-8 overflow-hidden">
          {discoverData && (
            <div className="space-y-12">
              {/* Movies Carousel */}
              {discoverData.movies.length > 0 && (
                <MediaCarousel
                  title="Movies"
                  items={discoverData.movies}
                  scrollRef={movieScrollRef}
                  onItemClick={(item) => setSelectedMedia(item)}
                  isMovie={true}
                />
              )}
              {/* TV Shows Carousel */}
              {discoverData.shows.length > 0 && (
                <MediaCarousel
                  title="TV Shows"
                  items={discoverData.shows}
                  scrollRef={tvShowScrollRef}
                  onItemClick={(item) => setSelectedMedia(item)}
                  isMovie={false}
                />
              )}
            </div>
          )}

          {/* Media Dialog */}
          <MediaDialog
            isOpen={!!selectedMedia}
            onOpenChange={(open) => !open && setSelectedMedia(null)}
            media={selectedMedia}
            isMovie={!!selectedMedia?.title}
          />
        </main>
      </MainLayout>
    </QueryClientProvider>
  );
}
