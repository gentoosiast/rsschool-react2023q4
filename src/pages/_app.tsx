import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { wrapper } from '@/store/store';

import '@/styles/globals.css';
import 'modern-normalize/modern-normalize.css';

export default function App({ Component, ...pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
