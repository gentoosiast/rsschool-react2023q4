import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { ExceptionButton } from '@/components/exception-button';

import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render fallback after error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    render(
      <ErrorBoundary fallback={<h1>fallback component</h1>}>
        <ExceptionButton />
      </ErrorBoundary>,
    );

    let fallbackHeading = screen.queryByRole('heading', {
      level: 1,
      name: /fallback component/i,
    });
    expect(fallbackHeading).not.toBeInTheDocument();

    const exceptionButton = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(exceptionButton);

    fallbackHeading = await screen.findByRole('heading', {
      level: 1,
      name: /fallback component/i,
    });
    expect(fallbackHeading).toBeInTheDocument();
  });
});
