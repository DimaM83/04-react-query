import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const query = (formData.get('query') as string).trim();

        if (!query) {
            toast.error('Please enter your search query.');
            return;
        }

        onSubmit(query);
        form.reset();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
                className={styles.input}
                type="text"
                name="query"
                placeholder="Search movies..."
                autoComplete="off"
            />
            <button className={styles.button} type="submit">
                Search
            </button>
        </form>
    );
}
