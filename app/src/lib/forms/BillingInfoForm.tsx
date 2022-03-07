import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import Grid from "@mui/material/Grid";
import React, { useCallback, useEffect } from "react";
import { ControlledCountrySelector } from "../components/shared/Select/CountrySelector/CountrySelector";
import { ControlledStateSelector } from "../components/shared/Select/StateSelector/StateSelector";
import { CheckoutModalFooter } from "../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { InputGroupLabel } from "../components/shared/InputGroupLabel/InputGroupLabel";
import { ControlledTextField } from "../components/shared/TextField/TextField";
import { SecondaryButton } from "../components/shared/SecondaryButton/SecondaryButton";
import { Box, InputAdornment, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { EMPTY_OPTION, SelectOption } from "../components/shared/Select/Select";
import { withInvalidErrorMessage, withRequiredErrorMessage } from "../utils/validationUtils";
import { DebugBox } from "../components/payments/DisplayBox/DisplayBox";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { useFormCheckoutError } from "../hooks/useFormCheckoutError";
import { TaxesMessagesBox } from "../components/shared/TaxesMessagesBox/TaxesMessagesBox";
import { TaxesState } from "../views/Billing/BillingView";
import { FormErrorsBox } from "../components/shared/FormErrorsBox/FormErrorsBox";
import { formatPhoneAsE123, getPhonePrefix, phoneHasPrefix } from "../domain/circle/circle.utils";

const FULL_NAME_FIELD = "fullName";
const EMAIL_FIELD = "email";
const PHONE_FIELD = "phone";

const STREET_FIELD = "street";
const APARTMENT_FIELD = "apartment";
const ZIP_CODE_FIELD = "zipCode";
const CITY_FIELD = "city";
const STATE_FIELD = "state";
const COUNTRY_FIELD = "country";

export type BillingInfo = {
  [FULL_NAME_FIELD]: string;
  [EMAIL_FIELD]: string;
  [PHONE_FIELD]: string;

  [STREET_FIELD]: string;
  [APARTMENT_FIELD]: string;
  [ZIP_CODE_FIELD]: string;
  [CITY_FIELD]: string;
  [STATE_FIELD]: SelectOption;
  [COUNTRY_FIELD]: SelectOption;
};

export type TaxInfo = Omit<BillingInfo, "fullName" | "email" | "phone" | "apartment">

const FIELD_LABELS = {
  [FULL_NAME_FIELD]: "Full Name",
  [EMAIL_FIELD]: "Email",
  [PHONE_FIELD]: "Phone",

  [STREET_FIELD]: "Street",
  [APARTMENT_FIELD]: "Apartment, Suite, etc. (optional)",
  [ZIP_CODE_FIELD]: "Zip Code",
  [CITY_FIELD]: "City",
  [STATE_FIELD]: "State",
  [COUNTRY_FIELD]: "Country",
};

const FIELD_NAMES = Object.keys(FIELD_LABELS);

const EMPTY_FORM_VALUES: BillingInfo = {
  [FULL_NAME_FIELD]: "",
  [EMAIL_FIELD]: "",
  [PHONE_FIELD]: "",

  [STREET_FIELD]: "",
  [APARTMENT_FIELD]: "",
  [ZIP_CODE_FIELD]: "",
  [CITY_FIELD]: "",
  [STATE_FIELD]: EMPTY_OPTION,
  [COUNTRY_FIELD]: EMPTY_OPTION,
};

// export type BillingInfoFormVariant = "guest" | "loggedIn";

const schema = object()
  .shape({
    [FULL_NAME_FIELD]: string()
      .label(FIELD_LABELS[FULL_NAME_FIELD])
      .required(withRequiredErrorMessage),
    [EMAIL_FIELD]: string()
      .label(FIELD_LABELS[EMAIL_FIELD])
      .email()
      .required(withRequiredErrorMessage),
    [PHONE_FIELD]: string()
      .label(FIELD_LABELS[PHONE_FIELD])
      .test({
        name: "is-valid-phone-number",
        test: (value, context) => {
          if (!value) return false;

          const formattedPhoneNumber = formatPhoneAsE123(value || "", context.parent.country?.value || "");

          return /\+(?:[0-9] ?){6,14}[0-9]$/.test(formattedPhoneNumber);
        },
        message: withInvalidErrorMessage,
      })
      .required(withRequiredErrorMessage),
    [STREET_FIELD]: string()
      .label(FIELD_LABELS[STREET_FIELD])
      .required(withRequiredErrorMessage),
    [APARTMENT_FIELD]: string()
      .label(FIELD_LABELS[APARTMENT_FIELD]),
    [ZIP_CODE_FIELD]: string()
      .label(FIELD_LABELS[ZIP_CODE_FIELD])
      .required(withRequiredErrorMessage),
    [CITY_FIELD]: string()
      .label(FIELD_LABELS[CITY_FIELD])
      .required(withRequiredErrorMessage),
    [STATE_FIELD]: object().shape({
      value: string()
        .label(FIELD_LABELS[STATE_FIELD])
        .required(withRequiredErrorMessage)
    }),
    [COUNTRY_FIELD]: object().shape({
      value: string()
        .label(FIELD_LABELS[COUNTRY_FIELD])
        .required(withRequiredErrorMessage)
    }),
  }).required();

export interface BillingInfoFormProps {
  // variant: BillingInfoFormVariant;
  defaultValues?: BillingInfo;
  checkoutError?: CheckoutModalError;
  taxes: TaxesState;
  onTaxInfoChange: (taxInfo: Partial<TaxInfo>) => void;
  onSaved?: () => void;
  onClose: () => void;
  onSubmit: (data: BillingInfo) => void;
  onAttemptSubmit: () => void;
  debug?: boolean;
}

export const BillingInfoForm: React.FC<BillingInfoFormProps> = ({
  // variant,
  defaultValues,
  checkoutError,
  taxes,
  onTaxInfoChange,
  onSaved,
  onClose,
  onSubmit,
  onAttemptSubmit,
  debug
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState,
  } = useForm<BillingInfo>({
    defaultValues: {
      ...EMPTY_FORM_VALUES,
      ...defaultValues
    },
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const [phone, street, zip, city, state, country] = watch([PHONE_FIELD, STREET_FIELD, ZIP_CODE_FIELD, CITY_FIELD, STATE_FIELD, COUNTRY_FIELD]);

  useEffect(() => {
    onTaxInfoChange({
      [STREET_FIELD]: street,
      [ZIP_CODE_FIELD]: zip,
      [CITY_FIELD]: city,
      [STATE_FIELD]: state,
      [COUNTRY_FIELD]: country,
    });
  }, [onTaxInfoChange, street, zip, city, state, country]);

  const taxesStatus = taxes.status;
  const selectedCountryCode = country?.value;
  const submitForm = handleSubmit(onSubmit);
  const checkoutErrorMessage = useFormCheckoutError({ formKey: "billing", checkoutError, fields: FIELD_NAMES, setError });

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    onAttemptSubmit();
    submitForm(e);
  }, [onAttemptSubmit, submitForm]);

  return (
    <form onSubmit={handleFormSubmit}>
      {onSaved && (
        <Box sx={{ my: 2.5 }}>
          <SecondaryButton onClick={onSaved} startIcon={<BookIcon />}>
            Use Saved Billing Info
          </SecondaryButton>
        </Box>
      )}

      <InputGroupLabel sx={{ m: 0, pt: 2 }}>Information</InputGroupLabel>

      <ControlledTextField
        name={FULL_NAME_FIELD}
        control={control}
        label={FIELD_LABELS[FULL_NAME_FIELD]}
      />

      <ControlledTextField
        name={EMAIL_FIELD}
        control={control}
        label={FIELD_LABELS[EMAIL_FIELD]}
      />

      <ControlledTextField
        name={PHONE_FIELD}
        control={control}
        label={FIELD_LABELS[PHONE_FIELD]}
        helperText={ debug && phone ? `Debug: ${ formatPhoneAsE123(phone || "", `${ selectedCountryCode }`) }` : undefined }
        InputProps={ selectedCountryCode && !phoneHasPrefix(phone) ? {
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="subtitle1" component="span" sx={{ pointerEvents: "none" }}>{ getPhonePrefix(`${ selectedCountryCode }`) }</Typography>
            </InputAdornment>
          ),
        } : undefined}
      />

      <InputGroupLabel sx={{ m: 0, pt: 2 }}>Address</InputGroupLabel>

      <ControlledTextField
        name={STREET_FIELD}
        control={control}
        label={FIELD_LABELS[STREET_FIELD]}
      />

      <ControlledTextField
        name={APARTMENT_FIELD}
        control={control}
        label={FIELD_LABELS[APARTMENT_FIELD]}
      />

      <Grid
        container
        columnSpacing={2}
        direction={{
          xs: "column",
          sm: "row"
        }}>
        <Grid item sm={6} zeroMinWidth>
          <ControlledTextField
            name={CITY_FIELD}
            control={control}
            label={FIELD_LABELS[CITY_FIELD]} />
        </Grid>

        <Grid item sm={6}>
          <ControlledCountrySelector
            name={COUNTRY_FIELD}
            control={control}
            label={FIELD_LABELS[COUNTRY_FIELD]} />
        </Grid>
      </Grid>

      <Grid
        container
        columnSpacing={2}
        direction={{
          xs: "column",
          sm: "row"
        }}>
        <Grid item sm={6} zeroMinWidth sx={{ maxWidth: "100%" }}>
          <ControlledStateSelector
            name={STATE_FIELD}
            control={control}
            label={FIELD_LABELS[STATE_FIELD]}
            countryCode={selectedCountryCode} />
        </Grid>
        <Grid item sm={6}>
          <ControlledTextField
            name={ZIP_CODE_FIELD}
            control={control}
            label={FIELD_LABELS[ZIP_CODE_FIELD]} />
        </Grid>
      </Grid>

      { checkoutErrorMessage && <FormErrorsBox error={ checkoutErrorMessage } sx={{ mt: 5 }} /> }

      { formState.isSubmitted && <TaxesMessagesBox sx={{ mt: 5 }} taxes={ taxes } variant="form" /> }

      { debug && (
        <DebugBox sx={{ mt: 5 }}>
          { JSON.stringify(watch(), null, 2) }
          { "\n\n" }
          { JSON.stringify(formState.errors, null, 2) }
        </DebugBox>
      ) }

      {/* variant === "loggedIn" && <Checkbox label="Save this billing information" /> */}

      <CheckoutModalFooter
        variant="toPayment"
        buttonLabel={ taxesStatus === "loading" ? "Calculating taxes..." : undefined }
        submitDisabled={ taxesStatus === "loading" }
        onCloseClicked={onClose} />
    </form>
  );
};
