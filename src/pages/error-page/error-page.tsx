import { Component } from 'react';
import type { ReactNode } from 'react';

import styles from './error-page.module.css';

export class ErrorPage extends Component {
  render(): ReactNode {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Houston, we have a problem</h1>
        <video
          autoPlay={true}
          className={styles.video}
          height="480"
          loop={true}
          muted
          src="/error-video.mp4"
          width="480"
        />
      </div>
    );
  }
}
