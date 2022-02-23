import React from "react";
import { Theme, ThemeOptions } from "@mui/material/styles";
import { AuthorizedApolloProviderProps } from "../AuthorizedApolloProvider/AuthorizedApolloProvider";
export interface ProviderInjectorProps extends AuthorizedApolloProviderProps {
    theme?: Theme;
    themeOptions?: ThemeOptions;
}
export declare const ProviderInjector: React.FC<ProviderInjectorProps>;
export declare function withProviders<P extends object>(Component: React.ComponentType<P>): React.FC<P & ProviderInjectorProps>;
