import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // URLs pour les films et les séries TV
        const movieEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`;
        const tvShowEndpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`;

        // Exécuter les deux requêtes simultanément
        const [movieResponse, tvShowResponse] = await Promise.all([
            fetch(movieEndpoint),
            fetch(tvShowEndpoint),
        ]);

        const movieData = await movieResponse.json();
        const tvShowData = await tvShowResponse.json();

        // Combiner les résultats dans une seule réponse
        return NextResponse.json({
            movies: movieData.results,
            shows: tvShowData.results
        });
    } catch (error) {
        console.error("Error fetching discover data:", error);
        return NextResponse.json({ error: "Failed to fetch discover data" }, { status: 500 });
    }
}