import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface SearchMoviesResponse {
    results: Movie[];
    total_pages: number;
}

export async function fetchMovies(
    query: string,
    page: number
): Promise<SearchMoviesResponse> {
    const response = await axios.get<SearchMoviesResponse>(
        `${BASE_URL}/search/movie`,
        {
            params: {
                query,
                include_adult: false,
                language: 'en-US',
                page,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        }
    );

    return response.data;
}
