import { createBrowserRouter } from 'react-router-dom';

import { ControlledFormPage } from '@/pages/controlled-form-page';
import { MainPage } from '@/pages/main-page';
import { UncontrolledFormPage } from '@/pages/uncontrolled-form-page';

export const router = createBrowserRouter([
  {
    element: <MainPage />,
    path: '/',
  },
  {
    element: <ControlledFormPage />,
    path: '/controlled',
  },
  {
    element: <UncontrolledFormPage />,
    path: '/uncontrolled',
  },
]);
