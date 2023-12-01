import type { JSX } from 'react';

import { clsx } from 'clsx';

import { useAppSelector } from '@/hooks/rtk-hooks';

import { useAutoComplete } from './use-autocomplete';

import styles from './autocomplete.module.css';

export const AutoComplete = (): JSX.Element => {
  const countries = useAppSelector((state) => state.countries);
  const { onItemClick, registerInput, registerList, selectedIndex, suggestions } =
    useAutoComplete(countries);

  return (
    <div className={styles.autocomplete}>
      <input {...registerInput} type="text" />
      {suggestions.length > 0 && (
        <ul className={styles.suggestions} {...registerList}>
          {suggestions.map((suggestion, idx) => (
            <li className={clsx({ [styles.selectedItem]: idx === selectedIndex })} key={suggestion}>
              <button className={styles.suggestionButton} onClick={() => onItemClick(idx)}>
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
