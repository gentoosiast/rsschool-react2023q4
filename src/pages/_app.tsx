import type { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/components/error-page';
import { Spinner } from '@/components/spinner';
import { wrapper } from '@/store/store';

import '@/styles/globals.css';
import 'modern-normalize/modern-normalize.css';

export default function App({ Component, ...pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const start = () => {
    setIsLoading(true);
  };

  const end = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Head>
        <meta content="RS School React 2023 Q3 Learning Project" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Rick and Morty in a Next.js world</title>
      </Head>
      <ErrorBoundary fallback={<ErrorPage />}>
        <div className="root-container">
          {isLoading ? <Spinner /> : <Component {...pageProps} />}
        </div>
      </ErrorBoundary>
    </Provider>
  );
}
