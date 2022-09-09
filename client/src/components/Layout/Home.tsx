import { Box, Drawer, DrawerContent, Grid, GridItem, Show, useColorModeValue, useDisclosure } from '@chakra-ui/react';

import { SidebarContent } from 'components/Sidebar/LeftSide';
import { Header } from 'components/Layout/Header';
import { FriendsList } from 'components/Sidebar/RightSide/Friends/List';
import { useLocation } from 'react-router-dom';

export const HomeLayout = ({ children }: { children: JSX.Element }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  const isProfilePage = pathname.includes('/profile');

  const bg = useColorModeValue(
    isProfilePage ? 'bg.light.primary' : 'bg.light.secondary',
    isProfilePage ? 'bg.dark.primary' : 'bg.dark.secondary',
  );

  return (
    <Box minH='100vh'>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />
      <Grid
        ml={{ base: 0, md: 60 }}
        minH='100vh'
        templateColumns={{ base: '1fr', sm: '1fr', md: '1fr', lg: isProfilePage ? '1fr' : '0.9fr 0.3fr' }}
        gap={1}
      >
        <GridItem mt='80px' bg={bg} transform='translate3d(0,0,0)' p={8}>
          {children}
        </GridItem>
        {!isProfilePage && (
          <Show above='lg'>
            <GridItem px={5} mt='100px'>
              <FriendsList />
            </GridItem>
          </Show>
        )}
      </Grid>
    </Box>
  );
};
