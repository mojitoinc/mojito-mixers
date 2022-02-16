import { ApolloError } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Typography, Box, Stack, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, TextField, Switch, Select, MenuItem, InputLabel, FormGroup, Checkbox } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckoutModal, CheckoutModalProps, continuePlaidOAuthFlow, PaymentType } from "../lib";
import { useMeQuery } from "../services/graphql/generated";
import { PLAYGROUND_PARAGRAPHS_ARRAY, PLAYGROUND_AUTH_PRESET, PLAYGROUND_NO_AUTH_PRESET, PLAYGROUND_PRIVACY_HREF, PLAYGROUND_PURCHASE_INSTRUCTIONS, PLAYGROUND_TERMS_OF_USE_HREF, PLAYGROUND_USER_FORMAT, PLAYGROUND_PURCHASING_IMAGE_SRC, PLAYGROUND_ERROR_IMAGE_SRC, PLAYGROUND_THEMES, PLAYGROUND_LOGOS_SRC, PLAYGROUND_LOGOS_SX, PLAYGROUND_MOCKED_LOT, PLAYGROUND_LOADER_IMAGE_SRC } from "../utils/playground/playground.constants";
import { PlaygroundFormData } from "../utils/playground/playground.interfaces";

const DEFAULT_FORM_VALUES: PlaygroundFormData = {
  // Organization:
  orgID: "custom",
  customOrgID: "",

  // Invoice (for won auction lots):
  invoiceID: "",

  // Lot:
  lotID: "",
  lotType: "buyNow",
  lotUnits: 1,
  lotUnitPrice: 100,
  lotFee: 5,

  // Personalization:
  theme: "light",
  customImages: false,
  notAuthPreset: "noAuthGuestDisabled",
  authPresets: "authConfirmationDisabled",

  // Payment:
  paymentCC: true,
  paymentACH: true,
  paymentWire: false,
  paymentCrypto: false,
};

const FORM_VALUES_KEY = "FORM_VALUES_KEY";

let INITIAL_FORM_VALUES: Partial<PlaygroundFormData> = {};

if (process.browser) {
  try {
    INITIAL_FORM_VALUES = JSON.parse(localStorage.getItem(FORM_VALUES_KEY) || "{}") as Partial<PlaygroundFormData>;
  } catch(err) {
    console.log(err);
  }
}

