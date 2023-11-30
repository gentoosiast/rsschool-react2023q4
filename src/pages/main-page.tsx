import type { JSX } from 'react';
import { Link } from 'react-router-dom';

import { ResultTile } from '@/components/result-tile';
import { useAppSelector } from '@/hooks/rtk-hooks';

export const MainPage = (): JSX.Element => {
  const reactHookForm = useAppSelector((state) => state.reactHookForm);

  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/controlled">Controlled Form</Link>
      <Link to="/uncontrolled">Uncontrolled Form</Link>
      <ResultTile formData={reactHookForm} formName="React Hook Form" />
    </div>
  );
};
