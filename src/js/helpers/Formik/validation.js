import * as Yup from 'yup';

import strings from 'translations';

export const AuthorSchema = () =>
  Yup.object().shape({
    first_name: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .max(100, strings.formatString(strings.validation.max, { num: 100 }))
      .required(strings.validation.required),
    last_name: Yup.string().max(100, strings.formatString(strings.validation.max, { num: 100 })),
  });
