import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo, useEffect } from 'react';
import { AuthorizedApolloProvider } from '../AuthorizedApolloProvider/AuthorizedApolloProvider.js';
import createTheme from '../../../../node_modules/@mui/material/styles/createTheme.js';
import { ThemeProvider } from '@mui/system';

const ProviderInjector = ({ 
// AuthorizedApolloProviderProps:
apolloClient, uri, 
// ThemeProvider
theme: parentTheme, themeOptions, children, }) => {
    // TODO: Replace createTheme with custom one.
    const theme = useMemo(() => themeOptions ? createTheme(themeOptions) : parentTheme, [parentTheme, themeOptions]);
    useEffect(() => {
        if (parentTheme && themeOptions) {
            throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
        }
        if (!parentTheme && !themeOptions) {
            throw new Error("You must set `themeOptions` or `theme`. Please, add one. `themeOptions` is preferred.");
        }
    }, [parentTheme, themeOptions]);
    useEffect(() => {
        if (apolloClient && uri) {
            throw new Error("You can't use both `apolloClient` and `uri`. Please, use only one. `uri` is preferred.");
        }
        if (!apolloClient && !uri) {
            throw new Error("You must set `apolloClient` or  `uri`. Please, add one. `uri` is preferred.");
        }
    }, [apolloClient, uri]);
    return (React__default.createElement(AuthorizedApolloProvider, { apolloClient: apolloClient, uri: uri }, theme ? React__default.createElement(ThemeProvider, { theme: theme }, children) : children));
};
function withProviders(Component) {
    const WithProviders = (_a) => {
        var { apolloClient, uri, theme, themeOptions } = _a, componentProps = __rest(_a, ["apolloClient", "uri", "theme", "themeOptions"]);
        return (React__default.createElement(ProviderInjector, { apolloClient: apolloClient, uri: uri, theme: theme, themeOptions: themeOptions },
            React__default.createElement(Component, Object.assign({}, componentProps))));
    };
    return WithProviders;
}

export { ProviderInjector, withProviders };
//# sourceMappingURL=ProvidersInjector.js.map
