import React from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
export interface AuthorizedApolloProviderProps {
    apolloClient?: ApolloClient<NormalizedCacheObject>;
    uri?: string;
}
export declare const AuthorizedApolloProvider: React.FC<AuthorizedApolloProviderProps>;
