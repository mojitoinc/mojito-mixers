<h1 align="center">Mojito Payment UI</h1>

<p align="center">
    👨‍💻 Payment UI modal & playground UI to easily test it.
</p><p align="center">
    🚀 Check it out at <a href="https://payments-staging.mojito.xyz/" target="_blank">https://payments-staging.mojito.xyz/</a>!
</p><p align="center">
    ⚠️ This is still in alpha, use with caution.
</p>

<br />


<p align="center">
    <a href="https://payments-staging.mojito.xyz/" target="_blank">
        <img src="./app/public/img/og-images/mojito-payment-ui.png" width="1280" />
    </a>
</p>

<br />


## Working on the project

### Next.js development playground:

While this project will be installed as a dependency in other apps, it also provides a development/test playground to speed up development and improve DX. In order to use it:

1. First, duplicate [`app/.env`](./app/.env) to [`app/.env.local`](./app/.env.local) and add the two missing values.

2. To start the Next.js development playground:

    ```bash
    yarn --cwd app install
    yarn dev
    ```

    This will install the dependencies defined in [`app/package.json`](./app/package.json) and run the Next.js app inside `./app`.
    
3. Access the project at [http://localhost:3000](http://localhost:3000).

4.  Before committing, be sure to run:

    ```bash
    yarn prettier
    yarn lint
    ```

    There is also `yarn lint:fix` which can automatically fix some lint issues.

<br />


### Test data and environments:

When testing the purchase flow, you need to make sure to:

- Use a real `orgID` and `lotID` that exists in your Mojito account.

  This can either be a Buy Now lot ot an Auction lot that the test user that you are going to use to make the purchase won.

  You can find them using:

    - **Mojito Manager** - [Dashboard (`orgID`)](https://app.mojito.xyz/dashboard), [Collections (`lotID`)](https://app.mojito.xyz/<path-to-collection>)

    - **Mojito API** - [GraphQL Playground](https://api.dev.mojito.xyz/query)

    - **Contentful API** - [GraphQL Playground](https://graphql.contentful.com/content/v1/spaces/fu9did2d8yaw/environments/staging/explore?access_token=19vUSnF3_8S-OsepxXBcDAI_Ua3GbwSy5c7HNTXB-R0)

- When paying with credit card, use [Circle's](https://developers.circle.com/docs/introducing-circle-apis) [Test card numbers](https://developers.circle.com/docs/test-card-numbers)

- When paying with ACH, refer to [Plaid's](https://plaid.com/docs/) - [Testing OAuth documentation](https://plaid.com/docs/link/oauth/#testing-oauth).

<br />


- Include units in UI.

- Buy multiple units of same one.

---

- Make it possible to edit units (not supported).
- Center loader.
- Close modal?
- Modal version?
- Wide auth screen?
- Does ESC close the modal even if blocked?



## Building this project as a library

The project includes a separated Rollup build to build it as a library that can be installed and consumed by other projects.

To build the lib:

```bash
yarn install
yarn dist:build
```

This builds the library using the Rollup setup at the root of the project and the dependencies defined in [`package.json`](./package.json). It does so by temporarily `mv app/src/lib src`, and undoing that once the lib has been built.

<br />


## GraphQL Codegen

Automatically generated types and hooks from the Mojito GraphQL API:

- [`app/src/services/graphql/generated.tsx`](./app/src/services/graphql/generated.tsx)
- [`app/src/lib/queries/graphqlGenerated.tsx`](./app/src/lib/queries/graphqlGenerated.tsx)

To update these, first ensure that you're running a local instance of
`mojito-api` (or change `codegen.yml`'s `schema` property to point to the production API) and then run:

```bash
yarn codegen
```

To create new queries or mutations, create a `.graphql` file (for example [`app/src/lib/queries/me.graphql`](./app/src/lib/queries/me.graphql)) and then run
`yarn codegen` again, and it will automatically find all `.graphql` files in the repo and create typed React hooks from
them. If, for example, the query is called `Organization`, then the auto-generated hook will be called `useOrganizationQuery`.

<br />


## Using this project as a library

Once you've built the library using `yarn dist:build`, you can install it in another project with one of these options
(until it's published in NPM):

    "@mojitoinc/mojito-mixers": "file:../mojito-mixers"
    "@mojitoinc/mojito-mixers": "git+ssh://git@github.com/mojitoinc/mojito-mixers"

<br />


### Usage:

```TSX

import {
  CheckoutModal,
  CheckoutModalProps,
  CheckoutModalThemeProvider,
  continuePlaidOAuthFlow,
} from "@mojitoinc/mojito-mixers";

const App: React.FC<AppProps> = () => {
  const { profile } = useProfile();

  const [isOpen, setIsOpen] = useState(continuePlaidOAuthFlow());

  const { loginWithPopup, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleError = useCallback((error: ApolloError | Error | string) => {
    // Log to Sentry or something else.
  }, []);

  const handleMarketingOptInChange = useCallback((marketingOptIn: boolean) => {
    // Subscribe / unsubscribe
  }, []);

  const handleLogin = useCallback(async () => {
    await loginWithPopup({ prompt: "login" });
    await getIdTokenClaims();
  }, [loginWithPopup, getIdTokenClaims]);
  
  const checkoutModalProps: CheckoutModalProps = {
    // Modal:
    open,
    onClose: handleClose,

    // Flow:
    guestCheckoutEnabled: false,
    productConfirmationEnabled: false,

    // Personalization:
    // These two options, `theme` and `themeOptions`, merge the provided styles with the default ones:
    theme: YOUR_CUSTOM_THEME,
    // themeOptions: { ... },
    logoSrc: "https://...",
    logoSx: { ... },
    purchasingImageSrc: "https://...",
    purchasingMessages: ["...", "...", "..."],
    errorImageSrc: "https://...",
    userFormat: "email",
    acceptedPaymentTypes: ["CreditCard", "ACH"],
    purchaseInstructions: "Lorem ipsum...",

    // Legal:
    consentType: "disclaimer",
    privacyHref: "https://...",
    termsOfUseHref: "https://...",

    // Data:
    orgID: "<ORG_ID>, usually profile.userOrgs[0].organizationId || """,
    checkoutItem: {
      lotID: "<LOT_IT>",
      buyNow: "auction",
      name: "Lorem ipsum...",
      description: "Lorem ipsum...",
      price: 0,
      fee: 0,
      imageSrc: "https://...",
      imageBackground: "rgba(...)",
    },
    
    // Authentication:
    onLogin: handleLogin,
    isAuthenticated,
    isAuthenticatedLoading: isLoading,

    // Other Events:
    debug: true,
    onError: handleError,
    onMarketingOptInChange: handleMarketingOptInChange,
  };

  return <CheckoutModal { ...checkoutModalProps } />;
};
```

<br />


### Theming 

You can use the `theme` or `themeOptions` props to pass a custom theme or theme options object, both of which will get
merged with the default theme (this hasn't been implemented yet, though).

If you want to completely override the theme and make sure your custom theme doesn't get merged with the default one,
you can use `CheckoutModalThemeProvider`. Make sure you import it from `@mojitoinc/mojito-mixers`.

```TSX
<CheckoutModalThemeProvider theme={ YOUR_CUSTOM_THEME }>
  <CheckoutModal { ...checkoutModalProps } />
</CheckoutModalThemeProvider>
```

Note that using MUI's `ThemeProvider` from your project won't work as expected and the modal will not be styled using
your custom theme. If you want to learn why, read here: https://stackoverflow.com/questions/70710518/

<br />


### ACH payments with Plaid: 

Additionally, when using Plaid for ACH payments you need to add an `/oauth` page with the following logic to be able
to resume Plaid's OAuth flow when users are redirected back to your app:

<br />


```TSX

const PlaidOAuthPage = () => {
  const router = useRouter();

  const { continueOAuthFlow, url } = getPlaidOAuthFlowState();

  useEffect(() => {
    if (continueOAuthFlow) {
      persistPlaidReceivedRedirectUri(window.location.href);
    }

    router.replace(url || "/");
  }, [continueOAuthFlow, router, url]);

  return null;
};
```

<br />


## TypeScript Support

You will have to copy the following file into your project to avoid TypeScript errors when using custom props in MUI's theme:

[`app/src/lib/domain/mui/mui.d.ts`](./app/src/lib/domain/mui/mui.d.ts).

<br />


## Images

The `PurchasingView` and `ErrorView` default images are loaded directly from GitHub to avoid bundling them with the library
or forcing users to include them in their repos and add the necessary build setup to load them. They should just work out
of the box, no setup required.

**`PurchaseView`'s default image:**

<p>
  <a href="https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-loader.gif">
    <img src="./app/src/lib/assets/mojito-loader.gif" width="128">
  </a>
</p>


    > Repo: https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-loader.gif (add `?raw=true` to get the CDN URL below)

    > CDN URL: https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif

    
**`ErrorView`'s default image:**

<p>
  <a href="https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-error.gif">
    <img src="./app/src/lib/assets/mojito-error.gif" width="128">
  </a>
</p>

    > Repo: To be added...

    > CDN URL: To be added...

    