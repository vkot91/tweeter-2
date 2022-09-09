import * as yup from 'yup';

export const postCreateValidationSchema = yup
  .object({
    description: yup
      .string()
      .required('Please enter description')
      .min(10, 'Minimum characters is 10')
      .max(300, 'Maximum characters is 300'),
    // file: yup.mixed().test('required', 'Please select a file', (value) => {
    //   return value && value.length;
    // }),
  })
  .required();
