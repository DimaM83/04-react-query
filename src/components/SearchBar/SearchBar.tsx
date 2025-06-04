import styles from './SearchBar.module.css';

interface SearchBarProps {
    action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
    return (
        <form className={styles.searchForm} action={action}>
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