import { NextResponse } from 'next/server';

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids: number[];
  actors?: Actor[];
}

interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids: number[];
  actors?: Actor[];
}

export async function GET() {
  const fetchMovieCredits = async (movieId: number): Promise<Actor[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    if (!response.ok) {
      console.error(`Failed to fetch credits for movie ID: ${movieId}`);
      return [];
    }
    const data = await response.json();
    return data.cast.slice(0, 5);
  };
  const fetchTVShowCredits = async (tvShowId: number): Promise<Actor[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    if (!response.ok) {
      console.error(`Failed to fetch credits for TV show ID: ${tvShowId}`);
      return [];
    }
    const data = await response.json();
    return data.cast.slice(0, 5);
  };

  const fetchPaginatedData = async (endpoint: string, totalPages: number = 5): Promise<Movie[] | TVShow[]> => {
    const pagePromises = Array.from({ length: totalPages }, (_, i) =>
      fetch(`${endpoint}&page=${i + 1}`).then((res) => res.json())
    );
    const results = await Promise.all(pagePromises);
    return results.flatMap((result) => result.results);
  };

  try {
    const movieEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`;
    const tvShowEndpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`;


    const [movies, tvShows] = await Promise.all([
      fetchPaginatedData(movieEndpoint),
      fetchPaginatedData(tvShowEndpoint),
    ]);

    const moviesWithActors = await Promise.all(
      (movies as Movie[]).map(async (movie) => ({
        ...movie,
        actors: await fetchMovieCredits(movie.id),
      }))
    );

    const tvShowsWithActors = await Promise.all(
      (tvShows as TVShow[]).map(async (tvShow) => ({
        ...tvShow,
        actors: await fetchTVShowCredits(tvShow.id),
      }))
    );


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
