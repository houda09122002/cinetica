import { NextResponse } from "next/server";

export async function GET() {
    const fetchTVShows = async (page: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch TV shows from page ${page}`);
        }
        return response.json();
    };

    try {
        const totalPages = 5; 
        const tvShowPromises = Array.from({ length: totalPages }, (_, i) => fetchTVShows(i + 1));

        const tvShowResults = await Promise.all(tvShowPromises);
        const combinedTVShows = tvShowResults.flatMap((result) => result.results);

        return NextResponse.json({ results: combinedTVShows });
    } catch (error) {
        console.error("Error fetching TV shows:", error);
        return NextResponse.json({ error: "Failed to fetch TV shows" }, { status: 500 });
    }
}
