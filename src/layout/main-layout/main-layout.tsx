import { Component } from 'react';
import type { ReactNode } from 'react';

import styles from './main-layout.module.css';

type Props = {
  children: ReactNode;
};

export class MainLayout extends Component<Props> {
  render(): ReactNode {
    return <main className={styles.main}>{this.props.children}</main>;
  }
}
