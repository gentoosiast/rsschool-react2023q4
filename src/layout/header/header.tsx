import { Component, ReactNode } from 'react';

import { SearchForm } from '@/components/search-form';

import styles from './header.module.css';

type Props = {
  onSearchQueryChange: (value: string) => void;
  searchQuery: string;
};

export class Header extends Component<Props> {
  render(): ReactNode {
    return (
      <header className={styles.header}>
        <SearchForm onSubmit={this.props.onSearchQueryChange} query={this.props.searchQuery} />
      </header>
    );
  }
}
