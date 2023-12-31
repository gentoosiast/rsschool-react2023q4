import { useEffect } from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import type { LocationState } from '@/router';
import type { FormValues } from '@/validations';

import { CountriesAutoComplete } from '@/components/countries-autocomplete';
import { PasswordInput } from '@/components/password-input';
import { useAppDispatch } from '@/hooks/rtk-hooks';
import { MainLayout } from '@/layout';
import { readFileToBase64 } from '@/lib/read-file-to-base64';
import { RoutePath } from '@/router';
import { addFormSubmit } from '@/store';
import { ALLOWED_FILETYPES, MAX_AGE, MIN_AGE, formSchema } from '@/validations';

import styles from './react-hook-form-page.module.css';

export const ReactHookFormPage = (): JSX.Element => {
  const {
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      age: 18,
      gender: 'male',
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.picture instanceof FileList && data.picture.length > 0) {
      readFileToBase64(data.picture[0])
        .then((pictureBase64) => {
          const parsedData = { ...data, picture: pictureBase64, submitDate: Date.now() };

          dispatch(addFormSubmit(parsedData));

          const locationState: LocationState = {
            submitDate: parsedData.submitDate,
          };

          navigate(RoutePath.MAIN, { state: locationState });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <MainLayout>
      <h1>React Hook Form</h1>
      <nav className={styles.nav}>
        <Link to={RoutePath.MAIN}>Back to Main Page</Link>
      </nav>

      <form
        className="form"
        name="react-hook-form"
        noValidate={true}
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      >
        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-required
            autoComplete="name"
            className="form-input"
            id="name"
            type="text"
          />
          <div className="form-errors">
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="age">
            Age
          </label>
          <input
            {...register('age')}
            aria-invalid={errors.age ? 'true' : 'false'}
            aria-required
            className="form-input"
            id="age"
            max={MAX_AGE}
            min={MIN_AGE}
            type="number"
          />
          <div className="form-errors">
            {errors.age && <p className="form-error">{errors.age.message}</p>}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-required
            autoComplete="email"
            className="form-input"
            id="email"
            type="email"
          />
          <div className="form-errors">
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
        </div>

        <fieldset className="form-fieldset">
          <legend>Password</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Enter password
            </label>
            <PasswordInput
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-required
              autoComplete="new-password"
              className="form-input"
              id="password"
              type="password"
            />
            <div className="form-errors">
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password2">
              Confirm password
            </label>
            <input
              {...register('password2')}
              aria-invalid={errors.password2 ? 'true' : 'false'}
              aria-required
              autoComplete="new-password"
              className="form-input"
              id="password2"
              type="password"
            />
            <div className="form-errors">
              {errors.password2 && <p className="form-error">{errors.password2.message}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend>Gender</legend>
          <div className="form-row">
            <div className="form-row">
              <input
                className="form-input"
                {...register('gender')}
                id="gender-male"
                type="radio"
                value="male"
              />
              <label className="form-label" htmlFor="gender-male">
                Male
              </label>
            </div>

            <div className="form-row">
              <input
                className="form-input"
                {...register('gender')}
                id="gender-female"
                type="radio"
                value="female"
              />
              <label className="form-label" htmlFor="gender-female">
                Female
              </label>
            </div>

            <div className="form-row">
              <input
                className="form-input"
                {...register('gender')}
                id="gender-nonbinary"
                type="radio"
                value="nonbinary"
              />
              <label className="form-label" htmlFor="gender-nonbinary">
                Non-binary
              </label>
            </div>
          </div>
        </fieldset>

        <div className="form-field">
          <label className="form-label" htmlFor="picture">
            Choose a picture
          </label>
          <input
            className="form-input"
            {...register('picture')}
            accept={ALLOWED_FILETYPES.join(',')}
            aria-invalid={errors.picture ? 'true' : 'false'}
            aria-required
            id="picture"
            type="file"
          />
          <div className="form-errors">
            {errors.picture && <p className="form-error">{errors.picture.message}</p>}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="country">
            Country
          </label>
          <CountriesAutoComplete
            {...register('country')}
            aria-invalid={errors.country ? 'true' : 'false'}
            aria-required
            id="country"
            required
          />
          <div className="form-errors">
            {errors.country && <p className="form-error">{errors.country.message}</p>}
          </div>
        </div>

        <div className="form-field">
          <div className="form-row">
            <input
              className="form-input"
              {...register('tos')}
              aria-invalid={errors.tos ? 'true' : 'false'}
              aria-required
              id="tos"
              required
              type="checkbox"
            />
            <label className="form-label" htmlFor="tos">
              By signing up you agree to our Terms of Service and Privacy Policy
            </label>
          </div>
          <div className="form-errors">
            {errors.tos && <p className="form-error">{errors.tos.message}</p>}
          </div>
        </div>

        <button
          className="form-submit-button"
          disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
        >
          Submit
        </button>
      </form>
    </MainLayout>
  );
};
