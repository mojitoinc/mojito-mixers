import React, { ErrorInfo } from "react";
import { Theme, ThemeOptions } from "@mui/material/styles";
import { AuthorizedApolloProviderProps } from "../AuthorizedApolloProvider/AuthorizedApolloProvider";
export interface CommonProviderProps {
    onCatch?: (error: Error, errorInfo?: ErrorInfo) => void | true;
}
export interface ThemeProviderProps extends CommonProviderProps {
    theme?: Theme;
    themeOptions?: ThemeOptions;
}
export declare type ProvidersInjectorProps = ThemeProviderProps & AuthorizedApolloProviderProps;
export declare const ProviderInjector: React.FC<ProvidersInjectorProps>;
export declare function withThemeProvider<P extends object>(Component: React.ComponentType<P>): React.FC<P & ThemeProviderProps>;
export declare function withProviders<P extends object>(Component: React.ComponentType<P>): React.FC<P & ThemeProviderProps & AuthorizedApolloProviderProps>;
