import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { clsx } from 'clsx';

import { getPasswordStrength } from '@/lib/password-strength';

import styles from './password-input.module.css';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(({ onChange, ...props }, ref) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const strengthColors = ['', '#ec4899', '#f59e0b', '#fde047', '#a3e635', '#4ade80'];

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const passwordStrength = getPasswordStrength(event.target.value);

    setPasswordStrength(passwordStrength);

    onChange?.(event);
  };

  return (
    <input
      {...props}
      className={clsx(props.className, styles.passwordInput)}
      onChange={handleChange}
      ref={ref}
      style={{ borderBlockEndColor: `${strengthColors[passwordStrength]}` }}
      type="password"
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
