import type { JSX } from 'react';

import styles from './spinner.module.css';

export function Spinner(): JSX.Element {
  return (
    <div className={styles.spinnerWrapper} role="status">
      <span className={styles.spinner}></span>
    </div>
  );
}
