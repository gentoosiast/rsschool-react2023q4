import type { JSX } from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

export function NotFoundPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Page not found</h1>
      <img
        alt="Rick and Morty in unknown galaxy"
        height="684"
        src="/rick-morty-not-found.webp"
        width="700"
      />
      <Link className={styles.link} to="/">
        Return home
      </Link>
    </div>
  );
}