const HomePage = () => {
  const firstTimeRef = useRef(true);
  const [open, setOpen] = useState(false);
  const { loginWithPopup, isAuthenticated, isLoading: isAuthenticatedLoading, getIdTokenClaims } = useAuth0();
  const { data: meData, loading: meLoading, error: meError } = useMeQuery({ skip: !isAuthenticated });
  const isLoading = isAuthenticatedLoading || meLoading;
  const organizations = isLoading ? [] : (meData?.me?.userOrgs || []).map(userOrg => userOrg.organization);

  useEffect(() => {
    if (continuePlaidOAuthFlow()) console.log("💾 Continue Plaid OAuth Flow...");
  }, []);

  useEffect(() => {
    if (isLoading ||
    firstTimeRef.current === false ||
    (INITIAL_FORM_VALUES.lotType === "auction" && !INITIAL_FORM_VALUES.invoiceID) ||
    (INITIAL_FORM_VALUES.orgID === "custom" && !INITIAL_FORM_VALUES.customOrgID)) return;

    firstTimeRef.current = false;

    setOpen(true);
  }, [isAuthenticated, isLoading, meData]);

  const handleOpen = useCallback(() => {
    // TODO: Pass a prop to indicate the user started adding info.
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleError = useCallback((error: ApolloError | Error | string) => {
    console.log(error);
  }, []);

  const handleMarketingOptInChange = useCallback((marketingOptIn: boolean) => {
    console.log(marketingOptIn ? "User subscribed" : "User unsubscribed");
  }, []);

  const handleLogin = useCallback(async () => {
    await loginWithPopup({ prompt: "login" });

    const token = await getIdTokenClaims();

    console.log({ token });
  }, [loginWithPopup, getIdTokenClaims]);

  const [formValues, setFormValues] = useState<PlaygroundFormData>(DEFAULT_FORM_VALUES);

  useEffect(() => {
    setFormValues({
      // Organization:
      orgID: INITIAL_FORM_VALUES.orgID || DEFAULT_FORM_VALUES.orgID,
      customOrgID: INITIAL_FORM_VALUES.customOrgID || DEFAULT_FORM_VALUES.customOrgID,

      // Invoice (for won auction lots):
      invoiceID: INITIAL_FORM_VALUES.invoiceID || DEFAULT_FORM_VALUES.invoiceID,

      // Lot:
      lotID: INITIAL_FORM_VALUES.lotID || DEFAULT_FORM_VALUES.lotID,
      lotType: INITIAL_FORM_VALUES.lotType || DEFAULT_FORM_VALUES.lotType,
      lotUnits: INITIAL_FORM_VALUES.lotUnits || DEFAULT_FORM_VALUES.lotUnits,
      lotUnitPrice: INITIAL_FORM_VALUES.lotUnitPrice || DEFAULT_FORM_VALUES.lotUnitPrice,
      lotFee: INITIAL_FORM_VALUES.lotFee || DEFAULT_FORM_VALUES.lotFee,

      // Personalization:
      theme: INITIAL_FORM_VALUES.theme || DEFAULT_FORM_VALUES.theme,
      customImages: INITIAL_FORM_VALUES.customImages || DEFAULT_FORM_VALUES.customImages,
      notAuthPreset: INITIAL_FORM_VALUES.notAuthPreset || DEFAULT_FORM_VALUES.notAuthPreset,
      authPresets: INITIAL_FORM_VALUES.authPresets || DEFAULT_FORM_VALUES.authPresets,

      // Payment:
      paymentCC: INITIAL_FORM_VALUES.paymentCC || DEFAULT_FORM_VALUES.paymentCC,
      paymentACH: INITIAL_FORM_VALUES.paymentACH || DEFAULT_FORM_VALUES.paymentACH,
      paymentWire: INITIAL_FORM_VALUES.paymentWire || DEFAULT_FORM_VALUES.paymentWire,
      paymentCrypto: INITIAL_FORM_VALUES.paymentCrypto || DEFAULT_FORM_VALUES.paymentCrypto,
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FORM_VALUES_KEY, JSON.stringify(formValues));
    } catch (err) {
      console.log(err);
    }
  }, [formValues]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: (type === "radio" || type === "checkbox") && value === "" ? checked : value,
    }));
  };

  const testPreset = (isAuthenticated ? PLAYGROUND_AUTH_PRESET[formValues.authPresets] : PLAYGROUND_NO_AUTH_PRESET[formValues.notAuthPreset]) || {};

  const checkoutModalProps: CheckoutModalProps = {
    // Modal:
    open,
    onClose: handleClose,

    // Flow:
    guestCheckoutEnabled: testPreset.guestCheckoutEnabled,
    productConfirmationEnabled: testPreset.productConfirmationEnabled,

    // Personalization:
    theme: PLAYGROUND_THEMES[formValues.theme],
    logoSrc: PLAYGROUND_LOGOS_SRC[formValues.theme],
    logoSx: PLAYGROUND_LOGOS_SX[formValues.theme],
    loaderImageSrc: formValues.customImages ? PLAYGROUND_LOADER_IMAGE_SRC : "",
    purchasingImageSrc: formValues.customImages ? PLAYGROUND_PURCHASING_IMAGE_SRC : "",
    purchasingMessages: undefined,
    errorImageSrc: formValues.customImages ? PLAYGROUND_ERROR_IMAGE_SRC : "",
    userFormat: PLAYGROUND_USER_FORMAT,
    acceptedPaymentTypes: [
      formValues.paymentCC ? "CreditCard" : "",
      formValues.paymentACH ? "ACH" : "",
      formValues.paymentWire ? "Wire" : "",
      formValues.paymentCrypto ? "Crypto" : "",
    ].filter(Boolean) as PaymentType[],
    purchaseInstructions: PLAYGROUND_PURCHASE_INSTRUCTIONS,

    // Legal:
    consentType: "checkbox",
    privacyHref: PLAYGROUND_PRIVACY_HREF,
    termsOfUseHref: PLAYGROUND_TERMS_OF_USE_HREF,

    // Data:
    orgID: (formValues.orgID === "custom" ? formValues.customOrgID : formValues.orgID) || "",
    checkoutItems: [{
      ...PLAYGROUND_MOCKED_LOT,
      lotID: formValues.lotID || PLAYGROUND_MOCKED_LOT.lotID,
      lotType: formValues.lotType || PLAYGROUND_MOCKED_LOT.lotType,
      units: parseInt(`${ formValues.lotUnits || PLAYGROUND_MOCKED_LOT.units }`, 10) || 1,
      unitPrice: parseInt(`${ formValues.lotUnitPrice || PLAYGROUND_MOCKED_LOT.unitPrice }`, 10) || 0,
      fee: parseInt(`${ formValues.lotFee || PLAYGROUND_MOCKED_LOT.fee }`, 10) || 0,
    }],

    // Authentication:
    onLogin: handleLogin,
    isAuthenticated,
    isAuthenticatedLoading,

    // Other Events:
    debug: true,
    onError: handleError,
    onMarketingOptInChange: handleMarketingOptInChange,
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Stack spacing={ 2 } direction="row">
          <Button variant="contained" onClick={ handleOpen } disabled={ isLoading }>Open Checkout Modal</Button>
        </Stack>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Organization</FormLabel>
            <RadioGroup
              name="orgID"
              value={ formValues.orgID }
              onChange={ handleChange }>

              { organizations.map((organization) => (
                <FormControlLabel
                  key={ organization.id }
                  value={ organization.id }
                  control={<Radio />}
                  label={ organization.name } />
              )) }

              <FormControlLabel
                value="custom"
                control={<Radio />}
                sx={{ mt: 1 }}
                label={
                  <TextField
                    name="customOrgID"
                    label="Custom Org ID"
                    size="small"
                    value={ formValues.customOrgID }
                    onChange={ handleChange }
                    disabled={ formValues.orgID !== "custom" } />
                } />

            </RadioGroup>
        </FormControl>

        <Typography variant="body2" sx={{ mt: 2 }}>If left empty, the modal will fail to load your saved payment methods and at making a purchase.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>Still, after clearing the error that is shown in the modal when loading the page, you will be able to go through all the steps before the purchase is made.</Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1 }}>Invoice</FormLabel>
          <TextField
            name="invoiceID"
            label="Invoice ID"
            size="small"
            value={ formValues.invoiceID }
            onChange={ handleChange }
            required={ formValues.lotType === "auction" } />
        </FormControl>

        <Typography variant="body2" sx={{ mt: 2 }}>In production, this will be required for auction lots.</Typography>
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>You can still let the Payment UI handle invoice creation for both auction and pay now lots in this playground app.</Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1 }}>Lot Data</FormLabel>
          <Stack spacing={ 2 }>
            <TextField
              name="lotID"
              label="Lot ID"
              size="small"
              value={ formValues.lotID }
              onChange={ handleChange } />

            <FormControl fullWidth>
              <InputLabel id="lotTypeLabel">Lot Type</InputLabel>
              <Select
                labelId="lotTypeLabel"
                id="lotType"
                name="lotType"
                label="Lot Type"
                size="small"
                value={ formValues.lotType }
                onChange={ handleChange }>
                <MenuItem value="buyNow">Buy Now</MenuItem>
                <MenuItem value="auction">Auction</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="number"
              name="lotUnits"
              label="Lot Units"
              size="small"
              value={ formValues.lotUnits }
              onChange={ handleChange } />

            <TextField
              type="number"
              name="lotUnitPrice"
              label="Lot Unit Price"
              size="small"
              value={ formValues.lotUnitPrice }
              onChange={ handleChange } />

            <TextField
              type="number"
              name="lotFee"
              label="Lot Fee"
              size="small"
              value={ formValues.lotFee }
              onChange={ handleChange }/>
          </Stack>
        </FormControl>

        <Typography variant="body2" sx={{ mt: 2 }}>The Lot ID field can be left empty, but you won't be able to complete the purchase.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>If you want to complete the purchase, make sure the lot also belongs to the organization referenced by the Org ID above.</Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Theme</FormLabel>
          <RadioGroup
            name="theme"
            value={formValues.theme}
            onChange={handleChange}
          >
            <FormControlLabel
              value="light"
              control={<Radio />}
              label="Mojito Light"
            />
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label="Mojito Dark"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Images</FormLabel>
          <FormControlLabel label="Custom Purchasing & Error images." control={
            <Switch name="customImages" checked={ formValues.customImages } value="" onChange={ handleChange } />
          } />
        </FormControl>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Methods</FormLabel>
          <FormGroup>
            <FormControlLabel control={ <Checkbox checked={ formValues.paymentCC } value="" onChange={handleChange} name="paymentCC" /> } label="Credit Card" />
            <FormControlLabel control={ <Checkbox checked={ formValues.paymentACH } value="" onChange={handleChange} name="paymentACH" /> } label="ACH" />
            <FormControlLabel control={ <Checkbox checked={ formValues.paymentWire } value="" onChange={handleChange} name="paymentWire" /> } label="Wire" />
            <FormControlLabel control={ <Checkbox checked={ formValues.paymentCrypto } value="" onChange={handleChange} name="paymentCrypto" /> } label="Crypto" />
          </FormGroup>
        </FormControl>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset" disabled={ isAuthenticatedLoading || isAuthenticated }>
          <FormLabel component="legend">Not Authenticated Presets</FormLabel>
          <RadioGroup
            name="notAuthPreset"
            value={ formValues.notAuthPreset }
            onChange={ handleChange }>
            <FormControlLabel value="noAuthGuestDisabled" control={<Radio />} label="Guest Checkout Disabled (and Product Confirmation Enabled)" />
            <FormControlLabel value="noAuthGuestEnabled" control={<Radio />} label="Guest Checkout Enabled (and Product Confirmation Enabled)" />
          </RadioGroup>
          { (isAuthenticatedLoading || isAuthenticated) &&  <FormHelperText>You must not be authenticated.</FormHelperText> }
        </FormControl>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset" disabled={ isAuthenticatedLoading || !isAuthenticated }>
          <FormLabel component="legend">Authenticated Presets</FormLabel>
          <RadioGroup
            name="authPresets"
            value={ formValues.authPresets }
            onChange={handleChange}>
            <FormControlLabel value="authConfirmationDisabled" control={<Radio />} label="Skip Product Confirmation" />
            <FormControlLabel value="authConfirmationEnabledNoGuest" control={<Radio />} label="Guest Checkout Disabled + With Product Confirmation" />
            <FormControlLabel value="authConfirmationEnabledGuest" control={<Radio />} label="Guest Checkout Enabled + With Product Confirmation (not implemented)" />
          </RadioGroup>
            { (isAuthenticatedLoading || !isAuthenticated) && <FormHelperText>You must be authenticated.</FormHelperText> }
        </FormControl>
      </Box>

      <Box sx={{ my: 4 }}>
        <Stack spacing={ 2 } direction="row">
          <Button variant="contained" onClick={ handleOpen } disabled={ isLoading }>Open Checkout Modal</Button>
        </Stack>
      </Box>

      <Box component="pre" sx={{ my: 4, p: 2, overflow: "scroll", border: 2, borderRadius: "4px" }}>
        { JSON.stringify(checkoutModalProps, (key, value) => {
          if (typeof value === "function") return value.name ? `function ${ value.name }` : "() => { ... }";
          if (key === "theme" || key === "themeOptions") return "{ ... }";

          return value;
        }, "  ") }
      </Box>

      <Box sx={{ my: 4 }}>
        <Stack spacing={ 2 } direction="row">
          <Button variant="contained" onClick={ handleOpen } disabled={ isLoading }>Open Checkout Modal</Button>
        </Stack>
      </Box>

      <Box sx={{ my: 2 }}>
        { PLAYGROUND_PARAGRAPHS_ARRAY.map((paragraph, index) => (
          <Typography key={index} variant="body2" sx={{ my: 2 }}>{ paragraph }</Typography>
        )) }
      </Box>

      <Box sx={{ my: 4 }}>
        <Stack spacing={ 2 } direction="row">
          <Button variant="contained" onClick={ handleOpen } disabled={ isLoading }>Open Checkout Modal</Button>
        </Stack>
      </Box>

      { /* <CheckoutModalThemeProvider theme={ CUSTOM_THEME }> */ }
        <CheckoutModal { ...checkoutModalProps } />
      { /* </CheckoutModalThemeProvider> */ }

    </Container>
  );
};

export default HomePage;
