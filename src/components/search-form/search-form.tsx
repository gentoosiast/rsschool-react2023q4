import { Component } from 'react';
import type { ReactNode, ChangeEvent, FormEvent } from 'react';

import { string } from 'valibot';

import { getStorageWrapper } from '@/lib/storage';

import { LOCALSTORAGE_KEY, LOCALSTORAGE_PREFIX } from './constants';

import styles from './search-form.module.css';

type Props = {
  onSubmit: (value: string) => void;
};

type State = {
  inputValue: string;
};

const storageWrapper = getStorageWrapper(window.localStorage, LOCALSTORAGE_PREFIX);

export class SearchForm extends Component<Props, State> {
  state = {
    inputValue: '',
  };

  private handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: event.target.value });
  }

  private handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const inputValue = this.state.inputValue.trim();
    storageWrapper.set(LOCALSTORAGE_KEY, inputValue);
    this.props.onSubmit(inputValue);
  }

  componentDidMount(): void {
    const storedQuery = storageWrapper.get(LOCALSTORAGE_KEY, string()) ?? '';
    this.setState({ inputValue: storedQuery });
    this.props.onSubmit(storedQuery);
  }

  render(): ReactNode {
    return (
      <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
        <input
          autoComplete="off"
          className={styles.input}
          name="search"
          onChange={(e) => this.handleInputChange(e)}
          placeholder="Search"
          spellCheck={false}
          type="search"
          value={this.state.inputValue}
        />
        <button className={styles.submitButton} type="submit">
          Search
        </button>
      </form>
    );
  }
}
