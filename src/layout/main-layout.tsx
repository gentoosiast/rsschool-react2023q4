import type { JSX, ReactNode } from 'react';

import styles from './main-layout.module.css';

type Props = {
  children: ReactNode[];
};

export const MainLayout = ({ children }: Props): JSX.Element => (
  <main className={styles.main}>{children}</main>
);
