import type { JSX } from 'react';

import styles from './main-layout.module.css';

type Props = {
  children: JSX.Element;
};

export function MainLayout({ children }: Props): JSX.Element {
  return <main className={styles.main}>{children}</main>;
}
