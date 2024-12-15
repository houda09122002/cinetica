export interface TVShow {
    id: number;                      
    name: string;                    
    original_name: string;           
    first_air_date: string;          
    genre_ids: number[];             
    origin_country: string[]; 
    original_language: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    popularity: number;
    vote_average: number; 
    vote_count: number;
    adult?: boolean; 
}

