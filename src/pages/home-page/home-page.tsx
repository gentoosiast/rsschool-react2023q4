import { Component, ReactNode } from 'react';

import { string } from 'valibot';

import type { ApiResponse } from '@/services/api';

import { CardList } from '@/components/card-list';
import { ExceptionButton } from '@/components/exception-button';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { getStorageWrapper } from '@/lib/storage';
import { api } from '@/services/api/api';

type HomePageState = {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
  searchQuery: string;
};

const storageWrapper = getStorageWrapper(window.localStorage, 'gentoosiast-');

export class HomePage extends Component<Record<string, never>, HomePageState> {
  private handleSearchQueryChange = (query: string): void => {
    storageWrapper.set('query', query);
    void this.fetchCards(query);
  };

  state: HomePageState = {
    apiResponse: null,
    isLoading: true,
    searchQuery: '',
  };

  private async fetchCards(query: string): Promise<void> {
    try {
      this.setState({ isLoading: true });
      const response = query ? await api.getOne(query) : await api.getAll();
      this.setState({ apiResponse: response, searchQuery: query });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount(): void {
    const storedQuery = storageWrapper.get('query', string()) ?? '';
    void this.fetchCards(storedQuery);
  }

  render(): ReactNode {
    return (
      <>
        <HeaderLayout>
          <SearchForm onSubmit={this.handleSearchQueryChange} query={this.state.searchQuery} />
          <ExceptionButton />
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
