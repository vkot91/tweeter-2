import { Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';

interface Props {
  title: string;
  route: ROUTES_ENUM | string;
  icon: JSX.Element;
}

export const SidebarItem = ({ title, route, icon }: Props) => {
  const { pathname } = useLocation();

  const activeStyles = {
    bg: 'gray.600',
    color: 'white',
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
    >
      <Flex
        align='center'
        borderRadius='lg'
        px={4}
        py={3}
        role='group'
        cursor='pointer'
        _hover={activeStyles}
        sx={isRouteActive ? activeStyles : {}}
        gap={4}
        mb={2}
      >
        {icon}
        {title}
      </Flex>
    </Link>
  );
};
