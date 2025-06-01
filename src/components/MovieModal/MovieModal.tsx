import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <button className={css.closeButton} onClick={onClose}>
                    ×
                </button>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>
                    <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                    <strong>Rating:</strong> {movie.vote_average}
                </p>
            </div>
        </div>
    );
}
