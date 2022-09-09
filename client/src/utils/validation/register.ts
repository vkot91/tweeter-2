import * as yup from 'yup';

export const registerValidationSchema = yup
  .object({
    username: yup.string().required('Please enter username').min(5).max(30),
    firstName: yup.string().required('Please enter your first name').min(5).max(30),
    secondName: yup.string().required('Please enter your second name').min(5).max(30),
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
