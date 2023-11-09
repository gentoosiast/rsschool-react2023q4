import { createBrowserRouter } from 'react-router-dom';

import { CharacterDetails } from '@/components/character-details';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/pages/error-page';
import { HomePage } from '@/pages/home-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { AppProvider } from '@/providers/app-provider/app-provider';

const routes = [
  {
    children: [
      {
        element: <CharacterDetails />,
        index: true,
      },
    ],
    element: (
      <AppProvider>
        <HomePage />
      </AppProvider>
    ),
    path: '/',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
].map((route) => ({
  ...route,
  element: <ErrorBoundary fallback={<ErrorPage />}>{route.element}</ErrorBoundary>,
}));

export const router = createBrowserRouter(routes);
