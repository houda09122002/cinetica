export interface TVShow {
    id: number;                      // Unique identifier for the TV show
    name: string;                    // Name of the TV show
    original_name: string;           // Original name of the TV show
    first_air_date: string;          // First air date in ISO format
    genre_ids: number[];             // List of genre IDs
    origin_country: string[];        // Country codes where the show was produced
    original_language: string;       // Original language of the TV show
    overview: string;                // Short summary of the TV show plot
    poster_path: string | null;      // URL to the show's poster image
    backdrop_path: string | null;    // Optional URL to a backdrop image
    popularity: number;              // Popularity score
    vote_average: number;            // Average user rating
    vote_count: number;              // Total number of votes
    adult?: boolean;                 // Indicates if the show is for adults (optional)
}

// get https://api.themoviedb.org/3/discover/tv?api_key=742fea0be56f5a559bff7d8a8b8678c9&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc
