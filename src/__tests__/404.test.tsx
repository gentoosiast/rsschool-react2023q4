import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NotFoundPage from '@/pages/404';

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
