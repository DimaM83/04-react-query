import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useMovies } from './hooks/useMovies';
import type { Movie } from './types/movie';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMovies(query, page);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const value = (formData.get('query') as string).trim();

    if (!value) {
      toast.error('Please enter your search query.');
      return;
    }

    setQuery(value);
    setPage(1);
  };

  return (
    <div>
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading movies...</p>}
      {isError && <p>There was an error loading movies.</p>}

      <ul>
        {data?.results.map((movie: Movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
