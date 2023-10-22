import { Component, ReactNode } from 'react';

import { string } from 'valibot';

import type { ApiResponse } from '@/lib/api';

import { Header } from '@/layout/header';
import { Main } from '@/layout/main';
import { api } from '@/lib/api';
import { getStorageWrapper } from '@/lib/storage';

type HomePageState = {
  apiResponse: ApiResponse | null;
  searchQuery: string;
};

const storageWrapper = getStorageWrapper(window.localStorage, 'gentoosiast-');

export class HomePage extends Component<object, HomePageState> {
  private handleSearchQueryChange = (query: string): void => {
    storageWrapper.set('query', query);
    api
      .getOne(query)
      .then((response) => this.setState({ apiResponse: response, searchQuery: query }))
      .catch((err) => console.log(err));
  };

  state: HomePageState = {
    apiResponse: null,
    searchQuery: '',
  };

  componentDidMount(): void {
    const storedQuery = storageWrapper.get('query', string());

    if (storedQuery) {
      api
        .getOne(storedQuery)
        .then((response) => this.setState({ apiResponse: response, searchQuery: storedQuery }))
        .catch((err) => console.log(err));
    }
  }

  render(): ReactNode {
    console.log(this.state.apiResponse);
    return (
      <>
        <Header
          onSearchQueryChange={this.handleSearchQueryChange}
          searchQuery={this.state.searchQuery}
        />
        <Main searchResults={this.state.apiResponse?.results ?? []} />
      </>
    );
  }
}
