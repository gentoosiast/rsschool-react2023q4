import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './404';

describe('404 page', () => {
  it('should render', () => {
    render(<NotFoundPage />);
    const notFoundHeading = screen.getByRole('heading', {
      level: 1,
      name: /page not found/i,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
