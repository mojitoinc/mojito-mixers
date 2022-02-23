import React, { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

const cache = new InMemoryCache();

export interface AuthorizedApolloProviderProps {
  apolloClient?: ApolloClient<NormalizedCacheObject> | null;
  uri: string;
}

export const AuthorizedApolloProvider: React.FC<AuthorizedApolloProviderProps> = ({
  apolloClient: parentApolloClient,
  uri,
  children,
}) => {
  const { getIdTokenClaims } = useAuth0();

  const apolloClient = useMemo(() => {
    if (parentApolloClient) return parentApolloClient;

    if (!uri) return null;

    const httpLink = createHttpLink({ uri });

    const authLink = setContext(async (_, { headers }) => {
      const token = await getIdTokenClaims();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${ token.__raw }` : "",
        },
      };
    });

    const link = authLink.concat(httpLink);

    return new ApolloClient({ uri, link, cache });
  }, [parentApolloClient, uri, getIdTokenClaims]);

  return apolloClient ? <ApolloProvider client={ apolloClient }>{ children }</ApolloProvider> : <>{ children }</>;
}
