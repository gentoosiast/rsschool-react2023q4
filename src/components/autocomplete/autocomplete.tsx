import type { JSX } from 'react';
import { useRef } from 'react';

import { clsx } from 'clsx';

import { useAppSelector } from '@/hooks/rtk-hooks';

import { useAutoComplete } from './use-autocomplete';

import styles from './autocomplete.module.css';

export const AutoComplete = (): JSX.Element => {
  const countries = useAppSelector((state) => state.countries);
  const { registerInput, selectedIndex, suggestions } = useAutoComplete(countries);

  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div>
      <input {...registerInput} type="text" />
      <ul className={styles.suggestions} ref={listRef}>
        {suggestions.map((suggestion, idx) => (
          <li
            className={clsx(styles.suggestion, { [styles.selectedItem]: idx === selectedIndex })}
            key={suggestion}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};
