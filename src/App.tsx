import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useMovies } from './hooks/useMovies';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';
import MovieGrid from './components/MovieGrid/MovieGrid';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, isLoading, isError } = useMovies(query, page);

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);

      if (data.results.length === 0) {
        toast.error('No movies found for your request.');
      }
    }
  }, [data]);

  const handleSearch = (value: string) => {
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

      <p className={css.logo}>
        Powered by{' '}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          TMDB
        </a>
      </p>

      <SearchBar onSubmit={handleSearch} />

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

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="There was an error loading movies." />}
      {data && data.results.length > 0 && <MovieGrid movies={data.results} />}
    </div>
  );
}
