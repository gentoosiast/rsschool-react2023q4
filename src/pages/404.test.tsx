import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './404';

test('Pages Router', () => {
  render(<NotFoundPage />);
  const notFoundHeading = screen.getByRole('heading', {
    level: 1,
    name: /page not found/i,
  });
  expect(notFoundHeading).toBeInTheDocument();
});
