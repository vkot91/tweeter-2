import { BaseFormTemplate } from 'components/Form';
import { useAuth } from 'context/authed-user-context';

import { RegisterFormInput } from 'types';
import { registerFields } from 'utils/constants/authFormFields';
import { registerValidationSchema } from 'utils/validation';

export const RegisterForm = () => {
  const { handleRegister, error } = useAuth();

  return (
    <BaseFormTemplate<RegisterFormInput>
      fields={registerFields}
      validationSchema={registerValidationSchema}
      onSubmit={handleRegister}
      submitButtonText='Sign up'
      error={error}
    />
  );
};
