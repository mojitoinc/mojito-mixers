import React from "react";
import { Theme, ThemeOptions } from "@mui/material/styles";
import { AuthorizedApolloProviderProps } from "../AuthorizedApolloProvider/AuthorizedApolloProvider";
export interface ThemeProviderProps {
    theme?: Theme;
    themeOptions?: ThemeOptions;
}
export declare type ProvidersInjectorProps = ThemeProviderProps & AuthorizedApolloProviderProps;
export declare const ProviderInjector: React.FC<ProvidersInjectorProps>;
export declare function withThemeProvider<P extends object>(Component: React.ComponentType<P>): React.FC<P & ThemeProviderProps & {
    onCatch?: ((error: Error) => void) | undefined;
}>;
export declare function withProviders<P extends object>(Component: React.ComponentType<P>): React.FC<P & ThemeProviderProps & AuthorizedApolloProviderProps & {
    onCatch?: ((error: Error) => void) | undefined;
}>;
