import { Component, ReactNode } from 'react';

import { string } from 'valibot';

import { Header } from '@/layout/header';
import { getStorageWrapper } from '@/lib/storage';

type HomePageState = {
  searchQuery: string;
};

const storageWrapper = getStorageWrapper(window.localStorage, 'gentoosiast-');

export class HomePage extends Component<object, HomePageState> {
  private handleSearchQueryChange = (query: string): void => {
    this.setState({ searchQuery: query });
    storageWrapper.set('query', query);
  };

  state = {
    searchQuery: '',
  };

  componentDidMount(): void {
    const storedQuery = storageWrapper.get('query', string());

    if (storedQuery) {
      this.setState({ searchQuery: storedQuery });
    }
  }

  render(): ReactNode {
    return (
      <>
        <Header
          onSearchQueryChange={this.handleSearchQueryChange}
          searchQuery={this.state.searchQuery}
        />
      </>
    );
  }
}
