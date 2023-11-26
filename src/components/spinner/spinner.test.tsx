import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './spinner';

describe('Spinner', () => {
  it('should render', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');

    expect(spinner).toBeInTheDocument();
  });
});
