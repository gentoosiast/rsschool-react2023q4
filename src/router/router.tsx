import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home-page';
import { NotFoundPage } from '@/pages/not-found-page';

export const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: '/',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
]);
