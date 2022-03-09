import { Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, object, string, TestContext } from "yup";
import { ObjectShape } from "yup/lib/object";
import { Grid, Box } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import React, { useCallback, useMemo } from "react";
import { CheckoutModalFooter} from "../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { ControlledTextField } from "../components/shared/TextField/TextField";
import { ControlledCardNumberField } from "../components/shared/CardNumberField/CardNumberField";
import { ControlledCardExpiryDateField } from "../components/shared/CardExpiryDateField/CardExpiryDateField";
import { ControlledCardSecureCodeField } from "../components/shared/CardSecureCodeField/CardSecureCodeField";
import { InputGroupLabel } from "../components/shared/InputGroupLabel/InputGroupLabel";
import { SecondaryButton } from "../components/shared/SecondaryButton/SecondaryButton";
import { PaymentMethodSelector } from "../components/shared/PaymentMethodSelector/PaymentMethodSelector";
import {
  PaymentMethod,
  PaymentType
} from "../domain/payment/payment.interfaces";
import {
  requireSchemaWhenKeyIs,
  withInvalidErrorMessage
} from "../utils/validationUtils";
import {
  getCardNumberIsValid,
  getExpiryDateIsvalid,
  getCVCIsValid
} from "../domain/payment/payment.utils";
import { Typography } from "@mui/material";
import { DisplayBox } from "../components/payments/DisplayBox/DisplayBox";
import { DebugBox } from "../components/payments/DebugBox/DebugBox";
import { ControlledCheckbox } from "../components/shared/Checkbox/Checkbox";
import { ConsentText, ConsentType, CONSENT_ERROR_MESSAGE } from "../components/shared/ConsentText/ConsentText";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { FormErrorsBox } from "../components/shared/FormErrorsBox/FormErrorsBox";
import { useFormCheckoutError } from "../hooks/useFormCheckoutError";
import { PUIDictionary } from "../domain/dictionary/dictionary.interfaces";
import { useDictionary } from "../hooks/useDictionary";

interface PaymentTypeFormProps {
  control: Control<PaymentMethod & { consent: boolean }>;
  consentType?: ConsentType;
  privacyHref?: string;
  termsOfUseHref?: string;
  dictionary: PUIDictionary;
}

interface PaymentTypeFormData {
  defaultValues: (consentType?: ConsentType) => PaymentMethod & { consent: boolean };
  schemaShape: ObjectShape;
  fields: React.FC<PaymentTypeFormProps>;
}

const FIELD_LABELS = {
  cardNumber: "Card Number",
  expiryDate: "Expiry Date",
  secureCode: "Secure Code",
  nameOnCard: "Name on Card",
  accountNumber: "Account Number",
  routingNumber: "Routing Number (ABA)",
};

const FIELD_NAMES = Object.keys(FIELD_LABELS);

const isCreditCardThenRequireSchema = requireSchemaWhenKeyIs("CreditCard");
const isWireThenRequireSchema = requireSchemaWhenKeyIs("Wire");

