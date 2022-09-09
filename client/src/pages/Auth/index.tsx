import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Container, HStack, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { setBaseComponent } from './utils/setBaseComponent';
import { ROUTES_ENUM } from 'utils/constants/routes';
import { useAuth } from 'context/authed-user-context';
import logo from 'assets/logo.png';

export const AuthPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const routeName = pathname as ROUTES_ENUM;
  const [params] = useSearchParams();
  const { handleConfirmEmail } = useAuth();

  const bgColor = useColorModeValue('bg.light.secondary', 'bg.dark.secondary');

  useEffect(() => {
    const token = params.get('token');

    if ((routeName === ROUTES_ENUM.RESGISTER_SUCCESS || routeName === ROUTES_ENUM.RESTORE) && !params.get('email')) {
      navigate(ROUTES_ENUM.LOGIN);
    }
    if (routeName === ROUTES_ENUM.CONFIRM && token) {
      handleConfirmEmail(token);
    }
    if (routeName === ROUTES_ENUM.CONFIRM && !token) {
      navigate(ROUTES_ENUM.LOGIN);
    }
  });

  const { title, subtitle, linkComponent, formComponent, action } = setBaseComponent({
    pathname: routeName,
    userEmail: params.get('email'),
  });

  return (
    <Box minH='100vh' bg={bgColor}>
      <HStack p={5}>
        <Link variant='pure' as={RouterLink} to={`/`} display='flex' alignItems='flex-end' gap={3}>
          <img
            src={logo}
            alt='Logo'
            style={{
              maxWidth: '3rem',
            }}
          />
          <Text fontSize='2xl' fontWeight='bold' lineHeight={1}>
            Tweeter
          </Text>
        </Link>
      </HStack>
      <VStack mt={8} px={3}>
        <Fragment>
          <Text fontSize='4xl' fontWeight='bold'>
            {title}
          </Text>
          <Text>{subtitle}</Text>
          <Container px={7} py={3} layerStyle='box' borderRadius='xl' boxShadow='lg' size='md'>
            {formComponent}
            {linkComponent}
            {action && action}
          </Container>
        </Fragment>
        )
      </VStack>
    </Box>
  );
};
