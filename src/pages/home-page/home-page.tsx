import { Component, ReactNode } from 'react';

import { string } from 'valibot';

import type { ApiResponse } from '@/lib/api';

import { Spinner } from '@/components/spinner';
import { Header } from '@/layout/header';
import { Main } from '@/layout/main';
import { api } from '@/lib/api';
import { getStorageWrapper } from '@/lib/storage';

type HomePageState = {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
  searchQuery: string;
};

const storageWrapper = getStorageWrapper(window.localStorage, 'gentoosiast-');

export class HomePage extends Component<Record<string, never>, HomePageState> {
  private handleSearchQueryChange = (query: string): void => {
    this.setState({ isLoading: true });
    storageWrapper.set('query', query);
    api
      .getOne(query)
      .then((response) => this.setState({ apiResponse: response, searchQuery: query }))
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  state: HomePageState = {
    apiResponse: null,
    isLoading: true,
    searchQuery: '',
  };

  componentDidMount(): void {
    const storedQuery = storageWrapper.get('query', string());

    if (storedQuery) {
      this.setState({ isLoading: true });
      api
        .getOne(storedQuery)
        .then((response) => this.setState({ apiResponse: response, searchQuery: storedQuery }))
        .catch((err) => console.log(err))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  render(): ReactNode {
    return (
      <>
        <Header
          onSearchQueryChange={this.handleSearchQueryChange}
          searchQuery={this.state.searchQuery}
        />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <Main searchResults={this.state.apiResponse?.results ?? []} />
        )}
      </>
    );
  }
}
