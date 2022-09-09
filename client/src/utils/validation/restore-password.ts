import * as yup from 'yup';

export const restorePasswordValidationSchema = yup
  .object({
    email: yup.string().email('Please provide email in correct format').required('Please enter email'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      )
      .required('Password is required'),
    passwordConfirm: yup.string().when('password', {
      is: (val: string) => !!(val && val.length > 0),
      then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
    }),
  })
  .required();
