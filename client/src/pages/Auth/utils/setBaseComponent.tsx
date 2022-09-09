import { ForgotPasswordForm, LoginForm, RegisterForm, RestorePasswordForm } from 'components/Auth/Forms';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';
import { Button, Link, Text } from '@chakra-ui/react';

export const setBaseComponent = ({ pathname, userEmail }: { pathname: ROUTES_ENUM; userEmail: string | null }) => {
  let formComponent;
  let linkComponent;
  let title;
  let subtitle;
  let action;
  switch (pathname) {
    case `/login`: {
      formComponent = <LoginForm />;
      linkComponent = (
        <Text align='center' mt={3}>
          You haven&apos;t any account?{'  '}
          <Link as={RouterLink} to={ROUTES_ENUM.REGISTER}>
            Sign up
          </Link>
        </Text>
      );
      title = 'Sign in';
      subtitle = `Welcome back, you've been missed!`;
      break;
    }
    case '/register': {
      formComponent = <RegisterForm />;
      linkComponent = (
        <Text align='center' mt={3}>
          Allready have an account?{'  '}
          <Link as={RouterLink} to={ROUTES_ENUM.LOGIN}>
            Sign in
          </Link>
        </Text>
      );
      title = 'Sign up';
      subtitle = 'Create an account to continue and connect with people';
      break;
    }

    case '/register/success': {
      title = 'Check your email';
      subtitle = `We've sent a link to your email address: ${userEmail}`;
      action = (
        <Button as={RouterLink} mt={5} to={ROUTES_ENUM.LOGIN} variant='solid' w='100%'>
          Go Home
        </Button>
      );
      break;
    }

    case '/forgot-password': {
      formComponent = <ForgotPasswordForm />;
      linkComponent = (
        <Text align='center' mt={3}>
          <Link as={RouterLink} to={ROUTES_ENUM.LOGIN}>
            Back to sign in
          </Link>
        </Text>
      );
      title = 'Forgot password?';
      subtitle = 'Enter your details to receive a reset link';
      break;
    }

    case '/restore': {
      formComponent = <RestorePasswordForm defaultEmail={userEmail} />;
      linkComponent = (
        <Text align='center' mt={3}>
          <Link as={RouterLink} to={ROUTES_ENUM.LOGIN}>
            Back to sign in
          </Link>
        </Text>
      );
      title = 'Restore password';
      subtitle = 'Provide new password to change';
      break;
    }

    default: {
      break;
    }
  }
  return { formComponent, linkComponent, title, subtitle, action };
};
