import { Component, ReactNode } from 'react';

import { Header } from '@/layout/header';

type HomePageState = {
  searchQuery: string;
};

export class HomePage extends Component<object, HomePageState> {
  private handleSearchQueryChange = (query: string): void => {
    this.setState({ searchQuery: query });
  };

  state = {
    searchQuery: '',
  };

  render(): ReactNode {
    return (
      <>
        <Header onSearchQueryChange={this.handleSearchQueryChange} searchQuery="" />
      </>
    );
  }
}
