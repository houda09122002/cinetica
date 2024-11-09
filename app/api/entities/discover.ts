import { Movie } from "./movie";
import { TVShow } from "./TVShow";

export interface DiscoverData {
    movies: Movie[];
    tvShows: TVShow[];
  }