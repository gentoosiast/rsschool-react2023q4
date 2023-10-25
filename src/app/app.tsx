import { Component, ReactNode } from 'react';

import { ErrorBoundary } from '@/components/error-boundary';
import { HomePage } from '@/pages/home-page';

export class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    );
  }
}
