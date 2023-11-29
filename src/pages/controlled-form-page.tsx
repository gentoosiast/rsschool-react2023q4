import type { TestFunction } from 'yup';

import { useEffect } from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, boolean, mixed, number, object, ref, string } from 'yup';

const MIN_AGE = 1;
const MAX_AGE = 130;

const isFileSizeOK: TestFunction<unknown> = (files: unknown) => {
  const MAX_SIZE = 1024 * 1024;

  if (!(files instanceof FileList)) {
    return false;
  }

  return Array.from(files).every((file) => file.size <= MAX_SIZE);
};

const isFiletypeAllowed: TestFunction<unknown> = (files: unknown) => {
  const ALLOWED_FILETYPES = ['image/png', 'image/jpeg'];

  if (!(files instanceof FileList)) {
    return false;
  }

  return Array.from(files).every((file) => ALLOWED_FILETYPES.includes(file.type));
};

const formSchema = object().shape({
  age: number().required().min(MIN_AGE).max(MAX_AGE).integer(),
  country: string().required(),
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

type FormValues = InferType<typeof formSchema>;

let renderCount = 0;

export const ControlledFormPage = (): JSX.Element => {
  const {
    control,
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      age: 18,
      gender: 'male',
    },
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  renderCount++;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    navigate('/');
  };

  return (
    <div>
      <h1>Controlled Form</h1>
      <h2>render count: {renderCount / 2}</h2>
      <Link to="/">Back to main Page</Link>
      <DevTool control={control} placement="top-right" />

      <form className="form" onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            autoComplete="name"
            id="name"
            type="text"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="age">
            Age
          </label>
          <input
            {...register('age')}
            aria-invalid={errors.age ? 'true' : 'false'}
            id="age"
            max={MAX_AGE}
            min={MIN_AGE}
            type="number"
          />
          {errors.age && <p className="form-error">{errors.age.message}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            autoComplete="email"
            id="email"
            type="email"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <fieldset className="form-fieldset">
          <legend>Password</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Enter password
            </label>
            <input
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              autoComplete="new-password"
              id="password"
              type="password"
            />
            {errors.password && <p className="form-error">{errors.password.message}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password2">
              Confirm password
            </label>
            <input
              {...register('password2')}
              aria-invalid={errors.password2 ? 'true' : 'false'}
              autoComplete="new-password"
              id="password2"
              type="password"
            />
            {errors.password2 && <p className="form-error">{errors.password2.message}</p>}
          </div>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend>Gender</legend>
          <div className="form-row">
            <input {...register('gender')} id="gender-male" type="radio" value="male" />
            <label className="form-label" htmlFor="gender-male">
              Male
            </label>
          </div>

          <div className="form-row">
            <input {...register('gender')} id="gender-female" type="radio" value="female" />
            <label className="form-label" htmlFor="gender-female">
              Female
            </label>
          </div>

          <div className="form-row">
            <input {...register('gender')} id="gender-nonbinary" type="radio" value="nonbinary" />
            <label className="form-label" htmlFor="gender-nonbinary">
              Non-binary
            </label>
          </div>
        </fieldset>

        <div className="form-field">
          <label className="form-label" htmlFor="picture">
            Choose a picture
          </label>
          <input {...register('picture')} accept="image/png, image/jpeg" id="picture" type="file" />
          {errors.picture && <p className="form-error">{errors.picture.message}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="country">
            Choose a country
          </label>
          <input {...register('country')} id="country" type="text" />
        </div>

        <div className="form-row">
          <input {...register('tos')} id="tos" type="checkbox" />
          <label className="form-label" htmlFor="tos">
            By signing up you agree to our Terms of Service and Privacy Policy
          </label>
        </div>

        <button
          className="form-submit-button"
          disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
