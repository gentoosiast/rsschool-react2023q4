import { Component } from 'react';
import type { ReactNode } from 'react';

import styles from './exception-button.module.css';

type State = {
  shouldThrowError: boolean;
};

export class ExceptionButton extends Component {
  state: State = {
    shouldThrowError: false,
  };

  private handleThrowError(): void {
    this.setState({ shouldThrowError: true });
  }

  render(): ReactNode {
    if (this.state.shouldThrowError) {
      throw new Error('Sample Error');
    }

    return (
      <button className={styles.buttonDanger} onClick={() => this.handleThrowError()} type="button">
        Throw Error
      </button>
    );
  }
}
