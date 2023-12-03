import { InferType } from 'yup';

import { formSchema } from './schema';

export type FormValues = InferType<typeof formSchema>;
