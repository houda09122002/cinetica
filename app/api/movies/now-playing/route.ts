import { NextResponse } from 'next/server';

export async function GET() {
    const fetchMovies = async (page: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch movies from page ${page}`);
        }
        return response.json();
    };

    try {
        const totalPages = 5; 
        const moviePromises = Array.from({ length: totalPages }, (_, i) => fetchMovies(i + 1));

        const movieResults = await Promise.all(moviePromises);
        const combinedMovies = movieResults.flatMap((result) => result.results);

        return NextResponse.json({ results: combinedMovies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
