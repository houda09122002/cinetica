export interface Movie {
    runtime: number;
    id: number;
    title: string;
    overview: string;
    release_date: string;
    genres: string[];
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string | null;
    backdrop_path: string | null;
    original_language: string;
    original_title: string;
    genre_ids: number[];
  }

