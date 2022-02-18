import React, { Fragment, useEffect, useMemo } from "react";
import { Theme, ThemeOptions, createTheme, ThemeProvider } from "@mui/material/styles";

export interface ProviderInjectorProps {
  theme?: Theme;
  themeOptions?: ThemeOptions;
}

export const ProviderInjector: React.FC<ProviderInjectorProps> = ({
  // TODO: Add Apollo here!
  theme: parentTheme,
  themeOptions,
  children,
}) => {
  // TODO: Replace createTheme with custom one.
  const theme = useMemo(() => themeOptions ? createTheme(themeOptions) : parentTheme, [parentTheme, themeOptions]);
  const Wrapper = theme ? ThemeProvider : Fragment;
  const wrapperProps = theme ? { theme } : {};

  useEffect(() => {
    if (parentTheme && themeOptions) {
      throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
    }
  }, [parentTheme, themeOptions]);

  return (
    <Wrapper { ...(wrapperProps as any) }>
      { children }
    </Wrapper>
  );
}

export function withProviders<P extends object>(Component: React.ComponentType<P>) {
  const WithProviders: React.FC<P & ProviderInjectorProps> = ({
    theme,
    themeOptions,
    ...componentProps
  }) => {
    return (
      <ProviderInjector theme={ theme } themeOptions={ themeOptions }>
        <Component { ...componentProps as P } />
      </ProviderInjector>
    );
  };

  return WithProviders;
}
