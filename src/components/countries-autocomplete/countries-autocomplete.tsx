import type { JSX } from 'react';
import { forwardRef } from 'react';

import type { AutoCompleteProps } from '@/components/autocomplete';

import { AutoComplete } from '@/components/autocomplete';
import { useAppSelector } from '@/hooks/rtk-hooks';

type CountriesAutoCompleteProps = Omit<AutoCompleteProps, 'completionSource'>;

export const CountriesAutoComplete = forwardRef<HTMLInputElement, CountriesAutoCompleteProps>(
  (props, ref): JSX.Element => {
    const countries = useAppSelector((state) => state.countries);

    return <AutoComplete completionSource={countries} ref={ref} {...props} />;
  },
);

CountriesAutoComplete.displayName = 'CountriesAutoComplete';
