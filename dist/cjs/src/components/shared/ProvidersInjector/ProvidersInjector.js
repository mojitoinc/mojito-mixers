'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var AuthorizedApolloProvider = require('../AuthorizedApolloProvider/AuthorizedApolloProvider.js');
var theme = require('../../../config/theme/theme.js');
var system = require('@mui/system');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ProviderInjector = ({ 
// AuthorizedApolloProviderProps:
apolloClient, uri, 
// ThemeProvider:
theme: parentTheme, themeOptions, children, }) => {
    const theme$1 = React.useMemo(() => parentTheme !== null && parentTheme !== void 0 ? parentTheme : theme.extendDefaultTheme(themeOptions), [parentTheme, themeOptions]);
    React.useEffect(() => {
        if (parentTheme && themeOptions) {
            throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
        }
    }, [parentTheme, themeOptions]);
    React.useEffect(() => {
        if (apolloClient === null && uri === "")
            return;
        if (apolloClient && uri) {
            throw new Error("You can't use both `apolloClient` and `uri`. Please, use only one. `uri` is preferred.");
        }
        if (!apolloClient && !uri) {
            throw new Error("You must set `apolloClient` or  `uri`. Please, add one. `uri` is preferred.");
        }
    }, [apolloClient, uri]);
    return (React__default["default"].createElement(AuthorizedApolloProvider.AuthorizedApolloProvider, { apolloClient: apolloClient, uri: uri }, theme$1 ? React__default["default"].createElement(system.ThemeProvider, { theme: theme$1 }, children) : children));
};
function withThemeProvider(Component) {
    const WithThemeProvider = (_a) => {
        var { theme, themeOptions } = _a, componentProps = tslib_es6.__rest(_a, ["theme", "themeOptions"]);
        return (React__default["default"].createElement(ProviderInjector, { apolloClient: null, uri: "", theme: theme, themeOptions: themeOptions },
            React__default["default"].createElement(Component, Object.assign({}, componentProps))));
    };
    return WithThemeProvider;
}
function withProviders(Component) {
    const WithProviders = (_a) => {
        var { apolloClient, uri, theme, themeOptions } = _a, componentProps = tslib_es6.__rest(_a, ["apolloClient", "uri", "theme", "themeOptions"]);
        return (React__default["default"].createElement(ProviderInjector, { apolloClient: apolloClient, uri: uri, theme: theme, themeOptions: themeOptions },
            React__default["default"].createElement(Component, Object.assign({}, componentProps))));
    };
    return WithProviders;
}

exports.ProviderInjector = ProviderInjector;
exports.withProviders = withProviders;
exports.withThemeProvider = withThemeProvider;
//# sourceMappingURL=ProvidersInjector.js.map
