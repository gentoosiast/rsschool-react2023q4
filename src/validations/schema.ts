import { getNames } from 'country-list';
import { boolean, mixed, number, object, ref, string } from 'yup';

import { MAX_AGE, MIN_AGE } from './constants';
import { isFileSizeOK, isFiletypeAllowed } from './test-functions';

export const formSchema = object().shape({
  age: number().required().min(MIN_AGE).max(MAX_AGE).integer(),
  country: string().required().oneOf(getNames(), 'should be valid country'),
  email: string().required().email(),
  gender: string().oneOf(['male', 'female', 'nonbinary']).required(),
  name: string()
    .required()
    .matches(/\p{Lu}/u, 'name must start with a capital letter'),
  password: string()
    .required()
    .matches(/\d/, 'password must contain a number')
    .matches(/\p{Lu}/u, 'password must contain a capital letter')
    .matches(/\p{Ll}/u, 'password must contain a lowercase letter')
    .matches(/[@$!%*#?&^\-+:|/\\]/, 'password must contain a special character'),
  password2: string()
    .required()
    .oneOf([ref('password')], 'Passwords do not match'),
  picture: mixed()
    .required()
    .test('filesize', 'Image filesize is too big', isFileSizeOK)
    .test('filetype', 'Only PNG and JPG images are allowed', isFiletypeAllowed),
  tos: boolean().required().isTrue(),
});
