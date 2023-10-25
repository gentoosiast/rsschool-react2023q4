import { Component, ReactNode } from 'react';

import styles from './search-form.module.css';

type Props = {
  onSubmit: (value: string) => void;
  query: string;
};

type State = {
  inputValue: string;
};

export class SearchForm extends Component<Props, State> {
  state = {
    inputValue: this.props.query,
  };

  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: event.target.value.trim() });
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  render(): ReactNode {
    return (
      <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
        <input
          className={styles.input}
          name="search"
          onChange={(e) => this.handleInputChange(e)}
          placeholder={this.props.query}
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
