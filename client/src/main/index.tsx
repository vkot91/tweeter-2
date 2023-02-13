import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, CircularProgress, ColorModeScript, localStorageManager } from '@chakra-ui/react';
import { ActiveNotificationProvider } from 'context/active-notification-context';
import { AuthProvider } from 'context/authed-user-context';
import { FriendsProvider } from 'context/friends-context';
import { NotificationsProvider } from 'context/notifications-context';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'routes';
import { theme } from 'theme';
import { client } from 'utils/apollo';

export const App = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ApolloProvider client={client}>
        <ChakraProvider colorModeManager={localStorageManager} theme={theme}>
          <Suspense fallback={<CircularProgress />}>
            <BrowserRouter>
              <ActiveNotificationProvider>
                <AuthProvider>
                  <NotificationsProvider>
                    <FriendsProvider>
                      <Routes />
                    </FriendsProvider>
                  </NotificationsProvider>
                </AuthProvider>
              </ActiveNotificationProvider>
            </BrowserRouter>
          </Suspense>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};
