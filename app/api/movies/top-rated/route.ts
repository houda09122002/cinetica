import { NextResponse } from "next/server";

export async function GET() {
    const fetchMovies = async (page: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch movies from page ${page}`);
        }
        return response.json();
    };

    const fetchActors = async (movieId: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch credits for movie ID: ${movieId}`);
        }
        const data = await response.json();
        return data.cast; // Retourne uniquement les acteurs
    };

    try {
        const totalPages = 5; // Limiter à 5 pages
        const moviePromises = Array.from({ length: totalPages }, (_, i) => fetchMovies(i + 1));

        const movieResults = await Promise.all(moviePromises);
        const combinedMovies = movieResults.flatMap((result) => result.results);

        // Ajouter les acteurs pour chaque film
        const movieWithActorsPromises = combinedMovies.map(async (movie) => {
            const actors = await fetchActors(movie.id); // Récupère les acteurs pour ce film
            return {
                ...movie,
                actors, // Ajoute les acteurs au film
            };
        });

        const moviesWithActors = await Promise.all(movieWithActorsPromises);

        return NextResponse.json({ results: moviesWithActors });
    } catch (error) {
        console.error("Error fetching movies or actors:", error);
        return NextResponse.json({ error: "Failed to fetch movies or actors" }, { status: 500 });
    }
}
