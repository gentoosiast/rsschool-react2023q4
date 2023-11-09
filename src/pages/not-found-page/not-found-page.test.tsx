import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { routes } from '@/router/router';

describe('NotFoundPage', () => {
  it('should render NotFoundPage', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/abracadabra'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
