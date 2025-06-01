import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
    movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.item}>
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className={css.poster}
                        />
                    ) : (
                        <div className={css.noImage}>No image</div>
                    )}
                    <h3 className={css.title}>{movie.title}</h3>
                </li>
            ))}
        </ul>
    );
}
