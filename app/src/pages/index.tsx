import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Box, Stack, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem, InputLabel, FormGroup, Checkbox, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { CheckoutComponent } from "../components/checkout-component/CheckoutComponent";
import { PaymentType, PUICheckoutComponentProps, THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY, THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY } from "../lib";
import { useOpenCloseCheckoutModal } from "../lib/components/public/useOpenCloseCheckoutModal/useOpenCloseCheckoutModal";
import { IS_BROWSER } from "../lib/domain/build/build.constants";
import { useMeQuery } from "../services/graphql/generated";
import { PLAYGROUND_PARAGRAPHS_ARRAY, PLAYGROUND_MOCKED_AUCTION_LOT, PLAYGROUND_MOCKED_BUY_NOW_LOT } from "../utils/playground/playground.constants";
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

  // Payment:
  paymentCC: true,
  paymentACH: true,
  paymentWire: true,
  paymentCrypto: true,
};

const FORM_VALUES_KEY = "FORM_VALUES_KEY";

let INITIAL_FORM_VALUES: Partial<PlaygroundFormData> = {};

if (IS_BROWSER) {
  try {
    INITIAL_FORM_VALUES = JSON.parse(localStorage.getItem(FORM_VALUES_KEY) || "{}") as Partial<PlaygroundFormData>;
  } catch (err) {
    console.log(err);
  }
}

