import { NextResponse } from 'next/server';

export async function GET() {
    console.log(process.env.TMDB_API_KEY);
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return NextResponse.json(data);
}