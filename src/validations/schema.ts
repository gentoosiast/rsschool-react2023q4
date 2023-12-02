import { getNames } from 'country-list';
import { boolean, mixed, number, object, ref, string } from 'yup';

import { MAX_AGE, MIN_AGE, MIN_PASSWORD_LENGTH } from './constants';
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
    .matches(/\d/, 'Password must contain a number')
    .matches(/\p{Lu}/u, 'Password must contain a capital letter')
    .matches(/\p{Ll}/u, 'Password must contain a lowercase letter')
    .matches(/[@$!%*#?&^\-+:|/\\]/, 'Password must contain a special character'),
  password2: string()
    .required()
    .oneOf([ref('password')], 'Passwords do not match'),
  picture: mixed((input): input is FileList => input instanceof FileList)
    .required()
    .test('filesize', 'Image filesize is too big', isFileSizeOK)
    .test('filetype', 'Only PNG and JPG images are allowed', isFiletypeAllowed),
  tos: boolean().required('You must accept the Terms of Service').isTrue(),
});
