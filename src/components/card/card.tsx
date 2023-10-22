import { Component } from 'react';
import type { ReactNode } from 'react';

type Props = {
  name: string;
};

export class Card extends Component<Props> {
  render(): ReactNode {
    return (
      <div className="card">
        <p>{this.props.name}</p>
      </div>
    );
  }
}
