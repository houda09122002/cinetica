import { NextResponse } from "next/server";

export async function GET() {
    const fetchMovies = async (page: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch movies from page ${page}`);
        }
        return response.json();
    };

    const fetchMovieCredits = async (movieId: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                    accept: "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch credits for movie ID ${movieId}`);
        }
        const data = await response.json();
        return data.cast; // Retourne uniquement les acteurs
    };

    try {
        const totalPages = 5; // Nombre de pages de films populaires à récupérer
        const moviePromises = Array.from({ length: totalPages }, (_, i) => fetchMovies(i + 1));

        const movieResults = await Promise.all(moviePromises);
        const combinedMovies = movieResults.flatMap((result) => result.results);

        // Récupérer les acteurs pour chaque film
        const moviesWithActors = await Promise.all(
            combinedMovies.map(async (movie) => {
                const actors = await fetchMovieCredits(movie.id);
                return {
                    id: movie.id,
                    title: movie.title,
                    actors,
                };
            })
        );

        return NextResponse.json({ results: moviesWithActors });
    } catch (error) {
        console.error("Error fetching movies and actors:", error);
        return NextResponse.json({ error: "Failed to fetch movies and actors" }, { status: 500 });
    }
}
