import { useEffect, useState } from 'react';
import type { FormEvent, JSX } from 'react';
import { useSearchParams } from 'react-router-dom';

import { string } from 'valibot';

import { updateSearchParams } from '@/lib/search-params';
import { getStorageWrapper } from '@/lib/storage';

import { LOCALSTORAGE_KEY, LOCALSTORAGE_PREFIX } from './constants';

import styles from './search-form.module.css';

type Props = {
  onSubmit: (value: string) => void;
};

const storageWrapper = getStorageWrapper(window.localStorage, LOCALSTORAGE_PREFIX);

export function SearchForm({ onSubmit }: Props): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const storedQuery = storageWrapper.get(LOCALSTORAGE_KEY, string()) ?? '';

    setInputValue(storedQuery);

    onSubmit(storedQuery);
  }, [onSubmit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const submitValue = inputValue.trim();

    storageWrapper.set(LOCALSTORAGE_KEY, submitValue);

    const newParams = updateSearchParams(searchParams, { _page: '1', q: submitValue });

    setSearchParams(newParams);
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
