import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return NextResponse.json(data);
}