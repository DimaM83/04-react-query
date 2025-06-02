import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useMovies } from '../../hooks/useMovies';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieModal from '../../components/MovieModal/MovieModal';
import type { Movie } from '../../types/movie';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isLoading, isError } = useMovies(query, page);

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);

      if (data.results.length === 0) {
        toast.error('No movies found for your request.');
      }
    }
  }, [data]);

  const handleSearch = (formData: FormData) => {
    const query = (formData.get('query') as string).trim();

    if (!query) {
      toast.error('Please enter your search query.');
      return;
    }

    setQuery(query);
    setPage(1);
  }

  return (
    <div className={css.container}>
      <Toaster position="top-right" />

      <div className={css.topBar}>
        <p className={css.logo}>
          Powered by{' '}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
            TMDB
          </a>
        </p>
        <SearchBar action={handleSearch} />
      </div>

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
      {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
