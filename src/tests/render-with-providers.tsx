import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';

import type { JSX, PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';

import type { AppStore, RootState } from '@/store';

import { setupStore } from '@/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

interface RenderResult extends RenderOptions {
  store: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
): RenderResult {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