const PAYMENT_TYPE_FORM_DATA: Record<PaymentType, PaymentTypeFormData> = {
  CreditCard: {
    defaultValues: (consentType) => ({
      type: "CreditCard",
      cardNumber: "",
      expiryDate: "",
      secureCode: "",
      nameOnCard: "",
      consent: consentType === "checkbox" ? false: true,
    }),
    schemaShape: {
      cardNumber: string()
        .label(FIELD_LABELS.cardNumber)
        .when("type", {
          is: "CreditCard",
          then: (schema) =>
            schema.required().test({
              name: "is-valid-card-number",
              test: getCardNumberIsValid,
              message: withInvalidErrorMessage
            })
        }),
      expiryDate: string()
        .label(FIELD_LABELS.expiryDate)
        .when("type", {
          is: "CreditCard",
          then: (schema) =>
            schema.required().test({
              name: "is-valid-expiry-date",
              test: getExpiryDateIsvalid,
              message: withInvalidErrorMessage
            })
        }),
      secureCode: string()
        .label(FIELD_LABELS.secureCode)
        .when("type", {
          is: "CreditCard",
          then: (schema) =>
            schema.required().test({
              name: "is-valid-cvv-or-cid-number",
              test: (value?: string, context?: TestContext) =>
                getCVCIsValid(value, context?.parent?.cardNumber),
              message: withInvalidErrorMessage
            })
        }),
      nameOnCard: string()
        .label(FIELD_LABELS.nameOnCard)
        .when("type", isCreditCardThenRequireSchema),
    },
    fields: ({ control, consentType, privacyHref, termsOfUseHref }) => (<>
      <ControlledCardNumberField
        name="cardNumber"
        control={control}
        label={FIELD_LABELS.cardNumber} />

      <Grid
        container
        columnSpacing={2}
        direction={{
          xs: "column",
          sm: "row"
        }}>
        <Grid item sm={6} zeroMinWidth>
          <ControlledCardExpiryDateField
            name="expiryDate"
            control={control}
            label={FIELD_LABELS.expiryDate} />
        </Grid>
        <Grid item sm={6}>
          <ControlledCardSecureCodeField
            name="secureCode"
            control={control}
            label={FIELD_LABELS.secureCode} />
        </Grid>
      </Grid>

      <ControlledTextField
        name="nameOnCard"
        control={control}
        label={FIELD_LABELS.nameOnCard}
      />

      { consentType === "checkbox" && (
        <ControlledCheckbox
          name="consent"
          control={control}
          label={ <>I <ConsentText privacyHref={ privacyHref } termsOfUseHref={ termsOfUseHref } /></> } />
      ) }
    </>),
  },
  ACH: {
    defaultValues: (consentType) => ({
      type: "ACH",
      accountId: "",
      publicToken: "",
      consent: consentType === "checkbox" ? false: true,
    }),
    schemaShape: {},
    fields: ({ control, consentType, privacyHref, termsOfUseHref }) => (<>
      <DisplayBox sx={{ mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 }}>
        <Typography variant="body1">
          We use Plaid to connect to your account.
        </Typography>
      </DisplayBox>

      { consentType === "checkbox" && (
        <ControlledCheckbox
          name="consent"
          control={control}
          label={ <>I <ConsentText privacyHref={ privacyHref } termsOfUseHref={ termsOfUseHref } /></> } />
      ) }
    </>),
  },
  Wire: {
    defaultValues: (consentType) => ({
      type: "Wire",
      accountNumber: "",
      routingNumber: "",
      consent: consentType === "checkbox" ? false: true,
    }),
    schemaShape: {
      accountNumber: string()
        .label(FIELD_LABELS.accountNumber)
        .when("type", isWireThenRequireSchema),
      routingNumber: string()
        .label(FIELD_LABELS.routingNumber)
        .when("type", isWireThenRequireSchema),
    },
    fields: ({ control, consentType, privacyHref, termsOfUseHref, dictionary }) => (<>
      <ControlledTextField
          name="accountNumber"
          control={control}
          label={FIELD_LABELS.accountNumber}
        />
        <ControlledTextField
          name="routingNumber"
          control={control}
          label={FIELD_LABELS.routingNumber}
        />
      { consentType === "checkbox" && (
        <ControlledCheckbox
          name="consent"
          control={control}
          label={ <>I <ConsentText privacyHref={ privacyHref } termsOfUseHref={ termsOfUseHref } /></> } />
      ) }

      <DisplayBox sx={{ mt: 1.5 }}>
        { dictionary.wirePaymentsDisclaimer.map((line, i) => (
          <Typography key={ i } variant="body1" sx={ i === 0 ? undefined : { mt: 1.5 } }>{ line }</Typography>
        )) }
      </DisplayBox>
    </>),
  },
  Crypto: {
    defaultValues: (consentType) => ({
      type: "Crypto",
      consent: consentType === "checkbox" ? false: true,
    }),
    schemaShape: {},
    fields: ({ control, consentType, privacyHref, termsOfUseHref }) => (<>
      <DisplayBox sx={{ mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 }}>
        <Typography variant="body1">
          Not supported yet.
        </Typography>
      </DisplayBox>

      { consentType === "checkbox" && (
        <ControlledCheckbox
          name="consent"
          control={control}
          label={ <>I <ConsentText privacyHref={ privacyHref } termsOfUseHref={ termsOfUseHref } /></> } />
      ) }
    </>),
  },
};

