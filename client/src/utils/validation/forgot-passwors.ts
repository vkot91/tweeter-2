import * as yup from 'yup';

export const forgotPasswordValidationSchema = yup
  .object({
    email: yup.string().email('Please provide email in correct format').required('Please enter email'),
  })
  .required();
