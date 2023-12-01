import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { clsx } from 'clsx';

import { ResultTile } from '@/components/result-tile';
import { useAppSelector } from '@/hooks/rtk-hooks';
import { MainLayout } from '@/layout';
import { isLocationState } from '@/router';

import styles from './main-page.module.css';

export const MainPage = (): JSX.Element => {
  const reactHookForm = useAppSelector((state) => state.reactHookForm);
  const locationState: unknown = useLocation().state;
  const [lastSubmitted, setLastSubmitted] = useState<null | string>(null);

  useEffect(() => {
    const NOTIFICATION_TIMEOUT = 3000;

    if (!isLocationState(locationState)) {
      return;
    }

    const resetLastSubmitted = (): void => {
      setLastSubmitted(null);
    };

    setLastSubmitted(locationState.from);
    const tId = setTimeout(resetLastSubmitted, NOTIFICATION_TIMEOUT);

    return () => {
      clearTimeout(tId);
    };
  }, [locationState]);

  return (
    <MainLayout>
      <h1>Main Page</h1>
      <Link to="/controlled">Controlled Form</Link>
      <Link to="/uncontrolled">Uncontrolled Form</Link>
      <ResultTile
        className={clsx({ [styles.visualAlert]: lastSubmitted === 'rhfForm' })}
        formData={reactHookForm}
        formName="React Hook Form"
      />
    </MainLayout>
  );
};