const HomePage: React.FC = () => {
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();

  const { isAuthenticated, isLoading: isAuthenticatedLoading } = useAuth0();
  const { data: meData, loading: meLoading /* , error: meError */ } = useMeQuery({ skip: !isAuthenticated });
  const isLoading = isAuthenticatedLoading || meLoading;
  const organizations = isLoading ? [] : (meData?.me?.userOrgs || []).map(userOrg => userOrg.organization);
  const hasOrganizations = organizations.length > 0;


  // CHECKOUT OPENING & FORM VALUES:

  const { loaderMode, isOpen, onOpen, onClose } = useOpenCloseCheckoutModal({
    paymentIdParam,
    paymentErrorParam,
  });

  const [formValues, setFormValues] = useState<PlaygroundFormData>(DEFAULT_FORM_VALUES);

  const lotType = formValues.lotType || DEFAULT_FORM_VALUES.lotType;

  const checkoutComponentProps: PUICheckoutComponentProps = {
    // Modal:
    open: isOpen,
    onClose,

    // Flow:
    loaderMode,

    // Personalization:
    acceptedPaymentTypes: [
      formValues.paymentCC ? "CreditCard" : "",
      formValues.paymentACH ? "ACH" : "",
      formValues.paymentWire ? "Wire" : "",
      formValues.paymentCrypto ? "Crypto" : "",
    ].filter(Boolean) as PaymentType[],
    acceptedCreditCardNetworks: formValues.paymentCC ? ["visa", "mastercard"] : undefined,

    // Data:
    orgID: (formValues.orgID === "custom" ? formValues.customOrgID : formValues.orgID) || "",
    invoiceID: (lotType === "auction" && formValues.invoiceID) || "",
    checkoutItems: [{
      ...(lotType === "buyNow" ? PLAYGROUND_MOCKED_BUY_NOW_LOT : PLAYGROUND_MOCKED_AUCTION_LOT),
      lotID: formValues.lotID || DEFAULT_FORM_VALUES.lotID,
      lotType,
      units: lotType === "auction" ? 1 : (parseInt(`${formValues.lotUnits || DEFAULT_FORM_VALUES.lotUnits}`, 10) || 1),
    }],
  };

  useEffect(() => {
    setFormValues({
      // Organization:
      orgID: INITIAL_FORM_VALUES.orgID ?? DEFAULT_FORM_VALUES.orgID,
      customOrgID: INITIAL_FORM_VALUES.customOrgID ?? DEFAULT_FORM_VALUES.customOrgID,

      // Invoice (for won auction lots):
      invoiceID: INITIAL_FORM_VALUES.invoiceID ?? DEFAULT_FORM_VALUES.invoiceID,

      // Lot:
      lotID: INITIAL_FORM_VALUES.lotID ?? DEFAULT_FORM_VALUES.lotID,
      lotType: INITIAL_FORM_VALUES.lotType ?? DEFAULT_FORM_VALUES.lotType,
      lotUnits: INITIAL_FORM_VALUES.lotUnits ?? DEFAULT_FORM_VALUES.lotUnits,

      // Payment:
      paymentCC: INITIAL_FORM_VALUES.paymentCC ?? DEFAULT_FORM_VALUES.paymentCC,
      paymentACH: INITIAL_FORM_VALUES.paymentACH ?? DEFAULT_FORM_VALUES.paymentACH,
      paymentWire: INITIAL_FORM_VALUES.paymentWire ?? DEFAULT_FORM_VALUES.paymentWire,
      paymentCrypto: INITIAL_FORM_VALUES.paymentCrypto ?? DEFAULT_FORM_VALUES.paymentCrypto,
    });
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = target;

    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [name]: (type === "radio" || type === "checkbox") && value === "" ? checked : value,
    }));
  };

  useEffect(() => {
    try {
      localStorage.setItem(FORM_VALUES_KEY, JSON.stringify(formValues));
    } catch (err) {
      console.log(err);
    }
  }, [formValues]);


  // AUTO-OPENING (FIRS-TIME ONLY):

  const firstTimeRef = useRef(true);

  useEffect(() => {
    if (
      isLoading ||
      !isAuthenticated ||
      !meData ||
      !hasOrganizations ||
      firstTimeRef.current === false ||
      (INITIAL_FORM_VALUES.lotType === "auction" && !INITIAL_FORM_VALUES.invoiceID) ||
      (INITIAL_FORM_VALUES.orgID === "custom" && !INITIAL_FORM_VALUES.customOrgID)
    ) return;

    firstTimeRef.current = false;

    onOpen();
  }, [isLoading, isAuthenticated, meData, hasOrganizations, onOpen]);


  return (
    <>
      <Box sx={{ my: 4 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={onOpen} disabled={isLoading}>Open Checkout Modal</Button>
        </Stack>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Organization</FormLabel>

          <RadioGroup
            name="orgID"
            value={formValues.orgID}
            onChange={handleChange}>

            {organizations.map(organization => (
              <FormControlLabel
                key={organization.id}
                value={organization.id}
                control={<Radio />}
                label={organization.name} />
            ))}

            <FormControlLabel
              value="custom"
              control={<Radio />}
              sx={{ mt: 1 }}
              label={(
                <TextField
                  name="customOrgID"
                  label="Custom Org ID"
                  size="small"
                  value={formValues.customOrgID}
                  onChange={handleChange}
                  disabled={formValues.orgID !== "custom"} />
            )} />

          </RadioGroup>
        </FormControl>

        <Typography variant="body2" sx={{ mt: 2 }}>If left empty, the modal will fail to load your saved payment methods and at making a purchase.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>Still, after clearing the error that is shown in the modal when loading the page, you will be able to go through all the steps before the purchase is made.</Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 2 }}>Lot Data</FormLabel>

          <Stack spacing={2}>
            <TextField
              name="lotID"
              label="Lot ID"
              size="small"
              value={formValues.lotID}
              onChange={handleChange} />

            <FormControl fullWidth>
              <InputLabel id="lotTypeLabel">Lot Type</InputLabel>
              <Select
                labelId="lotTypeLabel"
                id="lotType"
                name="lotType"
                label="Lot Type"
                size="small"
                value={formValues.lotType}
                onChange={handleChange as (e: SelectChangeEvent<"buyNow" | "auction">) => void}>
                <MenuItem value="buyNow">Buy Now</MenuItem>
                <MenuItem value="auction">Auction</MenuItem>
              </Select>
            </FormControl>

            {formValues.lotType === "buyNow" ? (
              <TextField
                type="number"
                name="lotUnits"
                label="Lot Units"
                size="small"
                value={formValues.lotUnits}
                onChange={handleChange} />
            ) : (
              <TextField
                name="invoiceID"
                label="Invoice ID"
                size="small"
                value={formValues.invoiceID}
                onChange={handleChange}
                required />
            )}

          </Stack>
        </FormControl>

        <Typography variant="body2" sx={{ mt: 2 }}>The Lot ID field can be left empty, but you won't be able to complete the purchase.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>If you want to complete the purchase, make sure the lot also belongs to the organization referenced by the Org ID above.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>The Payment UI handles invoice creation for both auction and buy now lots in this playground app, but will only do it for buy now lots in production.</Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Methods</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={formValues.paymentCC} value="" onChange={handleChange} name="paymentCC" />} label="Credit Card" />
            <FormControlLabel control={<Checkbox checked={formValues.paymentACH} value="" onChange={handleChange} name="paymentACH" />} label="ACH" />
            <FormControlLabel control={<Checkbox checked={formValues.paymentWire} value="" onChange={handleChange} name="paymentWire" />} label="Wire" />
            <FormControlLabel control={<Checkbox checked={formValues.paymentCrypto} value="" onChange={handleChange} name="paymentCrypto" />} label="Crypto" />
          </FormGroup>
        </FormControl>
      </Box>


      <Box sx={{ my: 4 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={onOpen} disabled={isLoading}>Open Checkout Modal</Button>
        </Stack>
      </Box>

      { /*
    <Box component="pre" sx={{ my: 4, p: 2, overflow: "scroll", border: 2, borderRadius: "4px" }}>
      {JSON.stringify(checkoutProps, (key, value) => {
        if (typeof value === "function") return value.name ? `function ${value.name}` : "() => { ... }";
        if (key === "theme" || key === "themeOptions" || key === "customTexts") return "{ ... }";

        return value;
      }, "  ")}
    </Box>

    <Box sx={{ my: 4 }}>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={onOpen} disabled={isLoading}>Open Checkout Modal</Button>
      </Stack>
    </Box>
    */ }

      <Box sx={{ my: 2 }}>
        {PLAYGROUND_PARAGRAPHS_ARRAY.map((paragraph, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Typography key={i} variant="body2" sx={{ my: 2 }}>{paragraph}</Typography>
        ))}
      </Box>

      <Box sx={{ my: 4 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={onOpen} disabled={isLoading}>Open Checkout Modal</Button>
        </Stack>
      </Box>

      <CheckoutComponent { ...checkoutComponentProps } />
    </>
  );
};

export default HomePage;
