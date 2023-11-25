import type { FormEvent, JSX } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchQuery } from '@/store/slices/settings-slice';

import styles from './search-form.module.css';

interface CustomElements extends HTMLFormControlsCollection {
  search: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

type Props = {
  initialSearchValue: string;
  onQueryChange: (query: string) => void;
};

export function SearchForm({ initialSearchValue, onQueryChange }: Props): JSX.Element {
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<CustomForm>): void {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const rawInputValue = target.search.value;

    const inputValue = rawInputValue.trim();

    dispatch(setSearchQuery(inputValue));

    onQueryChange(inputValue);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        className={styles.input}
        defaultValue={initialSearchValue}
        name="search"
        placeholder="Search"
        spellCheck={false}
        type="search"
      />
      <button className={styles.submitButton} type="submit">
        Search
      </button>
    </form>
  );
}
