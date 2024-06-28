import toast from 'react-hot-toast';
import { BsSearch } from "react-icons/bs";
import { BsExclamationLg } from "react-icons/bs";
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
function handleSubmit(event) {
    event.preventDefault();
    if (event.currentTarget.elements.query.value.trim() === '') {
      toast('Please enter the text to search images', {
        icon: <BsExclamationLg color="blue" size={22} />,
        style: {
          background: 'light',
          color: 'dark',
        },
        position: 'top-left',
      });
      return;
    }

    onSubmit(event.currentTarget.elements.query.value);
    event.currentTarget.reset();
    }
    
    return (
        <header className={css.header}>
            <form onSubmit={handleSubmit}>
                <div className={css.inputContainer}>
                    <input
                        className={css.searchInput}
                        type="text"
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
    )
}