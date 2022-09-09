import { ApolloClient, InMemoryCache, Observable, ApolloLink, split, Operation, FetchResult } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookies from 'js-cookie';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient, ClientOptions, Client } from 'graphql-ws';
import { print } from 'graphql';

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        },
      );
    });
  }
}

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
  return new WebSocketLink({
    url: `${process.env.REACT_APP_WS_URL}`,
    connectionParams: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
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
            keyArgs: ['id'],
            // eslint-disable-next-line default-param-last
            merge(existing = [], incoming) {
              return {
                ...incoming,
                items: [...(existing?.items || []), ...incoming.items],
              };
            },
          },
          // comments: {
          //   keyArgs: ['tweetId', 'id'],
          //   // eslint-disable-next-line default-param-last
          //   merge(existing = [], incoming) {
          //     if (incoming && existing.items && incoming?.items.length > existing?.items.length) {
          //       return {
          //         ...incoming,
          //       };
          //     }
          //     return {
          //       ...incoming,
          //       items: [...(existing?.items || []), ...incoming.items],
          //     };
          //   },
          // },
          // user: {
          //   keyArgs: ['followers', 'followings'],
          // },
        },
      },
    },
  }),
});
