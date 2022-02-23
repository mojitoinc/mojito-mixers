import React, { useEffect, useMemo } from "react";
import { Theme, ThemeOptions, createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthorizedApolloProvider, AuthorizedApolloProviderProps } from "../AuthorizedApolloProvider/AuthorizedApolloProvider";

export interface ThemeProviderProps {
  theme?: Theme;
  themeOptions?: ThemeOptions;
}

export type ProvidersInjectorProps = ThemeProviderProps & AuthorizedApolloProviderProps;

export const ProviderInjector: React.FC<ProvidersInjectorProps> = ({
  // AuthorizedApolloProviderProps:
  apolloClient,
  uri,

  // ThemeProvider:
  theme: parentTheme,
  themeOptions,

  children,
}) => {
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
    if (apolloClient === null && uri === "") return;

    if (apolloClient && uri) {
      throw new Error("You can't use both `apolloClient` and `uri`. Please, use only one. `uri` is preferred.");
    }

    if (!apolloClient && !uri) {
      throw new Error("You must set `apolloClient` or  `uri`. Please, add one. `uri` is preferred.");
    }
  }, [apolloClient, uri]);

  return (
    <AuthorizedApolloProvider apolloClient={ apolloClient } uri={ uri }>
      { theme ? <ThemeProvider theme={ theme }>{ children }</ThemeProvider> : children }
    </AuthorizedApolloProvider>
  );
}

export function withThemeProvider<P extends object>(Component: React.ComponentType<P>) {
  const WithThemeProvider: React.FC<P & ThemeProviderProps> = ({
    theme,
    themeOptions,
    ...componentProps
  }) => {
    return (
      <ProviderInjector apolloClient={ null } uri="" theme={ theme } themeOptions={ themeOptions }>
        <Component { ...componentProps as P } />
      </ProviderInjector>
    );
  };

  return WithThemeProvider;
}

export function withProviders<P extends object>(Component: React.ComponentType<P>) {
  const WithProviders: React.FC<P & ProvidersInjectorProps> = ({
    apolloClient,
    uri,
    theme,
    themeOptions,
    ...componentProps
  }) => {
    return (
      <ProviderInjector apolloClient={ apolloClient } uri={ uri } theme={ theme } themeOptions={ themeOptions }>
        <Component { ...componentProps as P } />
      </ProviderInjector>
    );
  };

  return WithProviders;
}
