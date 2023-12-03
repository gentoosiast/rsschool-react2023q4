import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { clsx } from 'clsx';

import { ResultTile } from '@/components/result-tile';
import { useAppSelector } from '@/hooks/rtk-hooks';
import { MainLayout } from '@/layout';
import { RoutePath, isLocationState } from '@/router';

import styles from './main-page.module.css';

export const MainPage = (): JSX.Element => {
  const formSubmits = useAppSelector((state) => state.submits);
  const locationState: unknown = useLocation().state;
  const [lastSubmitted, setLastSubmitted] = useState<Date | null>(null);

  useEffect(() => {
    const NOTIFICATION_TIMEOUT = 3000;

    if (!isLocationState(locationState)) {
      return;
    }

    const resetLastSubmitted = (): void => {
      setLastSubmitted(null);
    };

    setLastSubmitted(locationState.submitDate);
    const tId = setTimeout(resetLastSubmitted, NOTIFICATION_TIMEOUT);

    return () => {
      clearTimeout(tId);
    };
  }, [locationState]);

  return (
    <MainLayout>
      <h1>Main Page</h1>
      <nav className={styles.nav}>
        <Link to={RoutePath.UNCONTROLLED_FORM}>Uncontrolled Form</Link>
        <Link to={RoutePath.REACT_HOOK_FORM}>React Hook Form</Link>
      </nav>
      <div className={styles.tiles}>
        {formSubmits.map((formSubmit) => (
          <ResultTile
            className={clsx({ [styles.visualAlert]: lastSubmitted === formSubmit.submitDate })}
            formData={formSubmit}
            key={formSubmit.submitDate.toString()}
          />
        ))}
      </div>
    </MainLayout>
  );
};
