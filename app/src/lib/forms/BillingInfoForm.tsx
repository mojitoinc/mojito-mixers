import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { ControlledCountrySelector } from "../components/shared/Select/CountrySelector/CountrySelector";
import { ControlledStateSelector } from "../components/shared/Select/StateSelector/StateSelector";
import { CheckoutModalFooter } from "../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { InputGroupLabel } from "../components/shared/InputGroupLabel/InputGroupLabel";
import { ControlledTextField } from "../components/shared/TextField/TextField";
import { SecondaryButton } from "../components/shared/SecondaryButton/SecondaryButton";
import { Box } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { EMPTY_OPTION, SelectOption } from "../components/shared/Select/Select";
import { withRequiredErrorMessage } from "../utils/validationUtils";
import { DebugBox } from "../components/payments/DisplayBox/DisplayBox";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { useFormCheckoutError } from "../hooks/useFormCheckoutError";
import { TaxesMessagesBox } from "../components/shared/TaxesMessagesBox/TaxesMessagesBox";
import { TaxesState } from "../views/Billing/BillingView";
import { FormErrorsBox } from "../components/shared/FormErrorsBox/FormErrorsBox";

const FULL_NAME_FIELD = "fullName";
const EMAIL_FIELD = "email";
const PHONE_FIELD = "phone";
const STREET_FIELD = "street";
const APARTMENT_FIELD = "apartment";
const COUNTRY_FIELD = "country";
const CITY_FIELD = "city";
const STATE_FIELD = "state";
const ZIP_CODE_FIELD = "zipCode";

export type BillingInfo = {
  [APARTMENT_FIELD]: string;
  [CITY_FIELD]: string;
  [COUNTRY_FIELD]: SelectOption;
  [EMAIL_FIELD]: string;
  [FULL_NAME_FIELD]: string;
  [PHONE_FIELD]: string;
  [STATE_FIELD]: SelectOption;
  [STREET_FIELD]: string;
  [ZIP_CODE_FIELD]: string;
};

export type TaxInfo = Omit<BillingInfo, "fullName" | "email" | "phone" | "apartment">

const FIELD_LABELS = {
  [FULL_NAME_FIELD]: "Full Name",
  [EMAIL_FIELD]: "Email",
  [PHONE_FIELD]: "Phone",
  [STREET_FIELD]: "Street",
  [APARTMENT_FIELD]: "Apartment, Suite, etc. (optional)",
  [COUNTRY_FIELD]: "Country",
  [CITY_FIELD]: "City",
  [STATE_FIELD]: "State",
  [ZIP_CODE_FIELD]: "Zip Code"
};

const FIELD_NAMES = Object.keys(FIELD_LABELS);

const EMPTY_FORM_VALUES: BillingInfo = {
  [FULL_NAME_FIELD]: "",
  [EMAIL_FIELD]: "",
  [PHONE_FIELD]: "",
  [STREET_FIELD]: "",
  [APARTMENT_FIELD]: "",
  [COUNTRY_FIELD]: EMPTY_OPTION,
  [CITY_FIELD]: "",
  [STATE_FIELD]: EMPTY_OPTION,
  [ZIP_CODE_FIELD]: ""
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
      .required(withRequiredErrorMessage),
    [STREET_FIELD]: string()
      .label(FIELD_LABELS[STREET_FIELD])
      .required(withRequiredErrorMessage),
    [APARTMENT_FIELD]: string().label(FIELD_LABELS[APARTMENT_FIELD]),
    [COUNTRY_FIELD]: object().shape({
      value: string()
        .label(FIELD_LABELS[COUNTRY_FIELD])
        .required(withRequiredErrorMessage)
    }),
    [CITY_FIELD]: string()
      .label(FIELD_LABELS[CITY_FIELD])
      .required(withRequiredErrorMessage),
    [STATE_FIELD]: object().shape({
      value: string()
        .label(FIELD_LABELS[STATE_FIELD])
        .required(withRequiredErrorMessage)
    }),
    [ZIP_CODE_FIELD]: string()
      .label(FIELD_LABELS[ZIP_CODE_FIELD])
      .required(withRequiredErrorMessage)
  })
  .required();

export interface BillingInfoFormProps {
  // variant: BillingInfoFormVariant;
  defaultValues?: BillingInfo;
  checkoutError?: CheckoutModalError;
  taxes: TaxesState;
  onTaxInfoChange: (taxInfo: Partial<TaxInfo>) => void;
  onSaved?: () => void;
  onClose: () => void;
  onSubmit: (data: BillingInfo) => void;
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
  debug
}) => {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
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

  const [street, country, city, state, zip] = watch([STREET_FIELD, COUNTRY_FIELD, CITY_FIELD, STATE_FIELD, ZIP_CODE_FIELD]);

  useEffect(() => {
    onTaxInfoChange({
      [STREET_FIELD]: street,
      [COUNTRY_FIELD]: country,
      [CITY_FIELD]: city,
      [STATE_FIELD]: state,
      [ZIP_CODE_FIELD]: zip,
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTaxInfoChange, street, country.value, city, state.value, zip]);

  const taxesStatus = taxes.status;
  const selectedCountryOption: SelectOption = watch(COUNTRY_FIELD);
  const selectedCountryCode = selectedCountryOption?.value;
  const submitForm = handleSubmit(onSubmit);
  const checkoutErrorMessage = useFormCheckoutError({ formKey: "billing", checkoutError, fields: FIELD_NAMES, setError });

  return (
    <form onSubmit={ submitForm }>
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
        }}
      >
        <Grid item sm={6} zeroMinWidth>
          <ControlledCountrySelector
            name={COUNTRY_FIELD}
            control={control}
            label={FIELD_LABELS[COUNTRY_FIELD]}
          />
        </Grid>

        <Grid item sm={6}>
          <ControlledTextField
            name={CITY_FIELD}
            control={control}
            label={FIELD_LABELS[CITY_FIELD]}
          />
        </Grid>
      </Grid>

      <Grid
        container
        columnSpacing={2}
        direction={{
          xs: "column",
          sm: "row"
        }}
      >
        <Grid item sm={6} zeroMinWidth sx={{ maxWidth: "100%" }}>
          <ControlledStateSelector
            name={STATE_FIELD}
            control={control}
            label={FIELD_LABELS[STATE_FIELD]}
            countryCode={selectedCountryCode}
          />
        </Grid>
        <Grid item sm={6}>
          <ControlledTextField
            name={ZIP_CODE_FIELD}
            control={control}
            label={FIELD_LABELS[ZIP_CODE_FIELD]}
          />
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
