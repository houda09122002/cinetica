import { NextResponse } from 'next/server';

export async function GET() {
    // Fonction pour récupérer les acteurs pour un film
    const fetchMovieCredits = async (movieId:number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!response.ok) {
            console.error(`Failed to fetch credits for movie ID: ${movieId}`);
            return [];
        }
        const data = await response.json();
        return data.cast.slice(0, 5); // Limite à 5 acteurs principaux
    };

    // Fonction pour récupérer les acteurs pour une série TV
    const fetchTVShowCredits = async (tvShowId:number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!response.ok) {
            console.error(`Failed to fetch credits for TV show ID: ${tvShowId}`);
            return [];
        }
        const data = await response.json();
        return data.cast.slice(0, 5); // Limite à 5 acteurs principaux
    };

    // Fonction pour récupérer les données paginées pour les films ou séries TV
    const fetchPaginatedData = async (endpoint, totalPages = 5) => {
        const pagePromises = Array.from({ length: totalPages }, (_, i) =>
            fetch(`${endpoint}&page=${i + 1}`).then((res) => res.json())
        );
        const results = await Promise.all(pagePromises);
        return results.flatMap((result) => result.results);
    };

    try {
        const movieEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`;
        const tvShowEndpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`;

        // Récupérer les 5 pages pour les films et les séries TV
        const [movies, tvShows] = await Promise.all([
            fetchPaginatedData(movieEndpoint),
            fetchPaginatedData(tvShowEndpoint),
        ]);

        // Ajouter les acteurs pour chaque film et série TV
        const moviesWithActors = await Promise.all(
            movies.map(async (movie) => ({
                ...movie,
                actors: await fetchMovieCredits(movie.id),
            }))
        );

        const tvShowsWithActors = await Promise.all(
            tvShows.map(async (tvShow) => ({
                ...tvShow,
                actors: await fetchTVShowCredits(tvShow.id),
            }))
        );

        // Retourner les résultats combinés
        return NextResponse.json({
            movies: moviesWithActors,
            shows: tvShowsWithActors,
        });
    } catch (error) {
        console.error('Error fetching discover data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch discover data' },
            { status: 500 }
        );
    }
}
