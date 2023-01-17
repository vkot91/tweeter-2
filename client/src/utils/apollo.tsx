import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookies from 'js-cookie';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

const authLink = setContext((_, { headers }) => {
  const token = cookies.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = () => {
  const token = cookies.get('token');
  return new GraphQLWsLink(
    createClient({
      url: `${process.env.REACT_APP_WS_URL}`,
      connectionParams: {
        token: token ? `Bearer ${token}` : '',
      },
    }),
  );
};

const uploadLink = createUploadLink({ uri: `${process.env.REACT_APP_API_URL}` });

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink(),
  ApolloLink.from([authLink, uploadLink]),
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ['id', 'action', 'like', 'share'],
            // eslint-disable-next-line default-param-last
            merge(existing = [], incoming, { args }) {
              if (args?.paginationPostsInput) {
                return {
                  ...incoming,
                  items: [...(existing?.items || []), ...incoming.items],
                };
              } else {
                return incoming;
              }
            },
          },
          friendsRequests: {
            merge(_, incoming) {
              return [...incoming];
            },
          },
        },
      },
    },
  }),
});
