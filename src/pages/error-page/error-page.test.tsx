import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { routes } from '@/router/router';
import { renderWithProviders } from '@/tests/render-with-providers';

const { error } = console;
const ignored = ['Sample Error', 'ExceptionButton'];

const filterIgnored = (callback: (...args: string[]) => void, ...args: string[]): void => {
  const msg = args?.[0];
  if (typeof msg !== 'string' || !ignored.some((ignoredMsg) => msg.includes(ignoredMsg))) {
    callback(...args);
  }
};

console.error = (...args: string[]) => filterIgnored(error, ...args);

describe('ErrorPage', () => {
  it('should render ErrorPage when exception occurs', async () => {
    const router = createMemoryRouter(routes);
    renderWithProviders(<RouterProvider router={router} />);

    const headingErrorText = /houston, we have a problem/i;

    const throwErrorButton = screen.getByRole('button', {
      name: /throw error/i,
    });
    const missingErrorText = screen.queryByRole('heading', {
      name: headingErrorText,
    });
    expect(missingErrorText).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(throwErrorButton);

    const errorText = screen.getByRole('heading', {
      name: headingErrorText,
    });
    expect(errorText).toBeInTheDocument();
  });
});
