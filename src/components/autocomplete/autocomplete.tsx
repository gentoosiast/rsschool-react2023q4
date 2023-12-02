import type { JSX } from 'react';
import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { useAutoComplete } from './use-autocomplete';

import styles from './autocomplete.module.css';

type Props = {
  completionSource: string[];
};

export const AutoComplete = forwardRef<HTMLInputElement, Props>(
  ({ completionSource }, ref): JSX.Element => {
    const { onItemClick, registerInput, registerList, selectedIndex, suggestions } =
      useAutoComplete(completionSource, ref);

    return (
      <div className={styles.autocomplete}>
        <input {...registerInput} defaultValue="" type="text" />
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
