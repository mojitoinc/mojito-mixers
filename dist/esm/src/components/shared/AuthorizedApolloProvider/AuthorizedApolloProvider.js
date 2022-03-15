import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo } from 'react';
import { InMemoryCache, createHttpLink, ApolloClient, ApolloProvider } from '@apollo/client';
import { setContext } from '../../../../node_modules/@apollo/client/link/context/index.js';
import { useAuth0 } from '@auth0/auth0-react';
import { isLocalhost } from '../../../domain/url/url.utils.js';

const cache = new InMemoryCache();
const AuthorizedApolloProvider = ({ apolloClient: parentApolloClient, uri, children, }) => {
    const { getIdTokenClaims } = useAuth0();
    const apolloClient = useMemo(() => {
        if (parentApolloClient)
            return parentApolloClient;
        if (!uri)
            return null;
        const httpLink = createHttpLink({ uri });
        const authLink = setContext((_, { headers }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield getIdTokenClaims();
            const context = {
                headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token.__raw}` : "" }),
            };
            if (isLocalhost())
                context.headers["origin-overwrite"] = "https://payments-staging.mojito.xyz/";
            return context;
        }));
        const link = authLink.concat(httpLink);
        return new ApolloClient({ uri, link, cache });
    }, [parentApolloClient, uri, getIdTokenClaims]);
    return apolloClient ? React__default.createElement(ApolloProvider, { client: apolloClient }, children) : React__default.createElement(React__default.Fragment, null, children);
};

export { AuthorizedApolloProvider };
//# sourceMappingURL=AuthorizedApolloProvider.js.map
