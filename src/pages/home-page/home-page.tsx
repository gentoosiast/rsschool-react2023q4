import { Component, ReactNode } from 'react';

import { string } from 'valibot';

import type { ApiResponse } from '@/services/api';

import { CardList } from '@/components/card-list';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { getStorageWrapper } from '@/lib/storage';
import { api } from '@/services/api';

import styles from './home-page.module.css';

type HomePageState = {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
  searchQuery: string;
  shouldThrowError: boolean;
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
    shouldThrowError: false,
  };

  private handleThrowError(): void {
    this.setState({ shouldThrowError: true });
  }

  componentDidMount(): void {
    const storedQuery = storageWrapper.get('query', string());

    if (storedQuery) {
      this.setState({ isLoading: true });
      api
        .getOne(storedQuery)
        .then((response) => this.setState({ apiResponse: response, searchQuery: storedQuery }))
        .catch((err) => console.log(err))
        .finally(() => this.setState({ isLoading: false }));
    } else {
      this.setState({ isLoading: true });
      api
        .getAll()
        .then((response) => this.setState({ apiResponse: response }))
        .catch((err) => console.log(err))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  render(): ReactNode {
    if (this.state.shouldThrowError) {
      throw new Error('Sample Error');
    }

    return (
      <>
        <HeaderLayout>
          <SearchForm onSubmit={this.handleSearchQueryChange} query={this.state.searchQuery} />
          <button
            className={styles.buttonDanger}
            onClick={() => this.handleThrowError()}
            type="button"
          >
            Throw Error
          </button>
        </HeaderLayout>
        <MainLayout>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <CardList characters={this.state.apiResponse?.results ?? []} />
          )}
        </MainLayout>
      </>
    );
  }
}
