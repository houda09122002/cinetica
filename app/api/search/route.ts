import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    try {
        // Recherche de films
        const movieResponse = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&language=en-US&page=1`
        );
        const movieData = await movieResponse.json();

        // Recherche de séries TV
        const tvResponse = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${query}&language=en-US&page=1`
        );
        const tvData = await tvResponse.json();

        return NextResponse.json({
            movies: movieData.results,
            shows: tvData.results
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
    }
} 