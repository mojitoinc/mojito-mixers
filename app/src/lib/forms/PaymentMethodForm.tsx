import { Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, object, string, ValidationError } from "yup";
import { ObjectShape } from "yup/lib/object";
import { Grid, Box, Typography, Link } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import React, { useCallback, useMemo } from "react";
import { getCardNumberError } from "react-payment-inputs";
import { ApolloError } from "@apollo/client";
import { CheckoutModalFooter } from "../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { ControlledTextField } from "../components/shared/TextField/TextField";
import { ControlledCardNumberField } from "../components/shared/CardNumberField/CardNumberField";
import { ControlledCardExpiryDateField } from "../components/shared/CardExpiryDateField/CardExpiryDateField";
import { ControlledCardSecureCodeField } from "../components/shared/CardSecureCodeField/CardSecureCodeField";
import { InputGroupLabel } from "../components/shared/InputGroupLabel/InputGroupLabel";
import { SecondaryButton } from "../components/shared/SecondaryButton/SecondaryButton";
import { PaymentMethodSelector } from "../components/shared/PaymentMethodSelector/PaymentMethodSelector";
import { PaymentMethod, PaymentType } from "../domain/payment/payment.interfaces";
import {
  CONSENT_ERROR_MESSAGE,
  requireSchemaWhenKeyIs,
  withInvalidCardNumber,
  withInvalidConnection,
  withInvalidCreditCardNetwork,
  withInvalidCVV,
  withInvalidErrorMessage,
  withRequiredErrorMessage,
} from "../utils/validationUtils";
import {
  getExpiryDateIsValid,
  getCvvIsValid,
  getCreditCardNetworkFromNumber,
} from "../domain/payment/payment.utils";
import { DisplayBox } from "../components/payments/DisplayBox/DisplayBox";
import { DebugBox } from "../components/payments/DebugBox/DebugBox";
import { ControlledCheckbox } from "../components/shared/Checkbox/Checkbox";
import { ConsentText, ConsentType } from "../components/shared/ConsentText/ConsentText";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { FormErrorsBox } from "../components/shared/FormErrorsBox/FormErrorsBox";
import { useFormCheckoutError } from "../hooks/useFormCheckoutError";
import { PUIDictionary } from "../domain/dictionary/dictionary.interfaces";
import { useDictionary } from "../hooks/useDictionary";
import { CreditCardNetwork, getCardTypeByType } from "../domain/react-payment-inputs/react-payment-inputs.utils";
import { FormErrorsCaption } from "../components/shared/FormErrorCaption/FormErrorCaption";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { useLimits } from "../hooks/useLimits";
import { Market } from "../components/public/CheckoutOverlay/CheckoutOverlay";
import { ConnectedWalletItem } from "../components/payments/ConnectedWalletItem/ConnectedWalletItem";
import { InfoBox } from "../components/payments/InfoBox/InfoBox";
import { ErrorBox } from "../components/payments/ErrorBox/ErrorBox";

interface PaymentTypeFormProps {
  control: Control<PaymentMethod & { consent: boolean }>;
  cvvLabel: string;
  consentType?: ConsentType;
  dictionary: PUIDictionary;
}

