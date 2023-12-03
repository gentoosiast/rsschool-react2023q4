import {
  CAPITAL_LETTER_REGEX,
  LOWERCASE_LETTER_REGEX,
  MIN_PASSWORD_LENGTH,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
} from '@/validations';

const isSufficientLength = (minLength: number): ((password: string) => boolean) => {
  return (password: string) => password.length >= minLength;
};

const checkRegex = (regex: RegExp): ((password: string) => boolean) => {
  return (password: string) => regex.test(password);
};

export const getPasswordStrength = (password: string): number => {
  const score = [
    isSufficientLength(MIN_PASSWORD_LENGTH),
    checkRegex(NUMBER_REGEX),
    checkRegex(CAPITAL_LETTER_REGEX),
    checkRegex(LOWERCASE_LETTER_REGEX),
    checkRegex(SPECIAL_CHARACTER_REGEX),
  ].reduce((result, checker) => result + Number(checker(password)), 0);

  return score;
};
