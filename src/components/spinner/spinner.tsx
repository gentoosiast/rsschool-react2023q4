import type { JSX } from 'react';

import styles from './spinner.module.css';

export function Spinner(): JSX.Element {
  return (
    <div className={styles.spinnerWrapper}>
      <span className={styles.spinner}></span>
    </div>
  );
}
