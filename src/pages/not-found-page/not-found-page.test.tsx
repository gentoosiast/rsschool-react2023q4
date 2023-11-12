import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { routes } from '@/router/router';

describe('NotFoundPage', () => {
  it('should render NotFoundPage', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/unknown-route'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });
});
