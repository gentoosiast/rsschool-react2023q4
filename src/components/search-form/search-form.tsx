import { useEffect, useState } from 'react';
import type { FormEvent, JSX } from 'react';

import { string } from 'valibot';

import { useAppContextApi } from '@/hooks/use-app-context-api';
import { useAppContextData } from '@/hooks/use-app-context-data';
import { getStorageWrapper } from '@/lib/storage';

import { LOCALSTORAGE_KEY, LOCALSTORAGE_PREFIX } from './constants';

import styles from './search-form.module.css';

const storageWrapper = getStorageWrapper(window.localStorage, LOCALSTORAGE_PREFIX);

export function SearchForm(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const { searchQuery } = useAppContextData();
  const { setSearchQuery } = useAppContextApi();

  useEffect(() => {
    const storedQuery = (searchQuery || storageWrapper.get(LOCALSTORAGE_KEY, string())) ?? '';

    setInputValue(storedQuery);

    setSearchQuery(storedQuery);
  }, [searchQuery, setSearchQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const submitValue = inputValue.trim();

    storageWrapper.set(LOCALSTORAGE_KEY, submitValue);

    setSearchQuery(submitValue);
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
