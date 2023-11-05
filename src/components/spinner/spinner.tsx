import { Component } from 'react';
import type { ReactNode } from 'react';

import styles from './spinner.module.css';

export class Spinner extends Component {
  render(): ReactNode {
    return (
      <div className={styles.spinnerWrapper}>
        <span className={styles.spinner}></span>
      </div>
    );
  }
}
