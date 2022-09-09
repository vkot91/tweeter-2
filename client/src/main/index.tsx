import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, CircularProgress, ColorModeScript, localStorageManager } from '@chakra-ui/react';
import { AuthProvider } from 'context/authed-user-context';
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
              <AuthProvider>
                <Routes />
              </AuthProvider>
            </BrowserRouter>
          </Suspense>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};
