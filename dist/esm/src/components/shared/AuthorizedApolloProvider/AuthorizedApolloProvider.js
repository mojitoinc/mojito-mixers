import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo } from 'react';
import { InMemoryCache, createHttpLink, ApolloClient, ApolloProvider } from '@apollo/client';
import { setContext } from '../../../../node_modules/@apollo/client/link/context/index.js';
import { useAuth0 } from '@auth0/auth0-react';

const cache = new InMemoryCache();
const AuthorizedApolloProvider = ({ apolloClient: parentApolloClient, uri, children, }) => {
    const { getIdTokenClaims } = useAuth0();
    const apolloClient = useMemo(() => {
        if (parentApolloClient)
            return parentApolloClient;
        const httpLink = createHttpLink({ uri });
        const authLink = setContext((_, { headers }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield getIdTokenClaims();
            return {
                headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token.__raw}` : "" }),
            };
        }));
        const link = authLink.concat(httpLink);
        return new ApolloClient({ uri, link, cache });
    }, [parentApolloClient, uri, getIdTokenClaims]);
    return React__default.createElement(ApolloProvider, { client: apolloClient }, children);
};

export { AuthorizedApolloProvider };
//# sourceMappingURL=AuthorizedApolloProvider.js.map