export interface PaymentMethodFormProps {
  acceptedPaymentTypes: PaymentType[];
  defaultValues?: PaymentMethod;
  checkoutError?: CheckoutModalError;
  onPlaidLinkClicked: () => void;
  onSaved?: () => void;
  onClose: () => void;
  onSubmit: (data: PaymentMethod) => void;
  onAttemptSubmit: () => void;
  consentType?: ConsentType;
  debug?: boolean;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  acceptedPaymentTypes,
  defaultValues: parentDefaultValues,
  checkoutError,
  onPlaidLinkClicked,
  onSaved,
  onClose,
  onSubmit,
  onAttemptSubmit,
  consentType,
  debug = false
}) => {
  const defaultPaymentType = acceptedPaymentTypes[0] || "CreditCard";
  const defaultPaymentTypeFormData = PAYMENT_TYPE_FORM_DATA[defaultPaymentType];
  const defaultPaymentTypeDefaultValues = defaultPaymentTypeFormData.defaultValues(consentType);

  const schema = useMemo(() => {
    return object().shape({
      type: string().required(),
      consent: boolean().oneOf([true], CONSENT_ERROR_MESSAGE),
      ...Object.values(PAYMENT_TYPE_FORM_DATA).reduce((objectShape, { schemaShape }) => ({ ...objectShape, ...schemaShape }), {} as ObjectShape),
    });
  }, []);

  const dictionary = useDictionary();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    setError,
    formState,
  } = useForm({
    defaultValues: {
      ...defaultPaymentTypeDefaultValues,
      ...parentDefaultValues,
    },
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSelectedPaymentMethodChange = useCallback((paymentType: PaymentType) => {
    reset({ ...PAYMENT_TYPE_FORM_DATA[paymentType].defaultValues(consentType) });
  }, [reset, consentType]);

  const selectedPaymentMethod = watch("type") as PaymentType;
  const Fields = PAYMENT_TYPE_FORM_DATA[selectedPaymentMethod].fields;
  const submitForm = handleSubmit(onSubmit);
  const checkoutErrorMessage = useFormCheckoutError({ formKey: "payment", checkoutError, fields: FIELD_NAMES, setError, deps: [selectedPaymentMethod] });

  const { privacyHref, termsOfUseHref } = dictionary;

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    onAttemptSubmit();

    if (selectedPaymentMethod === "ACH") {
      const isFormValid = await trigger();

      if (!isFormValid) {
        submitForm(e);

        return;
      }

      onPlaidLinkClicked();
    } else if (["CreditCard", "Wire"].includes(selectedPaymentMethod)) {
      submitForm(e);
    }
  }, [onAttemptSubmit, selectedPaymentMethod, onPlaidLinkClicked, submitForm, trigger]);

  return (
    <form onSubmit={ handleFormSubmit }>
      {onSaved && (
        <Box sx={{ my: 2.5 }}>
          <SecondaryButton onClick={onSaved} startIcon={<BookIcon />}>
            Use Saved Payment Method
          </SecondaryButton>
        </Box>
      )}

      { acceptedPaymentTypes.length > 1 ? (<>
        <InputGroupLabel sx={{ m: 0, pt: 2, pb: 1.5 }}>Payment Method</InputGroupLabel>

        <PaymentMethodSelector
          selectedPaymentMethod={selectedPaymentMethod}
          onPaymentMethodChange={handleSelectedPaymentMethodChange}
          paymentMethods={acceptedPaymentTypes}
        />
      </>) : (
        null
      ) }

      <Fields
        control={ control }
        consentType={ consentType }
        privacyHref={ privacyHref }
        dictionary={dictionary}
        termsOfUseHref={ termsOfUseHref }/>

      { checkoutErrorMessage && <FormErrorsBox error={ checkoutErrorMessage } sx={{ mt: 5 }} /> }

      { debug && (
        <DebugBox sx={{ mt: 5 }}>
          { JSON.stringify(watch(), null, 2) }
          { "\n\n" }
          { JSON.stringify(formState.errors, null, 2) }
        </DebugBox>
      ) }

      <CheckoutModalFooter
        variant={ selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation" }
        consentType={ consentType === "checkbox" ? undefined : consentType }
        submitDisabled={ selectedPaymentMethod === "Crypto" }
        onCloseClicked={ onClose } />
    </form>
  );
};
