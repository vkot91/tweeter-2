import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Please provide email in correct format').required('Please enter email'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    )
    .required('Password is required'),
});
