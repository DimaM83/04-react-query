import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useMovies } from './hooks/useMovies';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';
import MovieGrid from './components/MovieGrid/MovieGrid';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, isLoading, isError } = useMovies(query, page);

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
    }
  }, [data]);

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
    <div className={css.container}>
      <Toaster position="top-right" />

      <div className={css.header}>
        <p className={css.logo}>
          Powered by{' '}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            TMDB
          </a>
        </p>

        <form onSubmit={handleSubmit} className={css.searchForm}>
          <input type="text" name="query" placeholder="Search movies..." />
          <button type="submit">Search</button>
        </form>

        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
      </div>

      {isLoading && <p>Loading movies...</p>}
      {isError && <p>There was an error loading movies.</p>}
      {data && <MovieGrid movies={data.results} />}
    </div>
  );
}