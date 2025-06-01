// import axios from 'axios';
// import type { Movie } from '../types/movie';

// const BASE_URL = 'https://api.themoviedb.org/3';

// export interface SearchMoviesResponse {
//     results: Movie[];
//     total_pages: number;
// }


// export async function fetchMovies(query: string, page: number): Promise<SearchMoviesResponse> {
//     try {

//         const response = await axios.get<SearchMoviesResponse>(
//             `${BASE_URL}/search/movie`,
//             {
//                 params: {
//                     query,
//                     include_adult: false,
//                     language: 'en-US',
//                     page,
//                 },
//                 headers: {
//                     Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
//                     Accept: 'application/json',
//                 },
//             }
//         );

//         return response.data;
//     } catch (error) {
//         console.error('Fetch error:', error);
//         throw error;
//     }
// }



import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface SearchMoviesResponse {
    results: Movie[];
    total_pages: number;
}

export async function fetchMovies(query: string, page: number): Promise<SearchMoviesResponse> {
    try {
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
                    Accept: 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);

        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data);
        }

        throw error;
    }
}
