import type { JSX } from 'react';

import type { AutoCompleteProps } from '@/components/autocomplete';

import { AutoComplete } from '@/components/autocomplete';
import { useAppSelector } from '@/hooks/rtk-hooks';

type CountriesAutoCompleteProps = Omit<AutoCompleteProps, 'completionSource'>;

export const CountriesAutoComplete = (props: CountriesAutoCompleteProps): JSX.Element => {
  const countries = useAppSelector((state) => state.countries);

  return <AutoComplete completionSource={countries} {...props} />;
};
