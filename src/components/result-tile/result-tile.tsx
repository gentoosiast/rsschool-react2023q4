import { JSX } from 'react';

import type { FormState } from '@/store';

import styles from './result-tile.module.css';

type Props = {
  formData: FormState | null;
  formName: string;
};

export const ResultTile = ({ formData, formName }: Props): JSX.Element => {
  if (!formData) {
    return <h1>No data</h1>;
  }

  const { age, country, email, gender, name, password, picture, tos } = formData;

  return (
    <article>
      <h2>{formName}</h2>
      <p>
        <span className={styles.fieldHeading}>Name:</span> {name}
      </p>
      <p>
        <span className={styles.fieldHeading}>Age:</span> {age}
      </p>
      <p>
        <span className={styles.fieldHeading}>Gender:</span> {gender}
      </p>
      <p>
        <span className={styles.fieldHeading}>Email:</span> {email}
      </p>
      <p>
        <span className={styles.fieldHeading}>Password:</span> {password}
      </p>
      <p>
        <span className={styles.fieldHeading}>Country:</span> {country}
      </p>
      <p>
        <span className={styles.fieldHeading}>Picture:</span>
        <img alt={name} src={picture} />
      </p>
      <p>
        <span className={styles.fieldHeading}>Accepted Terms of Service:</span> {tos}
      </p>
    </article>
  );
};
