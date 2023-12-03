import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { clsx } from 'clsx';

import { getPasswordStrength } from '@/lib/password-strength';

import styles from './password-input.module.css';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(({ onChange, ...props }, ref) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const passwordStrength = getPasswordStrength(event.target.value);

    setPasswordStrength(passwordStrength);

    onChange?.(event);
  };

  const getPasswordStrengthClassName = (strength: number): string => {
    const key = `passwordStrength${strength}` as keyof typeof styles;

    return key in styles ? styles[key] : '';
  };

  return (
    <input
      {...props}
      className={clsx(props.className, styles.passwordInput, {
        [getPasswordStrengthClassName(passwordStrength)]: passwordStrength > 0,
      })}
      onChange={handleChange}
      ref={ref}
      type="password"
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
