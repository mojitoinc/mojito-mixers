<br />


<h1 align="center">🍸 Mojito Mixers</h1>

<br /><br />


<p align="center">
  👨‍💻 React components for the Mojito Platform, Reference App and third-party projects, including Mojito's Checkout / Payment UI  and payment sandbox / test app to easily test credit card, ACH, Wire and Crypto payments with Circle, 3DS, Plaid, Vertex and TaxJar integrations.
</p><p align="center">
  🚀 Check it out at <a href="https://payments-staging.mojito.xyz/" target="_blank">https://payments-staging.mojito.xyz/</a>!
</p>

<br />


<p align="center">
  <a href="https://www.npmjs.com/package/@mojitonft/mojito-mixers" target="_blank">
    <img src="https://img.shields.io/npm/v/@mojitonft/mojito-mixers?color=%23CC3534&style=for-the-badge" />
  </a>
</p>

<br />


<p align="center">
  <a href="https://payments-staging.mojito.xyz/" target="_blank">
    <img src="https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/public/img/og-images/mojito-payment-ui.png" width="1280" />
  </a>
</p>

<br />


## Using this library in your project

You can install this project with one of these commands:

    npm install --save @mojitonft/mojito-mixers
    yarn add @mojitonft/mojito-mixers

Alternatively, once you've built the library using `yarn dist:build`, you can install it locally in another project adding
this line to your `package.json`'s dependencies. If you update it, make sure you remove the entry from `yarn.lock` and
re-install it.

    "@mojitonft/mojito-mixers": "file:../mojito-mixers"

Also, make sure you install the following dependencies:

    react
    react-dom
    @mui/material

And also, keep in mind:

- `@emotion/react` is not needed.

