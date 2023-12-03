import { getNames } from 'country-list';
import { boolean, mixed, number, object, ref, string } from 'yup';

import {
  CAPITAL_LETTER_REGEX,
  LOWERCASE_LETTER_REGEX,
  MAX_AGE,
  MIN_AGE,
  MIN_PASSWORD_LENGTH,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
} from './constants';
import { isFileSizeOK, isFiletypeAllowed } from './test-functions';

export const formSchema = object().shape({
  age: number()
    .required()
    .min(MIN_AGE)
    .max(MAX_AGE)
    .integer()
    .typeError('Age must be a positive number'),
  country: string().required().oneOf(getNames(), 'Should be valid country'),
  email: string().required().email(),
  gender: string().oneOf(['male', 'female', 'nonbinary']).required(),
  name: string()
    .required()
    .matches(/\p{Lu}/u, 'Name must start with a capital letter'),
  password: string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .matches(NUMBER_REGEX, 'Password must contain a number')
    .matches(CAPITAL_LETTER_REGEX, 'Password must contain a capital letter')
    .matches(LOWERCASE_LETTER_REGEX, 'Password must contain a lowercase letter')
    .matches(SPECIAL_CHARACTER_REGEX, 'Password must contain a special character'),
  password2: string()
    .required()
    .oneOf([ref('password')], 'Passwords do not match'),
  picture: mixed((input): input is FileList => input instanceof FileList && input.length > 0)
    .required()
    .test('filesize', 'Image filesize is too big', isFileSizeOK)
    .test('filetype', 'Only PNG and JPG images are allowed', isFiletypeAllowed),
  tos: boolean().required('You must accept the Terms of Service').isTrue(),
});
