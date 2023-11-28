import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export const UncontrolledFormPage = (): JSX.Element => {
  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <Link to="/">Back to main Page</Link>
    </div>
  );
};
