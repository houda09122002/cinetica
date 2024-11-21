export interface Movie {
    runtime: boolean;
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
  }

  //get https://api.themoviedb.org/3/discover/movie?api_key=742fea0be56f5a559bff7d8a8b8678c9&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc