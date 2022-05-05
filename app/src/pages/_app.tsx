import { Auth0Provider } from "@auth0/auth0-react";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import Head from "next/head";
import { GlobalStyles } from "@mui/material";
import { AuthorizedApolloProvider } from "../lib/components/shared/AuthorizedApolloProvider/AuthorizedApolloProvider";
import { Header } from "../components/core/Header";
import { config } from "../utils/config/config.constants";
import { GLOBAL_STYLES } from "../components/core/global-styles.constants";
import { Container } from "../components/core/Container";

const defaultTheme = createTheme();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Auth0Provider
      domain={ config.AUTH0_DOMAIN }
      clientId={ config.AUTH0_CLIENTID }
      redirectUri={ config.AUTH_REDIRECT_URI }>

      <Head>
        <title>Mojito - Payment UI Playground</title>

        <link rel="shortcut icon" href="/favicon.png" />

        { /* eslint-disable-next-line @next/next/no-css-tags */ }
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>

      <AuthorizedApolloProvider uri={ `${ config.API_HOSTNAME }/query` } getAuthenticationToken={ null }>
        <ThemeProvider theme={ defaultTheme }>

          <GlobalStyles styles={ GLOBAL_STYLES } />

          <Container>
            <Header />
            <Component { ...pageProps } />
          </Container>

        </ThemeProvider>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  );
};

/*
MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
*/

export default MyApp;
