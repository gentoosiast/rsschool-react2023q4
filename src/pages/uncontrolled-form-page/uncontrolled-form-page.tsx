import type { FormEvent, JSX } from 'react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ValidationError } from 'yup';

import type { LocationState } from '@/router';

import { CountriesAutoComplete } from '@/components/countries-autocomplete';
import { PasswordInput } from '@/components/password-input';
import { useAppDispatch } from '@/hooks/rtk-hooks';
import { MainLayout } from '@/layout';
import { readFileToBase64 } from '@/lib/read-file-to-base64';
import { RoutePath } from '@/router';
import { addFormSubmit } from '@/store';
import { ALLOWED_FILETYPES, MAX_AGE, MIN_AGE, formSchema } from '@/validations';

let renderCount = 0;

type FormErrors = Record<string, string[]>;

export const UncontrolledFormPage = (): JSX.Element => {
  renderCount++;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pictureRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const displayErrors = (errors: FormErrors, field: string): JSX.Element[] => {
    return (
      errors[field] &&
      errors[field].map((errorMessage) => (
        <p className="form-error" key={errorMessage}>
          {errorMessage}
        </p>
      ))
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const formValues: Record<string, unknown> = {};

    for (const [key, val] of form.entries()) {
      if (key === 'tos') {
        formValues[key] = val === 'on';
        continue;
      }
      formValues[key] = val;
    }
    formValues.picture = pictureRef.current?.files;

    try {
      const result = formSchema.validateSync(formValues, { abortEarly: false });
      if (result.picture instanceof FileList) {
        readFileToBase64(result.picture[0])
          .then((pictureBase64) => {
            const parsedData = { ...result, picture: pictureBase64, submitDate: Date.now() };

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
    } catch (error) {
      if (error instanceof ValidationError) {
        const formErrors: FormErrors = {};

        for (const err of error.inner) {
          if (err.path) {
            formErrors[err.path] = err.errors;
          }
        }

        setErrors(formErrors);
      }
    }
  };

  return (
    <MainLayout>
      <h1>Unontrolled Form</h1>
      <h2>render count: {renderCount / 2}</h2>
      <Link to={RoutePath.MAIN}>Back to main Page</Link>

      <form className="form" name="uncontrolled-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-required
            autoComplete="name"
            className="form-input"
            defaultValue=""
            id="name"
            name="name"
            required
            type="text"
          />
          {displayErrors(errors, 'name')}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="age">
            Age
          </label>
          <input
            aria-invalid={errors.age ? 'true' : 'false'}
            aria-required
            className="form-input"
            defaultValue="18"
            id="age"
            max={MAX_AGE}
            min={MIN_AGE}
            name="age"
            required
            type="number"
          />
          {displayErrors(errors, 'age')}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-required
            autoComplete="email"
            className="form-input"
            defaultValue=""
            id="email"
            name="email"
            required
            type="email"
          />
          {displayErrors(errors, 'email')}
        </div>

        <fieldset className="form-fieldset">
          <legend>Password</legend>
          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Enter password
            </label>
            <PasswordInput
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-required
              autoComplete="new-password"
              className="form-input"
              id="password"
              name="password"
              required
              type="password"
            />
            {displayErrors(errors, 'password')}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password2">
              Confirm password
            </label>
            <input
              aria-invalid={errors.password2 ? 'true' : 'false'}
              aria-required
              autoComplete="new-password"
              className="form-input"
              defaultValue=""
              id="password2"
              name="password2"
              required
              type="password"
            />
            {displayErrors(errors, 'password2')}
          </div>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend>Gender</legend>
          <div className="form-row">
            <input
              className="form-input"
              defaultChecked
              id="gender-male"
              name="gender"
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
              id="gender-female"
              name="gender"
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
              id="gender-nonbinary"
              name="gender"
              type="radio"
              value="nonbinary"
            />
            <label className="form-label" htmlFor="gender-nonbinary">
              Non-binary
            </label>
          </div>
          {displayErrors(errors, 'gender')}
        </fieldset>

        <div className="form-field">
          <label className="form-label" htmlFor="picture">
            Choose a picture
          </label>
          <input
            accept={ALLOWED_FILETYPES.join(',')}
            aria-required
            className="form-input"
            id="picture"
            name="picture"
            ref={pictureRef}
            required
            type="file"
          />
          {displayErrors(errors, 'picture')}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="country">
            Choose a country
          </label>
          <CountriesAutoComplete name="country" />
          {displayErrors(errors, 'country')}
        </div>

        <div className="form-field">
          <div className="form-row">
            <input
              className="form-input"
              defaultChecked={false}
              id="tos"
              name="tos"
              type="checkbox"
            />
            <label className="form-label" htmlFor="tos">
              By signing up you agree to our Terms of Service and Privacy Policy
            </label>
          </div>
          {displayErrors(errors, 'tos')}
        </div>

        <button className="form-submit-button" type="submit">
          Submit
        </button>
      </form>
    </MainLayout>
  );
};
