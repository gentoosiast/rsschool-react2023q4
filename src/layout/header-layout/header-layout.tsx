import { Component } from 'react';
import type { ReactNode } from 'react';

import styles from './header-layout.module.css';

type Props = {
  children: ReactNode;
};

export class HeaderLayout extends Component<Props> {
  render(): ReactNode {
    return <header className={styles.header}>{this.props.children}</header>;
  }
}
