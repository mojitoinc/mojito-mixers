import App from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { GlobalLayout } from "../components/core/GlobalLayout";
import { config } from "../utils/config/config.constants";
import { AppProps } from "next/app";
import { Header } from "../components/core/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Head from "next/head";
import { AuthorizedApolloProvider } from "../lib/components/shared/AuthorizedApolloProvider/AuthorizedApolloProvider";

const defaultTheme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={ config.AUTH0_DOMAIN }
      clientId={ config.AUTH0_CLIENTID }
      redirectUri={ config.AUTH_REDIRECT_URI }>

      <Head>
        <title>Mojito - Payment UI Playground</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>

      <AuthorizedApolloProvider uri={ `${ config.API_HOSTNAME }/query` }>
        <ThemeProvider theme={ defaultTheme }>
          <GlobalLayout>
            <Header />
            <Component { ...pageProps } />
          </GlobalLayout>
        </ThemeProvider>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
