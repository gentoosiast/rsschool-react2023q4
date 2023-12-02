import { MIN_PASSWORD_LENGTH } from '@/validations/constants';

const isSufficientLength = (minLength: number): ((password: string) => boolean) => {
  return (password: string) => password.length >= minLength;
};

const checkRegex = (regex: RegExp): ((password: string) => boolean) => {
  return (password: string) => regex.test(password);
};

export const getPasswordStrength = (password: string): number => {
  const hasNumberRegex = /\d/;
  const hasCapitalLetterRegex = /\p{Lu}/u;
  const hasLowerCaseLetterRegex = /\p{Ll}/u;
  const hasSpecialSymbolRegex = /[@$!%*#?&^\-+:|/\\]/;

  const score = [
    isSufficientLength(MIN_PASSWORD_LENGTH),
    checkRegex(hasNumberRegex),
    checkRegex(hasCapitalLetterRegex),
    checkRegex(hasLowerCaseLetterRegex),
    checkRegex(hasSpecialSymbolRegex),
  ].reduce((result, checker) => result + Number(checker(password)), 0);

  return score;
};
