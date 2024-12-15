import { NextResponse } from "next/server";

export async function GET() {
    // Fonction pour récupérer les séries TV populaires
    const fetchTVShows = async (page: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch TV shows from page ${page}`);
        }
        return response.json();
    };

    // Fonction pour récupérer les acteurs d'une série TV spécifique
    const fetchTVShowCredits = async (tvShowId: number) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch credits for TV show ID: ${tvShowId}`);
        }
        const data = await response.json();
        return data.cast; // Retourne uniquement les acteurs
    };

    try {
        const totalPages = 5; // Nombre de pages à récupérer
        const tvShowPromises = Array.from({ length: totalPages }, (_, i) => fetchTVShows(i + 1));

        // Récupérer les séries TV populaires
        const tvShowResults = await Promise.all(tvShowPromises);
        const combinedTVShows = tvShowResults.flatMap((result) => result.results);

        // Ajouter les acteurs pour chaque série TV
        const tvShowsWithActorsPromises = combinedTVShows.map(async (tvShow) => {
            const actors = await fetchTVShowCredits(tvShow.id); // Récupère les acteurs pour cette série
            return {
                ...tvShow,
                actors, // Ajoute les acteurs à l'objet de la série
            };
        });

        const tvShowsWithActors = await Promise.all(tvShowsWithActorsPromises);

        return NextResponse.json({ results: tvShowsWithActors });
    } catch (error) {
        console.error("Error fetching TV shows or actors:", error);
        return NextResponse.json({ error: "Failed to fetch TV shows or actors" }, { status: 500 });
    }
}
