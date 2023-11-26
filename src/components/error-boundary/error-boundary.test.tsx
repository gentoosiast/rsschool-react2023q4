import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { ExceptionButton } from '@/components/exception-button';

import { ErrorPage } from '../error-page';
import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render fallback after error', async () => {
    const errorText = /houston, we have a problem/i;

    vi.spyOn(console, 'error').mockImplementation(() => null);

    render(
      <ErrorBoundary fallback={<ErrorPage />}>
        <ExceptionButton />
      </ErrorBoundary>,
    );

    let fallbackHeading = screen.queryByRole('heading', {
      level: 1,
      name: errorText,
    });
    expect(fallbackHeading).not.toBeInTheDocument();

    const exceptionButton = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(exceptionButton);

    fallbackHeading = await screen.findByRole('heading', {
      level: 1,
      name: errorText,
    });
    expect(fallbackHeading).toBeInTheDocument();
  });
});
