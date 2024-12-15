import { NextResponse } from 'next/server';

async function fetchCredits(id: number, isMovie: boolean) {
  try {
    const endpoint = isMovie
      ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

    const response = await fetch(endpoint);
    const data = await response.json();

    // Retourner uniquement les acteurs
    return data.cast || [];
  } catch (error) {
    console.error(`Failed to fetch credits for ${id}:`, error);
    return [];
  }
}

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

    // Récupérer les acteurs pour chaque film et série
    const moviesWithActors = await Promise.all(
      movieData.results.map(async (movie: any) => {
        const actors = await fetchCredits(movie.id, true);
        return { ...movie, actors };
      })
    );

    const showsWithActors = await Promise.all(
      tvData.results.map(async (show: any) => {
        const actors = await fetchCredits(show.id, false);
        return { ...show, actors };
      })
    );

    return NextResponse.json({
      movies: moviesWithActors,
      shows: showsWithActors,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
