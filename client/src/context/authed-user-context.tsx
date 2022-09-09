import { CircularProgress, Flex } from '@chakra-ui/react';
import {
  RegularUserFragment,
  useConfirmMutation,
  useForgotPasswordMutation,
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
} from 'generated/graphql';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ForgotPasswordFormInput, LoginFormInput, RegisterFormInput } from 'types';
import { ROUTES_ENUM } from 'utils/constants/routes';
import cookie from 'js-cookie';

interface AuthContextInterface {
  authedUser: RegularUserFragment | null;
  error?: {
    key: string;
    message: string | undefined;
  } | null;
  handleLogin: (values: LoginFormInput) => void;
  handleRegister: (values: RegisterFormInput) => void;
  handleConfirmEmail: (token: string) => void;
  handleEmailCheck: (values: ForgotPasswordFormInput) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const { data: userData, error: userError, refetch: refetchUser } = useMeQuery();
  const [authedUser, setAuthedUser] = useState<RegularUserFragment | null>(null);
  const [login, { error: loginError }] = useLoginMutation();
  const [register, { error: registrationError }] = useRegisterMutation();
  const [confirm, { error: confirmError }] = useConfirmMutation();
  const [forgotPassword, { error: forgotPasswordError }] = useForgotPasswordMutation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthContextInterface['error'] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setAuthedUser(userData.me);
      setLoading(false);
    }
    if (userError || confirmError) {
      setAuthedUser(null);
      setLoading(false);
    }
  }, [userData, userError, confirmError]);

  useEffect(() => {
    const validationError = loginError || registrationError || forgotPasswordError;
    if (validationError) {
      setError({
        key: 'email',
        message: validationError?.message,
      });
    }
  }, [loginError, registrationError, forgotPasswordError]);

  const handleLogin = async (values: LoginFormInput) => {
    const { remember, ...restValues } = values;
    const { data } = await login({
      variables: {
        loginInput: restValues,
      },
    });
    if (data && data.login.user && data.login.token) {
      const { user, token } = data.login;
      setAuthedUser(user);

      if (token && remember) {
        cookie.set('token', token, {
          expires: 1,
        });
      }
    }
  };

  const handleRegister = async (values: RegisterFormInput) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm: _, ...createUserInput } = values;
    const { data } = await register({
      variables: {
        createUserInput,
      },
    });
    if (data?.register) {
      navigate({
        pathname: ROUTES_ENUM.RESGISTER_SUCCESS,
        search: createSearchParams({
          email: values.email,
        }).toString(),
      });
    }
  };

  const handleConfirmEmail = async (token: string) => {
    console.log('handleConfirmEmail');
    const { data } = await confirm({
      variables: {
        token,
      },
    });
    if (data?.confirm && token) {
      setLoading(true);
      cookie.set('token', token, {
        expires: 1,
      });
      await refetchUser();
      setLoading(false);
      navigate(ROUTES_ENUM.HOME);
    }
  };

  const handleLogout = useCallback(() => {
    setAuthedUser(null);
    cookie.remove('token');
    navigate(ROUTES_ENUM.LOGIN);
  }, [navigate]);

  const handleEmailCheck = async (values: ForgotPasswordFormInput) => {
    const { email } = values;
    const { data } = await forgotPassword({
      variables: {
        email,
      },
    });
    if (data?.forgotPassword) {
      navigate({
        pathname: ROUTES_ENUM.RESTORE,
        search: createSearchParams({
          email,
        }).toString(),
      });
    }
  };

  const value = {
    authedUser,
    handleLogin,
    handleLogout,
    handleRegister,
    handleConfirmEmail,
    handleEmailCheck,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Flex h='100vh' alignItems='center' justifyContent='center'>
          <CircularProgress size='100' isIndeterminate />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authedUser = useContext(AuthContext);
  return authedUser;
};

export { useAuth };
