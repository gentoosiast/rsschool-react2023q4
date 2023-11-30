import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { getPasswordStrength } from '@/lib/password-strength';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(({ onChange, ...props }, ref) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const strengthColors = ['transparent', '#fecaca', '#fed7aa', '#d9f99d', '#86efac', '#4ade80'];

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const passwordStrength = getPasswordStrength(event.target.value);

    setPasswordStrength(passwordStrength);

    onChange?.(event);
  };

  return (
    <input
      onChange={handleChange}
      ref={ref}
      style={{ borderBlockEnd: `4px solid ${strengthColors[passwordStrength]}` }}
      type="password"
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
