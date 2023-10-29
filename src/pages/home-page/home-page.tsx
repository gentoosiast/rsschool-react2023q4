import { Component } from 'react';
import type { ReactNode } from 'react';

import type { ApiResponse } from '@/services/api';

import { CardList } from '@/components/card-list';
import { ExceptionButton } from '@/components/exception-button';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { api } from '@/services/api';

type State = {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
};

export class HomePage extends Component<Record<string, never>, State> {
  private handleSearchQueryChange = (query: string): void => {
    this.setState({ isLoading: true }, () => void this.fetchCards(query));
  };

  state: State = {
    apiResponse: null,
    isLoading: true,
  };

  private async fetchCards(query: string): Promise<void> {
    let response: ApiResponse | null = null;

    try {
      response = query ? await api.search(query) : await api.getAll();
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ apiResponse: response, isLoading: false });
    }
  }

  render(): ReactNode {
    return (
      <>
        <HeaderLayout>
          <SearchForm onSubmit={this.handleSearchQueryChange} />
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
