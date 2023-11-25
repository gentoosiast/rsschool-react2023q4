import type { JSX } from 'react';

import styles from './error-page.module.css';

export function ErrorPage(): JSX.Element {
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
