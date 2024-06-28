import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { BsSearch, BsExclamationLg } from "react-icons/bs";
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      toast.error('Please enter text to search images.', {
        icon: <BsExclamationLg color="blue" size={22} />,
        style: {
          background: 'light',
          color: 'dark',
        },
        position: 'top-left',
      });
      return;
    }

    onSubmit(trimmedQuery); // Pass the trimmed query to onSubmit function
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <div className={css.inputContainer}>
          <input
            className={css.searchInput}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.searchBtn} type="submit">
            <BsSearch color="dark" size={14} />
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;