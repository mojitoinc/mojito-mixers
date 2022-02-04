import React, { PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

export function AuthorizedApolloProvider({
  uri,
  children,
}: PropsWithChildren<{ uri: string }>) {
  const { getIdTokenClaims } = useAuth0();

  const httpLink = createHttpLink({
    uri: uri,
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getIdTokenClaims();

    return {
      headers: token ? {
        ...headers,
        authorization: `Bearer ${token.__raw}`,
      } : headers,
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: uri,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
