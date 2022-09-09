import { loginValidationSchema } from 'utils/validation';
import { BaseFormTemplate } from 'components/Form';
import { loginFields } from 'utils/constants/authFormFields';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';
import { useAuth } from 'context/authed-user-context';

export const LoginForm = () => {
  const { handleLogin, error } = useAuth();
  return (
    <BaseFormTemplate
      fields={loginFields}
      validationSchema={loginValidationSchema}
      onSubmit={handleLogin}
      submitButtonText='Sign in'
      error={error}
    >
      <Link as={RouterLink} to={ROUTES_ENUM.FORGOT_PASSWORD} variant='underlined'>
        Forgot password?
      </Link>
    </BaseFormTemplate>
  );
};
