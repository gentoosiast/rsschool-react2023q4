import { Component, ReactNode } from 'react';

import { SearchForm } from '@/components/search-form';

import styles from './header.module.css';

type Props = {
  onSearchQueryChange: (value: string) => void;
  searchQuery: string;
};

type State = {
  shouldThrowError: boolean;
};

export class Header extends Component<Props, State> {
  state: State = {
    shouldThrowError: false,
  };

  private handleThrowError(): void {
    this.setState({ shouldThrowError: true });
  }

  render(): ReactNode {
    if (this.state.shouldThrowError) {
      throw new Error('Sample Error');
    }

    return (
      <header className={styles.header}>
        <SearchForm onSubmit={this.props.onSearchQueryChange} query={this.props.searchQuery} />
        <button
          className={styles.buttonDanger}
          onClick={() => this.handleThrowError()}
          type="button"
        >
          Throw Error
        </button>
      </header>
    );
  }
}
