import { createBrowserRouter } from 'react-router-dom';

import { CharacterDetails } from '@/components/character-details';
import { HomePage } from '@/pages/home-page';
import { NotFoundPage } from '@/pages/not-found-page';

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <CharacterDetails />,
        index: true,
      },
    ],
    element: <HomePage />,
    path: '/',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
]);
