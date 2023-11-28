import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export const MainPage = (): JSX.Element => {
  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/controlled">Controlled Form</Link>
      <Link to="/uncontrolled">Uncontrolled Form</Link>
    </div>
  );
};