- `@emotion/styled` is needed as stated in [MUI's docs](https://mui.com/guides/interoperability/):

    > Keep `@emotion/styled` as a dependency of your project. Even if you never use it explicitly, it's a peer dependency of `@mui/material`.

- `styled-components` is needed as stated in [`react-payment-inputs`' docs](https://github.com/medipass/react-payment-inputs#using-the-built-in-styled-wrapper), but it's not used:

    > Note: <PaymentInputsWrapper> requires styled-components to be installed as a dependency.
    >
    > By default, React Payment Inputs does not have built-in styling for it's inputs. However, React Payment Inputs comes with a styled wrapper which combines the card number, expiry & CVC fields...

<br />


## Usage:

Fist, you need to create a `CheckoutComponent: React.FC<PUICheckoutComponentProps>` component that renders `PUICheckout`
and passes it all required props. Simply copy the following file and adapt it to your needs:

You can find an example here: [app/src/components/checkout-component/CheckoutComponent.tsx](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/components/checkout-component/CheckoutComponent.tsx).

You'll use this `CheckoutComponent` component in your code instead of `PUICheckout` just so that you don't have to
repeat properties that rarely change, like the theme.

Next, add this component to any page where you'd like to show the payment UI, passing it the props returned by the
`useOpenCloseCheckoutModal` hook from this library. It should look something like this:

```TSX
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();
  const { loaderMode, isOpen, onOpen, onClose } = useOpenCloseCheckoutModal({
    paymentIdParam,
    paymentErrorParam,
  });

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <CheckoutComponent
      loaderMode={ loaderMode }
      open={ isOpen }
      onClose={ onClose }
      { ...otherPageSpecificProps } />
  );
```

**Next, make sure you check the sections below for Vertex/TaxJar, Circle, 3DS and Plaid.**

<br />


### Usage with Provider

**Please, do not use this approach, stick to the one above. This is here for reference only. Just skip this section.**

While you might feel tempted to wrap this logic in a custom provider (`CheckoutOverlayProvider` in this example) and
call it using context and a custom hook, note that's usually a bad idea, as you'll have to add the provider in your
App's entry point (`_app.tsx` in Next.js), which will make all your pages heavier, even if the Payment UI is not used.
You should only do this if you App is a SPA, in which case it will look something like this: 

```TSX
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();

  // Add any other pages where you don't want the Payment UI to be rendered:
  const doNotRenderPaymentUI = ["/payments/success", "/payments/error", "/payments/failure"].includes(router.pathname);

  return (
    <CheckoutOverlayProvider
      paymentIdParam={ paymentIdParam }
      paymentErrorParam={ paymentErrorParam }
      checkoutComponent={ CheckoutComponent }
      doNotRenderPaymentUI={ doNotRenderPaymentUI }>
      { ... }
    </CheckoutOverlayProvider>
  );
```

And in the pages where you'd like to use the Payment UI, you need to use your own custom hook (`useCheckoutOverlay` in
this example) to customize and open the Payment UI like this:

```TSX
  const { open, setCheckoutComponentProps } = useCheckoutOverlay();

  const getComponentPropsRef = useRef<() => PUICheckoutComponentProps>(() => ({}));

  getComponentPropsRef.current = () => {
    return {
      orgID: "<orgID>",
      invoiceID: "<invoiceID>",
      checkoutItems: [{
        // Common:
        lotID: "<lotID>", // Mojito API ID
        lotType: "<lotType>",
        name: "<name>",
        description: "<description>",
        imageSrc: "<imageSrc>",
        imageBackground: "<imageBackground>",

        // Buy Now:
        totalSupply: "<totalSupply>",
        remainingSupply: "<remainingSupply>",
        units: "<units>",

        // Auction:
        fee: "<fee>",
      }],
    };
  };

  const handleOpenClicked = useCallback(() => open(getComponentPropsRef.current()), [open]);

  useEffect(() => {
    setCheckoutComponentProps(getComponentPropsRef.current());

  // If some of the fields in the object above can change, add them to the dependencies here:
  }, [setCheckoutComponentProps]);

```

<br />

 
### Address Validation & Tax Calculation with Vertex or TaxJar

If you'd like address to be validated and taxes to be calculated during the checkout process, particularly in the Billing
Information step, you need a Vertex or TaxJar account. Once you have it, you need to configure it in Mojito Mint.

Alternatively, set the following prop to disable those calls to the backend: `vertexEnabled = false`.
  
<br />
  

### Credit Card payments with Circle & 3DS

We use Circle to process credit card payments and 3DS on top of that for fraud detection.
  
When using 3DS for Credit Card payments you need to add a success and error page into your app. The URL can
be anything you want as long as you configure that in your 3DS account. In this repo, those pages are:

- `/payments/success` => [app/src/pages/payments/success.tsx](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/pages/payments/success.tsx).
- `/payments/error` => [app/src/pages/payments/error.tsx](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/pages/payments/error.tsx).

Alternatively, `/payments/failure` is also valid.

You can just copy-paste those into your project as a starting point, only minor changes are needed there. As you can see,
most of the logic in those pages is already provided by this library in your custom `CheckoutComponent` component or in
[`PUIError`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/components/public/ErrorOverlay/ErrorOverlay.tsx).

If you don't have a 3DS account and want to disable fraud detection, you can do that passing `threeDSEnabled={ false }` to `PUICheckout`.

<br />
  
  
### ACH payments with Plaid: 

Additionally, when using Plaid for ACH payments you need to add an `/oauth` page with the following content:

- `/oauth` => [app/src/pages/oauth.tsx](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/pages/oauth.tsx).

<br />
  

### Crypto payments with Coinbase: 

Same as [Credit Card payments with Circle & 3DS](https://github.com/mojitoinc/mojito-mixers#credit-card-payments-with-circle--3ds).

Note that while `PUICheckout` exposes two props to configure Coinbase redirect URLs, with the current implementation, those
might be:

- `coinbaseSuccessURL = "http.../payments/success/?from=coinbase"`.
- `coinbaseErrorURL = "http:.../payments/error/?from=coinbase" `.

<br />
  

### Supported Countries

We use Circle for payments, so the supported countries depend on which payment method is going to be used, as described here:

- https://developers.circle.com/docs/supported-countries

We use the following script to compile the list of excluded countries:

- [app/src/lib/hooks/useCountryOptionsBlacklistScript.js](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/hooks/useCountryOptionsBlacklistScript.js)

<br />
  
  
### Theming 

You can use the `themeOptions` or `theme` props to pass a custom theme or theme options object:

- `themeOptions` (preferred) will merge Mojito's default theme with your custom one.


  ```TSX
  <PUICheckout themeOptions={ YOUR_CUSTOM_THEME_OPTIONS } { ...checkoutModalProps } />

  ```

  See [`extendDefaultTheme(...)`](app/src/lib/config/theme/theme.ts).

- `theme` will completely replace Mojito's default theme with the one you provide.


  ```TSX
  <PUICheckout theme={ YOUR_CUSTOM_THEME } { ...checkoutModalProps } />

  ```

  See 
[`ProvidersInjector`](app/src/lib/components/shared/ProvidersInjector/ProvidersInjector.tsx).

- If none is provided, the [default Mojito theme](app/src/lib/config/theme) will be used.

<br />


Note that using MUI's `ThemeProvider` from your project won't work as expected and you will end up seeing Mojito's default theme:

```TSX
<ThemeProvider theme={ YOUR_CUSTOM_THEME }>
  <PUICheckout { ...checkoutModalProps } />
</ThemeProvider>
```

<br />


### Dictionary

There are some texts inside the Payment UI that you can customize using `PUICheckout`'s `dictionary` prop (more to come, ideally all texts should be customizable). You can find them all with their respective default values here:

[`app/src/lib/domain/dictionary/dictionary.constants.tsx`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/domain/dictionary/dictionary.constants.tsx).

<br />


### Errors, Exceptions and Validation Messages

Error, exception and validation messages in the Payment UI are displayed in the [`ErrorView`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/views/Error/ErrorView.tsx)
and have a configurable button text and action (what the button does or where it takes users when clicking it). Particularly,
those actions are:

- `close`: Closes the payment modal.
- `reset`: Re-creates the reservation/invoice.
- `authentication`: Takes users to the authentication view (currently not used).
- `billing`: Takes users to the billing view/form.
- `payment`: Takes users to the payment view/form.
- `purchasing`: Takes users to the purchasing view and re-tries payment.

<br />


**Error messages**

Defined in [`app/src/lib/domain/errors/errors.constants.ts`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/domain/errors/errors.constants.ts):

- `ERROR_GENERIC = ` An unexpected error happened.

  `action = close`

- `ERROR_LOADING = ` Loading error details...

  `action = close`

- `ERROR_LOADING_TIMEOUT = ` The purchase could not be completed.

  `action = payment`

- `ERROR_LOADING_USER = ` User could not be loaded.

  `action = reset`

- `ERROR_LOADING_PAYMENT_METHODS = ` Payment methods could not be loaded.

  `action = reset`

- `ERROR_LOADING_INVOICE = ` Invoice could not be loaded.

  `action = reset`

- `ERROR_INVOICE_TIMEOUT = ` Your product reservation expired. Please, try to complete the purchase again in time.

  `action = reset`

- `ERROR_PURCHASE_TIMEOUT = ` The purchase could not be completed in time.

  `action = purchasing`

- `ERROR_PURCHASE_NO_ITEMS = ` No items to purchase.

  `action = close`

- `ERROR_PURCHASE_NO_UNITS = ` No units to purchase.

  `action = close`

- `ERROR_PURCHASE_LOADING_ITEMS = ` Purchase items could not be loaded.

  `action = close`

- `ERROR_PURCHASE_SELECTED_PAYMENT_METHOD = ` Could not find the selected payment method.

  `action = reset`

- `ERROR_PURCHASE_CREATING_PAYMENT_METHOD = ` Payment method could not be saved.

  `action = billing`

- `ERROR_PURCHASE_CREATING_INVOICE = ` Invoice could not be created.

  `action = reset`

- `ERROR_PURCHASE_CVV = ` Could not verify CVV.

  `action = payment`

- `ERROR_PURCHASE_PAYING = ` Payment failed.

  `action = purchasing`

<br />

Additionally, there are some backend errors that are mapped to frontend ones:

- `lot auction not started = ` The auction has not started yet.

  `action = close`

- `payment limit exceeded = ` You have already bought the maximum number of NFTs allowed for this sale.

  `action = close`

- `name should contains first and last name = ` Full Name must have at least first and last name.

  `action = billing`

<br />


**Exceptions messages**

Defined in [`app/src/lib/domain/errors/exceptions.constants.ts`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/domain/errors/exceptions.constants.ts):

- `DEV.THEME_PROVIDER = ` (DEV) You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.

- `DEV.APOLLO_PROVIDER_DUPLICATE = ` (DEV) You can't use both `apolloClient` and `uri`. Please, use only one. `uri` is preferred.

- `DEV.APOLLO_PROVIDER_MISSING = ` (DEV) You must set `apolloClient` or `uri`. Please, add one. `uri` is preferred.

- `DEV.ENCRYPTION_KEYS_MISSING = ` (DEV) Missing `publicKey` or `keyID`.

- `PAYMENT_METHOD.UNSUPPORTED = ` Unsupported payment method.

- `PAYMENT_METHOD.CREATION_FAILED = ` Payment method could not be created.

- `PAYMENT_METHOD.VALIDATION_FAILED = ` Payment method could not be validated.

- `PAYMENT_METHOD.VALIDATION_TIMEOUT = ` Payment method validation took too long.

<br />


Note those prefixed with `(DEV)` will never be shown to regular users. Instead, they will see the `ERROR_GENERIC` from above.

<br />


**Validation Messages**

Defined in [`app/src/lib/utils/validationUtils.ts`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/utils/validationUtils.ts):

- `withRequiredErrorMessage = ` `{ label }` is required.

- `withInvalidErrorMessage = ` `{ label }` is not valid.

- `CONSENT_ERROR_MESSAGE = ` You must accept the terms and conditions of the sale.

- `withFullNameErrorMessage = ` `{ label }` must have at least first and last name.

- `withFullNameCharsetErrorMessage = ` `{ label }` contains invalid characters.

- `withPhoneErrorMessage = ` `{ label }` must be a valid phone number.

- `SELECTION_ERROR_MESSAGE = ` You must select a saved and approved payment method or create a new one.

- `withInvalidAddress = ` Please, `{ enter/select }` a valid address to calculate taxes.

- `withInvalidZipCode = ` The `{ label }` you entered does not match the address.

- `withInvalidCardNumber = ` `{ label }` is invalid.

- `withInvalidCVV = ` `{ cvvLabel }` must have `{ cvvExpectedLength }` digits.

- `withInvalidCreditCardNetwork = ` Only `{ acceptedCreditCardNetworks }` `{ is/are }` accepted.

- `DISCOUNT_CODE_INVALID_ERROR_MESSAGE = ` The discount code is invalid or expired.

- `DISCOUNT_CODE_EXCEPTION_ERROR_MESSAGE = ` The discount code could not be validated.

- `withInvalidConnection = ` Could not connect `{ label }`.

<br />


### (Secret) Debug Mode

If you quickly click the logo in the top-right corner 16 times, the debug mode will be enabled (toggled, actually), even in production and regardless of
the initial value you passed for the `debug` prop.

The debug mode will, among logging/displaying some other less relevant pieces of data:

<br />


- Show form values and errors as JSON below the form:

  ![Debug form phone input](./screenshots/debug-phone.png)

  ![Debug form values and errors](./screenshots/debug-form-values.png)

<br />


- Show additional logging information for the most relevant queries/mutation being made:

  ![Debug GraphQL queries/mutations log](./screenshots/graphql-logs.png)

<br />


## TypeScript Support

You will have to add the following file into your project to avoid TypeScript errors when using custom props in MUI's theme:

```TSX
import "@mui/material/styles";
import { PalettePaymentUI } from "@mojitoinc/mojito-mixers";

declare module "@mui/material/styles" {
  interface Palette {
    paymentUI?: PalettePaymentUI;
  }

  interface PaletteOptions {
    paymentUI?: PalettePaymentUI;
  }
}
```

You can see an example here: [`app/src/lib/domain/mui/mui.d.ts`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/domain/mui/mui.d.ts)

<br />


## Error Handling

All components exported by this library are wrapped in a custom [`ErrorBoundary`](https://reactjs.org/docs/error-boundaries.html) so that, in the event of an unexpected error in the library, it doesn't crash your app as well. You can find it here:

[`app/src/lib/components/public/ErrorBoundary/ErrorBoundary.tsx`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/components/public/ErrorBoundary/ErrorBoundary.tsx).

By default, if an unexpected error occurs, a confirm window/modal will be presented to the users asking them if they want to re-open the Payment UI:


<br/>
<p align="center">
  <a href="https://github.com/mojitoinc/mojito-mixers/blob/main/screenshots/error-boundary-confirm.png">
    <img src="./screenshots/error-boundary-confirm.png" />
  </a>
</p>
<br/>


If you don't want this behavior or would like to implement a custom one, you should pass a value for `onCatch: (error: Error, errorInfo?: ErrorInfo) => void | true;` prop with a callback. If you want to get notified about unexpected errors but would still like to preserve the default behavior, return `true` from your callback.

<br />


## `onEvent` callback prop:

The `onEvent` callback prop can be used to get updates about the progress of the user using the Payment UI, which can be useful for analytics:

```TSX
onEvent?: (eventType: CheckoutEventType, eventData: CheckoutEventData) => void;
```

<br />


### `eventType: CheckoutEventType` values:

Events triggered when the user sees a specific view:

- `navigate:authentication`
- `navigate:billing`
- `navigate:payment`
- `navigate:purchasing`
- `navigate:confirmation`
- `navigate:error`

Events triggered when the user performs a specific action:

- `event:paymentSuccess`: The "Purchase" button in the Payment view has been clicked and the payment has been made successfully.
- `event:paymentError`: The "Purchase" button in the Payment view has been clicked and the payment has been attempted, but it failed.

<br />


### `eventData: Partial<CheckoutEventData>` props:

All events will provide this data, but notice some properties are optional, as they might not be available for all steps:

```TSX
interface CheckoutEventData {
  // auth0ID: string; // Not added, already on the parent.
  // checkoutType: string; // Not added, already on the parent.
  // customerId: string; // Not added, already on the parent.

  // Location:
  step: number;
  stepName: string;

  // Purchase:
  departmentCategory: "NFT";
  paymentType?: PaymentType; // "CreditCard" | "ACH" | "Wire" | "Crypto"
  shippingMethod: ShippingMethod; // "custom wallet" | "multisig wallet"
  checkoutItems: CheckoutItem[]; // Provided as this might be a mix of the checkoutItems prop and some additional data from the invoice.

  // Payment:
  currency: "USD";
  revenue: number; // Revenue (subtotal) associated with the transaction, excluding shipping and taxes.
  fees: number;
  tax?: number;
  total: number; // Total value of the order with discounts, taxes and fees.

  // Order:
  processorPaymentID?: string; // Can be used as orderID.
  paymentID?: string; // Can be used as orderID.
}
```

<br />


## Images

The following images are loaded directly from GitHub to avoid bundling them with the library or forcing users to include them in their repos and add the necessary build setup to load them. They should just work out of the box, no setup required:

- `PurchasingView`'s default loader image.
- `ErrorView`'s default error image.
- `PaymentView`'s Circle logo image.

<br/>


**`PurchaseView`'s default loader image:**

<br/>
<p align="center">
  <a href="https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-loader.gif">
    <img src="https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif" width="128" />
  </a>
</p>
<br/>


    > Repo: https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-loader.gif (add `?raw=true` to get the CDN URL below)

    > CDN URL: https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif

<br/>


**`ErrorView`'s default error image:**

<br/>
<p align="center">
  <a href="https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-error-loader.gif">
    <img src="https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-error-loader.gif" width="128" />
  </a>
</p>
<br/>


    > Repo: https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-error-loader.gif (add `?raw=true` to get the CDN URL below)

    > CDN URL: https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-error-loader.gif

<br/>


Alternative static version:

<br/>
<p align="center">
  <a href="https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-error-loader-static.png">
    <img src="https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-error-loader-static.png" width="128" />
  </a>
</p>
<br/>


    > Repo: https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/mojito-error-loader-static.png (add `?raw=true` to get the CDN URL below)

    > CDN URL: https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-error-loader-static.png

<br/>


**`PaymentView`'s Circle logo image:**

<br/>
<p align="center">
  <a href="https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/circle.png">
    <img src="https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/circle.png" height="20" />
  </a>
</p>
<br/>


    > Repo: https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/assets/circle.png (add `?raw=true` to get the CDN URL below)

    > CDN URL: https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/circle.png

<br/>


## Troubleshooting

### API parameter invalid error:

`createPayment` mutation returns:

    "message": "Circle API return non 200 response with body: {\"code\":2,\"message\":\"API parameter invalid\"}",

Make sure:

- You have a 3DS account configured on the backend for the environment you are using (contact support).

- If you are using a GraphQL playground to play around with the API, make sure you use `https://api-dev.mojito.xyz/`.

- If you are triggering the mutation from your app in localhost, make sure you add the header `"origin-overwrite": "https://yourdomain.com"`.

<br/>


## Contributing

### Next.js development playground:

While this project will be installed as a dependency in other apps, it also provides a development/test playground to speed up development and improve DX. In order to use it:

1. First, duplicate [`app/.env`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/.env) to [`app/.env.local`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/.env.local) and add the two missing values.

2. To start the Next.js development playground:

    ```bash
    yarn --cwd app install
    yarn dev
    ```

    This will install the dependencies defined in [`app/package.json`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/package.json) and run the Next.js app inside `./app`.
    
3. Access the project at [http://localhost:3000](http://localhost:3000).

4.  Before committing, be sure to fix all linting errors:

    ```bash
    yarn lint:fix
    ```

<br />


### Test data and environments:

When testing the purchase flow, you need to make sure to:

- Use a real `orgID` and `lotID` that exists in your Mojito account.

  This can either be a Buy Now lot ot an Auction lot that the test user that you are going to use to make the purchase won.

  You can find them using:

    - **Mojito Mint** - [`https://mint.dev.mojito.xyz/`](https://mint.dev.mojito.xyz/).

    - **Mojito API GraphQL Playground** - [`https://api-dev.mojito.xyz/query`](https://api-dev.mojito.xyz/query)

- When paying with credit card, use [Circle's](https://developers.circle.com/docs/introducing-circle-apis) [Test card numbers](https://developers.circle.com/docs/test-card-numbers). As you can see, only Visa and MasterCard are supported.

- If you want to verify the validation of other credit card networks or the functionality of the `PaymentMethodForm` in general, you can use these [test card numbers](https://www.paypalobjects.com/en_GB/vhelp/paypalmanager_help/credit_card_numbers.htm).

- If you want to check 3DS' error handling, see [3DS in Sandbox](https://developers.circle.com/docs/3d-secure-authentication#3d-secure-in-sandbox) on how to force those errors to be triggered in the sandbox environment.

- When paying with ACH, refer to [Plaid's](https://plaid.com/docs/) - [Testing OAuth documentation](https://plaid.com/docs/link/oauth/#testing-oauth).

<br />


## Building this project as a library

The project includes a separated Rollup build to build it as a library that can be installed and consumed by other projects.

To build the lib:

```bash
yarn install
yarn dist:build
```

This builds the library using the Rollup setup at the root of the project and the dependencies defined in [`package.json`](./package.json). It does so by temporarily `mv app/src/lib src`, and undoing that once the lib has been built.

<br />


### GraphQL Codegen

Automatically generated types and hooks from the Mojito GraphQL API:

- [`app/src/services/graphql/generated.tsx`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/services/graphql/generated.tsx)
- [`app/src/lib/queries/graphqlGenerated.tsx`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/queries/graphqlGenerated.tsx)

To update these, first ensure that you're running a local instance of
`mojito-api` (or change `codegen.yml`'s `schema` property to point to the production API) and then run:

```bash
yarn codegen
```

To create new queries or mutations, create a `.graphql` file (for example [`app/src/lib/queries/me.graphql`](https://github.com/mojitoinc/mojito-mixers/blob/main/app/src/lib/queries/me.graphql)) and then run
`yarn codegen` again, and it will automatically find all `.graphql` files in the repo and create typed React hooks from
them. If, for example, the query is called `Organization`, then the auto-generated hook will be called `useOrganizationQuery`.

<br />


## Payment Flows

If you are just using this project as reference to implement your own checkout flow, these are the main flows must implement
as described here.

Note this is pseud-code, so params and return values might not match. The name of the queries/mutations does match, though.

<br />


### Credit Card

- `{ invoiceID } = reserveBuyNowLot({ units, lotID })`

- `{ verifiedAddress, taxes } = getTaxQuote({ address })`

  If Vertex/TaxJar is enabled, verify that the selected address is valid and display appropriate taxes.

- `{ remainingLimits } = validatePaymentLimit({ collectionId, itemsCount })`

  Verify that the selected payment method can be used to buy the selected units.

- `{ paymentMethodID } = createPaymentMethod({ orgID, creditCardData })`

  Needs key from `getPaymentPublicKey` to encrypt part of the credit card data. See [`app/src/lib/utils/encryptionUtils.ts`](app/src/lib/utils/encryptionUtils.ts).
  
- `{ paymentID, processorPaymentID } = createPayment({ invoiceID, paymentMethodID })`

  Needs key from `getPaymentPublicKey` to encrypt part of the credit card data. See [`app/src/lib/utils/encryptionUtils.ts`](app/src/lib/utils/encryptionUtils.ts).

- `{ redirectURL } = getPaymentNotificationQuery()`

  If 3DS is enabled, poll until it returns a `redirectURL`.
  
  Persist the purchase data with `persistCheckoutModalInfo()` and redirect the user there.

- User sees the 3DS page and might have to enter some additional details there.

- 3DS redirects the user to either `/payments/success` or `/payments/error`.

- In the former (success), the purchase data is loaded using `getCheckoutModalState()` and the `ConfirmationView` is
  presented to the user (while still in `/payments/success`).

- In the later (error), we try to load the error details using `getPaymentNotification()`. Users can then click a button
  that takes them back to the product page, which will NOT create a new invoice/reservation. The same process will be 
  resumed and they'll be able to update the information and try again.

<br />


### ACH

- `{ invoiceID } = reserveBuyNowLot({ units, lotID })`

- `{ verifiedAddress, taxes } = getTaxQuote({ address })`

  If Vertex/TaxJar is enabled, verify that the selected address is valid and display appropriate taxes.

- `{ linkToken } = preparePaymentMethod(paymentMethodType: ACH, orgID: $orgID)`

- `{ remainingLimits } = validatePaymentLimit({ collectionId, itemsCount })`

  Verify that the selected payment method can be used to buy the selected units.

- If the limits are fine, the user will be able to click the `Purchase with Plaid` button, which takes them to `linkToken`.

- Once in Plaid's page, users will be able to connect their account, and they'll be redirect to `/oauth`.

- From there, we'll redirect them back to the product page.

- Once in the product page, the purchase data is loaded using `getCheckoutModalState()` and the `PurchasingView` is
  presented to the user (the payment will happen automatically, no additional interaction needed).

- `{ paymentMethodID } = createPaymentMethod({ orgID, achData })`
  
- `{ paymentID, processorPaymentID } = createPayment({ invoiceID, paymentMethodID })`

- Users see the `ConfirmationView`.

<br />
