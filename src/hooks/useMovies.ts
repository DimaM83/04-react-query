import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/movieService';
import type { SearchMoviesResponse } from '../types/movie';

export function useMovies(query: string, page: number) {
  return useQuery<SearchMoviesResponse>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
