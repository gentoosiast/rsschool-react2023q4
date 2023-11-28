import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export const ControlledFormPage = (): JSX.Element => {
  return (
    <div>
      <h1>Controlled Form</h1>
      <Link to="/">Back to main Page</Link>
    </div>
  );
};