interface PaymentTypeFormData {
  defaultValues: (consentType?: ConsentType) => PaymentMethod & { consent: boolean };
  schemaShape: (acceptedCreditCardNetworks?: CreditCardNetwork[]) => ObjectShape;
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
    defaultValues: consentType => ({
      type: "CreditCard",
      cardNumber: "",
      expiryDate: "",
      secureCode: "",
      nameOnCard: "",
      consent: consentType !== "checkbox",
    }),
    schemaShape: acceptedCreditCardNetworks => ({
      cardNumber: string()
        .label(FIELD_LABELS.cardNumber)
        .when("type", {
          is: "CreditCard",
          then: (schema) => {
            return schema.required(withRequiredErrorMessage).test({
              name: "is-valid-card-number",
              test: (cardNumber, context) => {
                const creditCardNumberError = getCardNumberError(cardNumber);

                if (creditCardNumberError) {
                  return new ValidationError(
                    withInvalidCardNumber({ label: FIELD_LABELS.cardNumber }),
                    cardNumber,
                    context.path,
                  );
                }

                if (acceptedCreditCardNetworks && acceptedCreditCardNetworks.length > 0) {
                  const creditCardNetwork = getCreditCardNetworkFromNumber(cardNumber || "");

                  if (creditCardNetwork === "" || !acceptedCreditCardNetworks.includes(creditCardNetwork)) {
                    return new ValidationError(
                      withInvalidCreditCardNetwork({ acceptedCreditCardNetworks }),
                      cardNumber,
                      context.path,
                    );
                  }
                }

                return true;
              },
            });
          },
        }),
      expiryDate: string()
        .label(FIELD_LABELS.expiryDate)
        .when("type", {
          is: "CreditCard",
          then: (schema) => {
            return schema.required(withRequiredErrorMessage).test({
              name: "is-valid-expiry-date",
              test: getExpiryDateIsValid,
              message: withInvalidErrorMessage,
            });
          },
        }),
      secureCode: string()
        // .label(FIELD_LABELS.secureCode)
        .when("type", {
          is: "CreditCard",
          then: (schema) => {
            return schema.test({
              name: "is-valid-cvv",
              test: (cvv, context) => {
                const creditCardNetwork = getCreditCardNetworkFromNumber(context.parent.cardNumber || "");
                const cvvLabel = getCardTypeByType(creditCardNetwork).code.name;

                if (!cvv) {
                  return new ValidationError(
                    withRequiredErrorMessage({ label: cvvLabel }),
                    cvv,
                    context.path,
                  );
                }

                const { cvvExpectedLength, isCvvValid } = getCvvIsValid(
                  cvv,
                  creditCardNetwork,
                  acceptedCreditCardNetworks,
                  true,
                );

                if (!isCvvValid) {
                  return new ValidationError(
                    withInvalidCVV({ cvvLabel, cvvExpectedLength }),
                    cvv,
                    context.path,
                  );
                }

                return true;
              },
            });
          },
        }),
      nameOnCard: string()
        .label(FIELD_LABELS.nameOnCard)
        .when("type", isCreditCardThenRequireSchema),
    }),
    fields: ({ control, cvvLabel, consentType }) => (
      <>
        <ControlledCardNumberField
          name="cardNumber"
          control={ control }
          label={ FIELD_LABELS.cardNumber } />

        <Grid
          container
          columnSpacing={ 2 }
          direction={{
            xs: "column",
            sm: "row",
          }}>
          <Grid item sm={ 6 } zeroMinWidth>
            <ControlledCardExpiryDateField
              name="expiryDate"
              control={ control }
              label={ FIELD_LABELS.expiryDate } />
          </Grid>
          <Grid item sm={ 6 }>
            <ControlledCardSecureCodeField
              name="secureCode"
              control={ control }
              label={ cvvLabel } />
          </Grid>
        </Grid>

        <ControlledTextField
          name="nameOnCard"
          control={ control }
          label={ FIELD_LABELS.nameOnCard } />

        { consentType === "checkbox" && (
          <ControlledCheckbox
            name="consent"
            control={ control }
            label={ <>I <ConsentText /></> } />
        ) }
      </>
    ),
  },
  ACH: {
    defaultValues: consentType => ({
      type: "ACH",
      accountId: "",
      publicToken: "",
      consent: consentType !== "checkbox",
    }),
    schemaShape: () => ({}),
    fields: ({ control, consentType }) => (
      <>
        <DisplayBox sx={{ mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 }}>
          <Typography variant="body1">
            We use Plaid to connect to your account.
          </Typography>
        </DisplayBox>

        { consentType === "checkbox" && (
          <ControlledCheckbox
            name="consent"
            control={ control }
            label={ <>I <ConsentText /></> } />
        ) }
      </>
    ),
  },
  Wire: {
    defaultValues: consentType => ({
      type: "Wire",
      accountNumber: "",
      routingNumber: "",
      consent: consentType !== "checkbox",
    }),
    schemaShape: () => ({
      accountNumber: string()
        .label(FIELD_LABELS.accountNumber)
        .when("type", isWireThenRequireSchema),
      routingNumber: string()
        .label(FIELD_LABELS.routingNumber)
        .when("type", isWireThenRequireSchema),
    }),
    fields: ({ control, consentType, dictionary }) => (
      <>
        <ControlledTextField
          name="accountNumber"
          control={ control }
          label={ FIELD_LABELS.accountNumber } />

        <ControlledTextField
          name="routingNumber"
          control={ control }
          label={ FIELD_LABELS.routingNumber } />

        { consentType === "checkbox" && (
          <ControlledCheckbox
            name="consent"
            control={ control }
            label={ <>I <ConsentText /></> } />
        ) }

        <DisplayBox sx={{ mt: 1.5 }}>
          { dictionary.wirePaymentsDisclaimer.map((line, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Typography key={ i } variant="body1" sx={ i === 0 ? undefined : { mt: 1.5 } }>{ line }</Typography>
          )) }
        </DisplayBox>
      </>
    ),
  },
  Crypto: {
    defaultValues: consentType => ({
      type: "Crypto",
      consent: consentType !== "checkbox",
    }),
    schemaShape: () => ({}),
    fields: ({ control, consentType }) => (
      <>
        { /* TODO: Pass address, status and balance as props: */ }
        <ConnectedWalletItem
          boxProps={{ sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } }}
          address="0xb794f5ea0ba39494ce839613fffba74279579268"
          status="connected"
          balance={{ WETH: 1.2, ETH: 1.2 }} />

        { !!window && (
          <ErrorBox sx={{ mt: 2, mb: consentType === "checkbox" ? 1 : 0 }}>
            <Typography>
              Your connected wallet currently does not have enough [WETH|WMATIC] to complete your purchase.{ " " }
              <Link href="https://support.opensea.io/hc/en-us/articles/360063498293-What-s-WETH-How-do-I-get-it-/" target="_blank" rel="noopener noreferrer">
                How do I get [WETH|WMATIC]?
              </Link>
            </Typography>
          </ErrorBox>
        ) }

        { !!window && (
          <InfoBox sx={{ mt: 2, mb: consentType === "checkbox" ? 1 : 0 }}>
            <Typography>
              Only Cryptocurrency is accepted for secondary sales
            </Typography>
          </InfoBox>
        ) }

        { consentType === "checkbox" && (
          <ControlledCheckbox
            name="consent"
            control={ control }
            label={ <>I <ConsentText /></> } />
        ) }
      </>
    ),
  },
  Coinbase: {
    defaultValues: consentType => ({
      type: "Coinbase",
      consent: consentType !== "checkbox",
    }),
    schemaShape: () => ({}),
    fields: ({ control, consentType }) => (
      <>
        <DisplayBox sx={{ mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 }}>
          <Typography variant="body1">
            We use Coinbase to connect to your wallet.
          </Typography>
        </DisplayBox>

        { consentType === "checkbox" && (
          <ControlledCheckbox
            name="consent"
            control={ control }
            label={ <>I <ConsentText /></> } />
        ) }
      </>
    ),
  },
};

