import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const updateUserValidationSchema = yup.object({
  username: yup.string().min(5, 'Username must be at least 5 characters').max(30).required('Username is required'),
  firstName: yup.string().min(5, 'First name must be at least 5 characters').max(30).required('First name is required'),
  secondName: yup
    .string()
    .min(5, 'Last name must be at least 5 characters')
    .max(30)
    .required('Second name is required'),
  email: yup.string().email('Please provide email in correct format').required().required('Email is required'),
  location: yup
    .string()
    .nullable()
    .optional()
    .transform((o, c) => (o === '' ? undefined : c))
    .min(3, 'Location must be at least 3 characters')
    .max(30),
  bio: yup
    .string()
    .nullable()
    .optional()
    .transform((o, c) => (o === '' ? undefined : c))
    .min(5, 'Bio must be at least 5 characters')
    .max(300),
  phone: yup
    .string()
    .nullable()
    .optional()
    .transform((o, c) => (o === '' ? undefined : c))
    .matches(phoneRegExp, 'Phone number is not valid'),
});
