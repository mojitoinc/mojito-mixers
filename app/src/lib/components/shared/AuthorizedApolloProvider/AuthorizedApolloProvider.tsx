import React, { useCallback, useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  Context,
} from "@apollo/client";
import { isLocalhost } from "../../../domain/url/url.utils";
import { useAuth0 } from "@auth0/auth0-react";
import { setContext } from "@apollo/link-context";

const cache = new InMemoryCache();

export interface AuthorizedApolloProviderProps {
  apolloClient?: ApolloClient<NormalizedCacheObject> | null;
  uri: string;
  getAuthenticationToken: (() => Promise<string | undefined>) | null;
  children?: React.ReactNode;
}

export const AuthorizedApolloProvider: React.FC<AuthorizedApolloProviderProps> = ({
  apolloClient: parentApolloClient,
  uri,
  getAuthenticationToken: parentGetAuthenticationToken,
  children,
}) => {
  const { getIdTokenClaims } = useAuth0();

  const defaultGetAuthenticationToken = useCallback(async () => {
    const token = await getIdTokenClaims();

    return token?.__raw;
  }, [getIdTokenClaims]);

  const getAuthenticationToken = parentGetAuthenticationToken || defaultGetAuthenticationToken;

  const apolloClient = useMemo(() => {
    if (parentApolloClient) return parentApolloClient;

    if (!uri) return null;

    const httpLink = createHttpLink({ uri });

    const authLink = setContext(async (_, { headers }) => {
      const token = await getAuthenticationToken();

      const context: Context = {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${ token }` : "",
        },
      };

      if (isLocalhost()) context.headers["origin-overwrite"] = "https://payments-staging.mojito.xyz/";

      return context;
    });

    const link = authLink.concat(httpLink);

    return new ApolloClient({ uri, link, cache });
  }, [parentApolloClient, uri, getAuthenticationToken]);

  return apolloClient ? <ApolloProvider client={ apolloClient }>{ children }</ApolloProvider> : <>{ children }</>;
}