export interface PaymentMethodFormProps {
  acceptedPaymentTypes: PaymentType[];
  acceptedCreditCardNetworks?: CreditCardNetwork[];
  defaultValues?: PaymentMethod;
  checkoutError?: CheckoutModalError;
  plaidLoading: boolean;
  plaidError?: ApolloError;
  onPlaidLinkClicked: () => void;
  refetchPlaidLink: () => void;
  onSaved?: () => void;
  onClose: () => void;
  onSubmit: (data: PaymentMethod) => void;
  onAttemptSubmit: () => void;
  marketType: Market;
  consentType?: ConsentType;
  checkoutItems: CheckoutItem[];
  debug?: boolean;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  acceptedPaymentTypes,
  acceptedCreditCardNetworks,
  defaultValues: parentDefaultValues,
  checkoutError,
  plaidLoading,
  plaidError,
  onPlaidLinkClicked,
  refetchPlaidLink,
  onSaved,
  onClose,
  onSubmit,
  onAttemptSubmit,
  marketType,
  consentType,
  checkoutItems,
  debug = false,
}) => {
  const defaultPaymentType = marketType === "secondary" ? "Crypto" : (acceptedPaymentTypes[0] || "CreditCard");
  const defaultPaymentTypeFormData = PAYMENT_TYPE_FORM_DATA[defaultPaymentType];
  const defaultPaymentTypeDefaultValues = defaultPaymentTypeFormData.defaultValues(consentType);

  const schema = useMemo(() => {
    return object().shape({
      type: string().required(withRequiredErrorMessage),
      consent: boolean().oneOf([true], CONSENT_ERROR_MESSAGE),
      ...Object.values(PAYMENT_TYPE_FORM_DATA).reduce((objectShape, { schemaShape }) => {
        return ({ ...objectShape, ...schemaShape(acceptedCreditCardNetworks) });
      }, {} as ObjectShape),
    });
  }, [acceptedCreditCardNetworks]);

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

  const firstCheckoutItem = checkoutItems[0];

  // Item Limits:

  const selectedPaymentMethod = watch("type") as PaymentType;

  const {
    limits,
    loading: loadingItemLimits,
    limitExceededMessage,
  } = useLimits(firstCheckoutItem, acceptedPaymentTypes, selectedPaymentMethod);

  const handleSelectedPaymentMethodChange = useCallback((paymentType: PaymentType) => {
    reset({ ...PAYMENT_TYPE_FORM_DATA[paymentType].defaultValues(consentType) });

    if (paymentType === "ACH" && !!plaidError) refetchPlaidLink();
  }, [reset, consentType, plaidError, refetchPlaidLink]);

  const Fields = PAYMENT_TYPE_FORM_DATA[selectedPaymentMethod].fields;
  const submitForm = handleSubmit(onSubmit);
  const checkoutErrorMessage = useFormCheckoutError({ formKey: "payment", checkoutError, fields: FIELD_NAMES, setError, deps: [selectedPaymentMethod] });

  const acceptsManyPaymentMethods = acceptedPaymentTypes.length > 1;
  const creditCardNumber = watch("cardNumber") as string;
  const creditCardNetwork = getCreditCardNetworkFromNumber(creditCardNumber || "");
  const cvvLabel = getCardTypeByType(creditCardNetwork).code.name;

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    onAttemptSubmit();

    if (selectedPaymentMethod === "ACH" || selectedPaymentMethod === "Crypto") {
      const isFormValid = await trigger();

      if (!isFormValid) {
        // This will make the validation errors appear:
        submitForm(e);

        return;
      }

      if (selectedPaymentMethod === "ACH") {
        onPlaidLinkClicked();
      } else {
        // throw new Error("Crypto payments from wallet not implemented yet.");

        // TODO: Make payment with wallet.

        // Move to the next screen:
        submitForm();
      }
    } else {
      submitForm(e);
    }
  }, [onAttemptSubmit, selectedPaymentMethod, onPlaidLinkClicked, submitForm, trigger]);

  const addSpacing = !onSaved && acceptedPaymentTypes.length <= 1;
  const showPlaidError = selectedPaymentMethod === "ACH" && !!plaidError;

  return (
    <form onSubmit={ handleFormSubmit }>
      { onSaved && (
        <Box sx={{ my: 2.5 }}>
          <SecondaryButton onClick={ onSaved } startIcon={ <BookIcon /> }>
            Use Saved Payment Method
          </SecondaryButton>
        </Box>
      ) }

      { acceptsManyPaymentMethods && (
        <>
          <InputGroupLabel sx={{ m: 0, pt: 2, pb: 1.5 }}>Payment Method</InputGroupLabel>

          <PaymentMethodSelector
            marketType={ marketType }
            selectedPaymentMethod={ selectedPaymentMethod }
            onPaymentMethodChange={ handleSelectedPaymentMethodChange }
            paymentMethods={ acceptedPaymentTypes } />
        </>
      ) }

      { addSpacing && !limitExceededMessage ? (
        <Box sx={{ mt: 1 }} />
      ) : null }

      { limitExceededMessage ? (
        <DisplayBox sx={{ mt: addSpacing ? 1 : 0, mb: 2.5 }}>
          <Typography sx={{ fontWeight: "500" }}>
            { limitExceededMessage }
          </Typography>
        </DisplayBox>
      ) : null }

      { /* TODO: Separate in FormFragment or FormFields components instead of object for the rendering part: */ }

      <Fields
        control={ control }
        cvvLabel={ cvvLabel }
        consentType={ consentType }
        dictionary={ dictionary } />

      { checkoutErrorMessage && <FormErrorsBox error={ checkoutErrorMessage } sx={{ mt: 5 }} /> }

      { showPlaidError && (
        <FormErrorsCaption sx={{ mt: 2 }}>
          { withInvalidConnection({ label: "Plaid" }) }
        </FormErrorsCaption>
      ) }

      { debug && (
        <DebugBox sx={{ mt: 5 }}>
          { JSON.stringify(watch(), null, 2) }
          { "\n\n" }
          { JSON.stringify(formState.errors, null, 2) }
          { "\n\n" }
          { JSON.stringify(limits, null, 2) }
        </DebugBox>
      ) }

      <CheckoutModalFooter
        variant={ selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation" }
        consentType={ consentType === "checkbox" ? undefined : consentType }
        submitLabel={ loadingItemLimits ? "Verifying purchase..." : undefined }
        submitDisabled={ showPlaidError || loadingItemLimits || !!limitExceededMessage }
        submitLoading={ plaidLoading || loadingItemLimits }
        onCloseClicked={ onClose } />
    </form>
  );
};
