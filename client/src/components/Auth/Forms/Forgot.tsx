import { BaseFormTemplate } from 'components/Form';
import { useAuth } from 'context/authed-user-context';

import { ForgotPasswordFormInput } from 'types';
import { forgotPasswordFields } from 'utils/constants/authFormFields';
import { forgotPasswordValidationSchema } from 'utils/validation/forgot-passwors';

export const ForgotPasswordForm = () => {
  const { handleEmailCheck, error } = useAuth();

  return (
    <BaseFormTemplate<ForgotPasswordFormInput>
      fields={forgotPasswordFields}
      validationSchema={forgotPasswordValidationSchema}
      onSubmit={handleEmailCheck}
      submitButtonText='Send email'
      error={error}
    />
  );
};
