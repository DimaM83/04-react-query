import css from './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const value = (formData.get('query') as string).trim();

        if (!value) return;
        onSubmit(value);
        form.reset();
    };

    return (
        <form onSubmit={handleSubmit} className={css.searchForm}>
            <input type="text" name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
}
