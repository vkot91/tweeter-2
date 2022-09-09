import { Container, Button } from '@chakra-ui/react';
import error from 'assets/404.svg';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';

export const NotFoundPage = () => (
  <Container h='full' textAlign='center'>
    <img src={error} alt='Error' />
    <Button variant='solid' as={RouterLink} to={ROUTES_ENUM.HOME} mt={3}>
      GO HOME
    </Button>
  </Container>
);
