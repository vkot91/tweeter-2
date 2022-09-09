import { Box, BoxProps, CloseButton, Flex, HStack, Text, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from 'assets/logo.png';
import { SIDEBAR_MENU_LINKS } from 'utils/constants/menu';
import { SidebarItem } from './Item';
import { LogoutIcon } from 'components/Icons';
import { useAuth } from 'context/authed-user-context';
import { ROUTES_ENUM } from 'utils/constants/routes';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { handleLogout, authedUser } = useAuth();
  const links = SIDEBAR_MENU_LINKS.map((link) => {
    return {
      ...link,
      route: link.title === 'Profile' ? `/profile/${authedUser!.username}` : link.route,
    };
  });
  return (
    <Box
      transition='3s ease'
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      borderBottom='1px solid'
      borderColor='gray.300'
      {...rest}
    >
      <Flex h='20' alignItems='center' justifyContent='space-between' borderBottom='1px solid' borderColor='gray.300'>
        <HStack mx={4}>
          <Link variant='pure' as={RouterLink} to={ROUTES_ENUM.HOME} display='flex' alignItems='flex-end' gap={3}>
            <img
              src={logo}
              alt='Logo'
              style={{
                maxWidth: '3rem',
              }}
            />
            <Text fontSize='2xl' fontWeight='bold'>
              Tweeter
            </Text>
          </Link>
        </HStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box px={5} mt={4}>
        {links.map((link) => (
          <SidebarItem key={link.title} {...link} />
        ))}
        <Button
          onClick={handleLogout}
          variant='text'
          sx={{
            span: {
              paddingRight: 2,
            },
          }}
          leftIcon={<LogoutIcon pr={4} />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};
