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
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGc2cGN2MGkxOHNnZWkxaXM2MThkb25qdWx4Z202NmZibGk2bWFlaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YNzg7r0YCy31B6YANN/giphy.mp4"
          width="480"
        />
      </div>
    );
  }
}
