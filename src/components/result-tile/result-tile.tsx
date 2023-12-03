import { JSX } from 'react';

import { clsx } from 'clsx';

import type { FormState } from '@/store';

import styles from './result-tile.module.css';

type Props = {
  className?: string;
  formData: FormState;
};

export const ResultTile = ({ className = '', formData }: Props): JSX.Element => {
  const { age, country, email, gender, name, password, picture, submitDate, tos } = formData;

  return (
    <article className={clsx(styles.tile, className)}>
      <h2 className={styles.heading}>Submit {submitDate.toLocaleString()}</h2>

      <p className={styles.tileField}>
        <span className={styles.fieldHeading}>Name:</span>{' '}
        <span className={styles.fieldValue}>{name}</span>
      </p>
      <p className={styles.tileField}>
        <span className={styles.fieldHeading}>Age:</span>{' '}
        <span className={styles.fieldValue}>{age}</span>
      </p>
      <p className={styles.tileField}>
        <span className={styles.fieldHeading}>Gender:</span>{' '}
        <span className={styles.fieldValue}>{gender}</span>
      </p>
      <p className={styles.tileField}>
        <span className={styles.fieldHeading}>Email:</span>{' '}
        <span className={styles.fieldValue}>{email}</span>
      </p>
      <p className={styles.tileField}>
        <span className={styles.fieldHeading}>Password:</span>{' '}
        <span className={styles.fieldValue}>{password}</span>
      </p>
      <p className={styles.tileField}>
        <span className={styles.fieldHeading}>Country:</span>{' '}
        <span className={styles.fieldValue}>{country}</span>
      </p>
      <p className={styles.tileField}>
        <span className={styles.fieldHeading}>Accepted Terms of Service:</span>{' '}
        <span className={styles.fieldValue}>{tos ? 'yes' : 'no'}</span>
      </p>
      <p className={styles.tileField}>
        <img alt={name} src={picture} />
      </p>
    </article>
  );
};
