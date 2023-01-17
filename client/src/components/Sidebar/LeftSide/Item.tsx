import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';

interface Props {
  title: string;
  route: ROUTES_ENUM | string;
  icon: JSX.Element;
  counter?: number;
  handleClose: () => void;
}

export const SidebarItem = ({ title, route, icon, counter, handleClose }: Props) => {
  const { pathname } = useLocation();

  const activeStyles = {
    bg: 'gray.600',
    color: 'white',
    borderRadius: 15,
  };

  const isRouteActive = pathname.includes(route);

  return (
    <Link
      key={title}
      to={route}
      as={RouterLink}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      fontSize='lg'
      variant='menu'
      onClick={handleClose}
    >
      <Flex
        align='center'
        borderRadius='lg'
        justifyContent='flex-start'
        pl={4}
        pr={0}
        py={3}
        role='group'
        cursor='pointer'
        _hover={activeStyles}
        sx={isRouteActive ? activeStyles : {}}
        mb={2}
        gap={3}
      >
        {icon}
        {title}
        {counter && (
          <Box w='20px' h='20px' bg='red.400' color='white' fontSize='13px' textAlign='center' borderRadius='50%'>
            {counter}
          </Box>
        )}
      </Flex>
    </Link>
  );
};
