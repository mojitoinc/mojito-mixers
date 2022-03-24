'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var Apollo = require('@apollo/client');
var index = require('../../../../node_modules/@apollo/client/link/context/index.js');
var auth0React = require('@auth0/auth0-react');
var url_utils = require('../../../domain/url/url.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const cache = new Apollo.InMemoryCache();
const AuthorizedApolloProvider = ({ apolloClient: parentApolloClient, uri, children, }) => {
    const { getIdTokenClaims } = auth0React.useAuth0();
    const apolloClient = React.useMemo(() => {
        if (parentApolloClient)
            return parentApolloClient;
        if (!uri)
            return null;
        const httpLink = Apollo.createHttpLink({ uri });
        const authLink = index.setContext((_, { headers }) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
            const token = yield getIdTokenClaims();
            const context = {
                headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token.__raw}` : "" }),
            };
            if (url_utils.isLocalhost())
                context.headers["origin-overwrite"] = "https://payments-staging.mojito.xyz/";
            return context;
        }));
        const link = authLink.concat(httpLink);
        return new Apollo.ApolloClient({ uri, link, cache });
    }, [parentApolloClient, uri, getIdTokenClaims]);
    return apolloClient ? React__default["default"].createElement(Apollo.ApolloProvider, { client: apolloClient }, children) : React__default["default"].createElement(React__default["default"].Fragment, null, children);
};

exports.AuthorizedApolloProvider = AuthorizedApolloProvider;
//# sourceMappingURL=AuthorizedApolloProvider.js.map
