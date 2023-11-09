import { useEffect, useState } from 'react';
import type { FormEvent, JSX } from 'react';

import { string } from 'valibot';

import { getStorageWrapper } from '@/lib/storage';

import { useAppContext } from '../../hooks/use-app-context';
import { LOCALSTORAGE_KEY, LOCALSTORAGE_PREFIX } from './constants';

import styles from './search-form.module.css';

const storageWrapper = getStorageWrapper(window.localStorage, LOCALSTORAGE_PREFIX);

export function SearchForm(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const {
    dispatch,
    state: { searchQuery },
  } = useAppContext();

  useEffect(() => {
    const storedQuery = (searchQuery || storageWrapper.get(LOCALSTORAGE_KEY, string())) ?? '';

    setInputValue(storedQuery);

    dispatch({ payload: storedQuery, type: 'setSearchQuery' });
  }, [dispatch, searchQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const submitValue = inputValue.trim();

    storageWrapper.set(LOCALSTORAGE_KEY, submitValue);

    dispatch({ payload: submitValue, type: 'setSearchQuery' });
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
