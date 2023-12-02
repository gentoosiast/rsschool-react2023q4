import { useEffect } from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';

import type { LocationState } from '@/router';
import type { FormValues } from '@/validations';

import { AutoComplete } from '@/components/autocomplete';
import { PasswordInput } from '@/components/password-input';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk-hooks';
import { MainLayout } from '@/layout';
import { readFileToBase64 } from '@/lib/read-file-to-base64';
import { RoutePath } from '@/router';
import { setReactHookForm } from '@/store';
import { ALLOWED_FILETYPES, MAX_AGE, MIN_AGE, formSchema } from '@/validations';

let renderCount = 0;

export const ReactHookFormPage = (): JSX.Element => {
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
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries);
  // const { ref: countryRef, ...rest } = register('country');
  // const countryRef2 = useRef<HTMLInputElement>(null);

  const res = register('country');
  for (const key of Object.keys(res)) {
    console.log(`k = ${key}`);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  renderCount++;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.picture instanceof FileList) {
      readFileToBase64(data.picture[0])
        .then((pictureBase64) => {
          const parsedData = { ...data, picture: pictureBase64 };
          dispatch(setReactHookForm(parsedData));

          const locationState: LocationState = {
            from: 'rhfForm',
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
      <h2>render count: {renderCount / 2}</h2>
      <Link to={RoutePath.MAIN}>Back to main Page</Link>
      <DevTool control={control} placement="top-right" />

      <form
        className="form"
        name="react-hook-form"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      >
        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            autoComplete="name"
            className="form-input"
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
            className="form-input"
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
            className="form-input"
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
            <PasswordInput
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              autoComplete="new-password"
              className="form-input"
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
              className="form-input"
              id="password2"
              type="password"
            />
            {errors.password2 && <p className="form-error">{errors.password2.message}</p>}
          </div>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend>Gender</legend>
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
        </fieldset>

        <div className="form-field">
          <label className="form-label" htmlFor="picture">
            Choose a picture
          </label>
          <input
            className="form-input"
            {...register('picture')}
            accept={ALLOWED_FILETYPES.join(',')}
            id="picture"
            type="file"
          />
          {errors.picture && <p className="form-error">{errors.picture.message}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="country">
            Choose a country
          </label>
          {/* <input className="form-input" {...register('country')} id="country" type="text" /> */}
          <AutoComplete completionSource={countries} {...register('country')} />
          {errors.country && <p className="form-error">{errors.country.message}</p>}
        </div>

        <div className="form-row">
          <input className="form-input" {...register('tos')} id="tos" type="checkbox" />
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
    </MainLayout>
  );
};
