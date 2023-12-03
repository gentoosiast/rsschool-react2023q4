import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@/pages/main-page';
import { ReactHookFormPage } from '@/pages/react-hook-form-page';
import { UncontrolledFormPage } from '@/pages/uncontrolled-form-page';

import { RoutePath } from './routes';

export const router = createBrowserRouter([
  {
    element: <MainPage />,
    path: RoutePath.MAIN,
  },
  {
    element: <ReactHookFormPage />,
    path: RoutePath.REACT_HOOK_FORM,
  },
  {
    element: <UncontrolledFormPage />,
    path: RoutePath.UNCONTROLLED_FORM,
  },
]);
