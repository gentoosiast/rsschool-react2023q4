import type { JSX } from 'react';
import { forwardRef } from 'react';

import { clsx } from 'clsx';

import type { AutoCompleteProps } from './types';

import { useAutoComplete } from './use-autocomplete';

import styles from './autocomplete.module.css';

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({ completionSource, name, onBlur, onChange }, ref): JSX.Element => {
    const { onItemClick, registerInput, registerList, selectedIndex, suggestions } =
      useAutoComplete(completionSource, ref, onBlur, onChange);

    return (
      <div className={styles.autocomplete}>
        <input
          name={name}
          {...registerInput}
          autoComplete="off"
          className={styles.input}
          defaultValue=""
          type="text"
        />
        {suggestions.length > 0 && (
          <ul className={styles.suggestions} {...registerList}>
            {suggestions.map((suggestion, idx) => (
              <li
                className={clsx({ [styles.selectedItem]: idx === selectedIndex })}
                key={suggestion}
              >
                <button className={styles.suggestionButton} onClick={() => onItemClick(idx)}>
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

AutoComplete.displayName = 'AutoComplete';
