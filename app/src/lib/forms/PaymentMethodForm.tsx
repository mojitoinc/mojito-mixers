import { Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, TestContext } from "yup";
import { ObjectShape } from "yup/lib/object";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BookIcon from "@mui/icons-material/Book";
import React, { useCallback, useMemo } from "react";
import { CheckoutModalFooter } from "../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { ControlledTextField } from "../components/shared/TextField/TextField";
import { ControlledCardNumberField } from "../components/shared/CardNumberField";
import { ControlledCardExpiryDateField } from "../components/shared/CardExpiryDateField";
import { ControlledCardSecureCodeField } from "../components/shared/CardSecureCodeField";
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

interface PaymentMethodFormData {
  defaultValues: PaymentMethod;
  fields: React.FC<{ control: Control<PaymentMethod> }>;
  schemaShape: ObjectShape;
}

const FIELD_LABELS = {
  cardNumber: "Card Number",
  expiryDate: "Expiry Date",
  secureCode: "Secure Code",
  nameOnCard: "Name on Card",
  accountNumber: "Account Number",
  routingNumber: "Routing Number",
  accountName: "Account Name"
};

const isCreditCardThenRequireSchema = requireSchemaWhenKeyIs("CreditCard");
const isACHThenRequireSchema = requireSchemaWhenKeyIs("ACH");

const PAYMENT_METHOD_FORM_DATA: Record<PaymentType, PaymentMethodFormData> = {
  CreditCard: {
    defaultValues: {
      type: "CreditCard",
      cardNumber: "",
      expiryDate: "",
      secureCode: "",
      nameOnCard: ""
    },
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
              test: (value: string, context: TestContext) =>
                getCVCIsValid(value, context.parent.cardNumber),
              message: withInvalidErrorMessage
            })
        }),
      nameOnCard: string()
        .label(FIELD_LABELS.nameOnCard)
        .when("type", isCreditCardThenRequireSchema)
    },
    fields: ({ control }) => (
      <>
        <ControlledCardNumberField
          name="cardNumber"
          control={control}
          label={FIELD_LABELS.cardNumber}
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
            <ControlledCardExpiryDateField
              name="expiryDate"
              control={control}
              label={FIELD_LABELS.expiryDate}
            />
          </Grid>
          <Grid item sm={6}>
            <ControlledCardSecureCodeField
              name="secureCode"
              control={control}
              label={FIELD_LABELS.secureCode}
            />
          </Grid>
        </Grid>
        <ControlledTextField
          name="nameOnCard"
          control={control}
          label={FIELD_LABELS.nameOnCard}
        />
      </>
    )
  },
  ACH: {
    defaultValues: {
      type: "ACH",
      accountId: "",
      publicToken: "",
    },
    schemaShape: {
      /*accountNumber: number()
        .typeError(withTypeErrorMessageFor("number"))
        .label(FIELD_LABELS.accountNumber)
        .when("type", isACHThenRequireSchema),
      routingNumber: number()
        .typeError(withTypeErrorMessageFor("number"))
        .label(FIELD_LABELS.routingNumber)
        .when("type", isACHThenRequireSchema),
      accountName: string()
        .label(FIELD_LABELS.accountName)
        .when("type", isACHThenRequireSchema)*/
    },
    fields: () => (
      <>
        <Typography variant="body2" sx={{ mt: 1.5 }}>We use Plaid to connect to your account.</Typography>
        { /* <ControlledTextField
          name="accountNumber"
          control={control}
          label={FIELD_LABELS.accountNumber}
        />
        <ControlledTextField
          name="routingNumber"
          control={control}
          label={FIELD_LABELS.routingNumber}
        />
        <ControlledTextField
          name="accountName"
          control={control}
          label={FIELD_LABELS.accountName}
        /> */ }
      </>
    )
  },
  Wire: {
    defaultValues: {
      type: "Wire",
    },
    fields: () => (<>
      <Typography variant="body2" sx={{ mt: 1.5, mb: 5 }}>Not supported yet.</Typography>
    </>),
    schemaShape: {},
  },
  Crypto: {
    defaultValues: {
      type: "Crypto",
    },
    fields: () => (<>
      <Typography variant="body2" sx={{ mt: 1.5, mb: 5 }}>Not supported yet.</Typography>
    </>),
    schemaShape: {},
  },
};

export interface PaymentMethodFormProps {
  acceptedPaymentTypes: PaymentType[];
  defaultValues?: PaymentMethod;
  onPlaidLinkClicked: () => void;
  onSaved?: () => void;
  onClose: () => void;
  onSubmit: (data: PaymentMethod) => void;
  privacyHref: string;
  termsOfUseHref: string;
  debug?: boolean;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  acceptedPaymentTypes,
  defaultValues: parentDefaultValues,
  onPlaidLinkClicked,
  onSaved,
  onClose,
  onSubmit,
  privacyHref,
  termsOfUseHref,
  debug
}) => {
  const formDefaultValues =
    PAYMENT_METHOD_FORM_DATA[acceptedPaymentTypes[0]]?.defaultValues ||
    PAYMENT_METHOD_FORM_DATA.CreditCard.defaultValues;

  const schema = useMemo(
    () =>
      object().shape({
        type: string().required(),
        ...Object.values(PAYMENT_METHOD_FORM_DATA).reduce(
          (acc, { schemaShape }) => ({ ...acc, ...schemaShape }),
          {}
        )
      }),
    []
  );

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...formDefaultValues,
      ...parentDefaultValues
    },
    resolver: yupResolver(schema)
  });

  const handleSelectedPaymentMethodChange = useCallback(
    (paymentType: PaymentType) => {
      const defaultValues =
        PAYMENT_METHOD_FORM_DATA[paymentType]?.defaultValues ||
        PAYMENT_METHOD_FORM_DATA.CreditCard.defaultValues;

      reset({ ...defaultValues });
    },
    [reset]
  );

  const selectedPaymentMethod = watch("type") as PaymentType;
  const Fields = PAYMENT_METHOD_FORM_DATA[selectedPaymentMethod].fields;
  const submitForm = handleSubmit(onSubmit);

  return (
    <form onSubmit={submitForm}>
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

      <Fields control={ control } />

      {debug && (
        <Box component="pre" sx={{ my: 2, overflow: "scroll" }}>
          {JSON.stringify(watch(), null, 2)}
        </Box>
      )}

      { selectedPaymentMethod === "Wire" || selectedPaymentMethod === "Crypto" ? null : (
        <CheckoutModalFooter
          variant={ selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation" }
          privacyHref={privacyHref}
          termsOfUseHref={termsOfUseHref}
          onSubmitClicked={ selectedPaymentMethod === "ACH" ? onPlaidLinkClicked : submitForm }
          onCloseClicked={onClose} />
      ) }
    </form>
  );
};
