import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '../../../../node_modules/@apollo/client/link/context/index.js';
import { useAuth0 } from '@auth0/auth0-react';

const AuthorizedApolloProvider = ({ uri, children, }) => {
    const { getIdTokenClaims } = useAuth0();
    const httpLink = createHttpLink({
        uri: uri,
    });
    const authLink = setContext((_, { headers }) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield getIdTokenClaims();
        return {
            headers: token ? Object.assign(Object.assign({}, headers), { authorization: `Bearer ${token.__raw}` }) : headers,
        };
    }));
    const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        uri: uri,
        cache: new InMemoryCache(),
    });
    return React__default.createElement(ApolloProvider, { client: apolloClient }, children);
};

export { AuthorizedApolloProvider };
//# sourceMappingURL=AuthorizedApolloProvider.js.map
