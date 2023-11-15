import { useState } from 'react';
import type { FormEvent, JSX } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/settings-slice';

import styles from './search-form.module.css';

export function SearchForm(): JSX.Element {
  const initialSearchValue = useAppSelector((state) => state.settings.searchQuery);
  const [inputValue, setInputValue] = useState(initialSearchValue);
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const submitValue = inputValue.trim();

    dispatch(setSearchQuery(submitValue));
  }

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <input
        autoComplete="off"
        className={styles.input}
        name="search"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search"
        spellCheck={false}
        type="search"
        value={inputValue}
      />
      <button className={styles.submitButton} type="submit">
        Search
      </button>
    </form>
  );
}
