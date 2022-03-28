import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo, useEffect } from 'react';
import { AuthorizedApolloProvider } from '../AuthorizedApolloProvider/AuthorizedApolloProvider.js';
import { extendDefaultTheme } from '../../../config/theme/theme.js';
import { ErrorBoundary } from '../../public/ErrorBoundary/ErrorBoundary.js';
import { EXCEPTIONS } from '../../../domain/errors/exceptions.constants.js';
import { ThemeProvider } from '@mui/system';

const ProviderInjector = ({ 
// AuthorizedApolloProviderProps:
apolloClient, uri, 
// ThemeProvider:
theme: parentTheme, themeOptions, children, }) => {
    const theme = useMemo(() => parentTheme !== null && parentTheme !== void 0 ? parentTheme : extendDefaultTheme(themeOptions), [parentTheme, themeOptions]);
    useEffect(() => {
        if (parentTheme && themeOptions) {
            throw new Error(EXCEPTIONS.DEV.THEME_PROVIDER);
        }
    }, [parentTheme, themeOptions]);
    useEffect(() => {
        if (apolloClient === null && uri === "")
            return;
        if (apolloClient && uri) {
            throw new Error(EXCEPTIONS.DEV.APOLLO_PROVIDER_DUPLICATE);
        }
        if (!apolloClient && !uri) {
            throw new Error(EXCEPTIONS.DEV.APOLLO_PROVIDER_MISSING);
        }
    }, [apolloClient, uri]);
    return (React__default.createElement(AuthorizedApolloProvider, { apolloClient: apolloClient, uri: uri }, theme ? React__default.createElement(ThemeProvider, { theme: theme }, children) : children));
};
function withThemeProvider(Component) {
    const WithThemeProvider = (_a) => {
        var { theme, themeOptions, onCatch } = _a, componentProps = __rest(_a, ["theme", "themeOptions", "onCatch"]);
        return (React__default.createElement(ErrorBoundary, { onCatch: onCatch },
            React__default.createElement(ProviderInjector, { apolloClient: null, uri: "", theme: theme, themeOptions: themeOptions },
                React__default.createElement(Component, Object.assign({}, componentProps)))));
    };
    return WithThemeProvider;
}
function withProviders(Component) {
    const WithProviders = (_a) => {
        var { apolloClient, uri, theme, themeOptions, onCatch } = _a, componentProps = __rest(_a, ["apolloClient", "uri", "theme", "themeOptions", "onCatch"]);
        return (React__default.createElement(ErrorBoundary, { onCatch: onCatch },
            React__default.createElement(ProviderInjector, { apolloClient: apolloClient, uri: uri, theme: theme, themeOptions: themeOptions },
                React__default.createElement(Component, Object.assign({}, componentProps)))));
    };
    return WithProviders;
}

export { ProviderInjector, withProviders, withThemeProvider };
//# sourceMappingURL=ProvidersInjector.js.map
