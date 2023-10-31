import type { JSX } from 'react';

import styles from './header-layout.module.css';

type Props = {
  children: JSX.Element;
};

export function HeaderLayout({ children }: Props): JSX.Element {
  return <header className={styles.header}>{children}</header>;
}
