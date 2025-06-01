
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, type SearchMoviesResponse } from '../services/movieService';

export function useMovies(query: string, page: number) {
  return useQuery<SearchMoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 5, 
  });
}
