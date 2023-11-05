import { useState } from 'react';
import type { JSX } from 'react';

import styles from './exception-button.module.css';

export function ExceptionButton(): JSX.Element {
  const [shouldThrowError, setShouldThrowErrror] = useState(false);

  if (shouldThrowError) {
    throw new Error('Sample Error');
  }

  return (
    <button
      className={styles.buttonDanger}
      onClick={() => setShouldThrowErrror(true)}
      type="button"
    >
      Throw Error
    </button>
  );
}
