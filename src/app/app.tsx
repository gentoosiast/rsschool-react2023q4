import { Component, ReactNode } from 'react';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/pages/error-page';
import { HomePage } from '@/pages/home-page';

export class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary fallback={<ErrorPage />}>
        <HomePage />
      </ErrorBoundary>
    );
  }
}
