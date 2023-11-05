import { Component } from 'react';
import type { ReactNode } from 'react';

import { HomePage } from '@/pages/home-page';

export class App extends Component {
  render(): ReactNode {
    return <HomePage />;
  }
}
