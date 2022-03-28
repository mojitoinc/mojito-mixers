import { __awaiter } from '../../node_modules/tslib/tslib.es6.js';
import { useForm } from 'react-hook-form';
import { yupResolver as o } from '../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js';
import { object, string, boolean, ValidationError } from 'yup';
import { Box, Grid, Typography } from '@mui/material';
import default_1 from '../../node_modules/@mui/icons-material/Book.js';
import React__default, { useMemo, useCallback } from 'react';
import { CheckoutModalFooter } from '../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { ControlledTextField } from '../components/shared/TextField/TextField.js';
import { ControlledCardNumberField } from '../components/shared/CardNumberField/CardNumberField.js';
import { ControlledCardExpiryDateField } from '../components/shared/CardExpiryDateField/CardExpiryDateField.js';
import { ControlledCardSecureCodeField } from '../components/shared/CardSecureCodeField/CardSecureCodeField.js';
import { InputGroupLabel } from '../components/shared/InputGroupLabel/InputGroupLabel.js';
import { SecondaryButton } from '../components/shared/SecondaryButton/SecondaryButton.js';
import { PaymentMethodSelector } from '../components/shared/PaymentMethodSelector/PaymentMethodSelector.js';
import { withRequiredErrorMessage, withInvalidCardNumber, withInvalidCreditCardNetwork, withInvalidErrorMessage, withInvalidCVV, requireSchemaWhenKeyIs } from '../utils/validationUtils.js';
import { getCreditCardNetworkFromNumber, getExpiryDateIsValid, getCvvIsValid } from '../domain/payment/payment.utils.js';
import { DisplayBox } from '../components/payments/DisplayBox/DisplayBox.js';
import { DebugBox } from '../components/payments/DebugBox/DebugBox.js';
import { ControlledCheckbox } from '../components/shared/Checkbox/Checkbox.js';
import { CONSENT_ERROR_MESSAGE, ConsentText } from '../components/shared/ConsentText/ConsentText.js';
import { FormErrorsBox } from '../components/shared/FormErrorsBox/FormErrorsBox.js';
import { useFormCheckoutError } from '../hooks/useFormCheckoutError.js';
import { useDictionary } from '../hooks/useDictionary.js';
import { getCardTypeByType } from '../domain/react-payment-inputs/react-payment-inputs.utils.js';
import { getCardNumberError } from 'react-payment-inputs';

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
const PAYMENT_TYPE_FORM_DATA = {
    CreditCard: {
        defaultValues: (consentType) => ({
            type: "CreditCard",
            cardNumber: "",
            expiryDate: "",
            secureCode: "",
            nameOnCard: "",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: (acceptedCreditCardNetworks) => ({
            cardNumber: string()
                .label(FIELD_LABELS.cardNumber)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.required(withRequiredErrorMessage).test({
                    name: "is-valid-card-number",
                    test: (cardNumber, context) => {
                        const creditCardNumberError = getCardNumberError(cardNumber);
                        if (creditCardNumberError) {
                            return new ValidationError(withInvalidCardNumber({ label: FIELD_LABELS.cardNumber }), cardNumber, context.path);
                        }
                        if (acceptedCreditCardNetworks && acceptedCreditCardNetworks.length > 0) {
                            const creditCardNetwork = getCreditCardNetworkFromNumber(cardNumber || "");
                            if (creditCardNetwork === "" || !acceptedCreditCardNetworks.includes(creditCardNetwork)) {
                                return new ValidationError(withInvalidCreditCardNetwork({ acceptedCreditCardNetworks }), cardNumber, context.path);
                            }
                        }
                        return true;
                    },
                })
            }),
            expiryDate: string()
                .label(FIELD_LABELS.expiryDate)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.required(withRequiredErrorMessage).test({
                    name: "is-valid-expiry-date",
                    test: getExpiryDateIsValid,
                    message: withInvalidErrorMessage
                })
            }),
            secureCode: string()
                // .label(FIELD_LABELS.secureCode)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.test({
                    name: "is-valid-cvv",
                    test: (cvv, context) => {
                        const creditCardNetwork = getCreditCardNetworkFromNumber(context.parent.cardNumber || "");
                        const cvvLabel = getCardTypeByType(creditCardNetwork).code.name;
                        if (!cvv) {
                            return new ValidationError(withRequiredErrorMessage({ label: cvvLabel }), cvv, context.path);
                        }
                        const { cvvExpectedLength, isCvvValid } = getCvvIsValid(cvv, creditCardNetwork, acceptedCreditCardNetworks, true);
                        if (!isCvvValid) {
                            return new ValidationError(withInvalidCVV({ cvvLabel, cvvExpectedLength }), cvv, context.path);
                        }
                        return true;
                    },
                }),
            }),
            nameOnCard: string()
                .label(FIELD_LABELS.nameOnCard)
                .when("type", isCreditCardThenRequireSchema),
        }),
        fields: ({ control, cvvLabel, consentType }) => (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(ControlledCardNumberField, { name: "cardNumber", control: control, label: FIELD_LABELS.cardNumber }),
            React__default.createElement(Grid, { container: true, columnSpacing: 2, direction: {
                    xs: "column",
                    sm: "row"
                } },
                React__default.createElement(Grid, { item: true, sm: 6, zeroMinWidth: true },
                    React__default.createElement(ControlledCardExpiryDateField, { name: "expiryDate", control: control, label: FIELD_LABELS.expiryDate })),
                React__default.createElement(Grid, { item: true, sm: 6 },
                    React__default.createElement(ControlledCardSecureCodeField, { name: "secureCode", control: control, label: cvvLabel }))),
            React__default.createElement(ControlledTextField, { name: "nameOnCard", control: control, label: FIELD_LABELS.nameOnCard }),
            consentType === "checkbox" && (React__default.createElement(ControlledCheckbox, { name: "consent", control: control, label: React__default.createElement(React__default.Fragment, null,
                    "I ",
                    React__default.createElement(ConsentText, null)) })))),
    },
    ACH: {
        defaultValues: (consentType) => ({
            type: "ACH",
            accountId: "",
            publicToken: "",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: () => ({}),
        fields: ({ control, consentType }) => (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                React__default.createElement(Typography, { variant: "body1" }, "We use Plaid to connect to your account.")),
            consentType === "checkbox" && (React__default.createElement(ControlledCheckbox, { name: "consent", control: control, label: React__default.createElement(React__default.Fragment, null,
                    "I ",
                    React__default.createElement(ConsentText, null)) })))),
    },
    Wire: {
        defaultValues: (consentType) => ({
            type: "Wire",
            accountNumber: "",
            routingNumber: "",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: () => ({
            accountNumber: string()
                .label(FIELD_LABELS.accountNumber)
                .when("type", isWireThenRequireSchema),
            routingNumber: string()
                .label(FIELD_LABELS.routingNumber)
                .when("type", isWireThenRequireSchema),
        }),
        fields: ({ control, consentType, dictionary }) => (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(ControlledTextField, { name: "accountNumber", control: control, label: FIELD_LABELS.accountNumber }),
            React__default.createElement(ControlledTextField, { name: "routingNumber", control: control, label: FIELD_LABELS.routingNumber }),
            consentType === "checkbox" && (React__default.createElement(ControlledCheckbox, { name: "consent", control: control, label: React__default.createElement(React__default.Fragment, null,
                    "I ",
                    React__default.createElement(ConsentText, null)) })),
            React__default.createElement(DisplayBox, { sx: { mt: 1.5 } }, dictionary.wirePaymentsDisclaimer.map((line, i) => (React__default.createElement(Typography, { key: i, variant: "body1", sx: i === 0 ? undefined : { mt: 1.5 } }, line)))))),
    },
    Crypto: {
        defaultValues: (consentType) => ({
            type: "Crypto",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: () => ({}),
        fields: ({ control, consentType }) => (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                React__default.createElement(Typography, { variant: "body1" }, "Not supported yet.")),
            consentType === "checkbox" && (React__default.createElement(ControlledCheckbox, { name: "consent", control: control, label: React__default.createElement(React__default.Fragment, null,
                    "I ",
                    React__default.createElement(ConsentText, null)) })))),
    },
};
const PaymentMethodForm = ({ acceptedPaymentTypes, acceptedCreditCardNetworks, defaultValues: parentDefaultValues, checkoutError, onPlaidLinkClicked, onSaved, onClose, onSubmit, onAttemptSubmit, consentType, debug = false }) => {
    const defaultPaymentType = acceptedPaymentTypes[0] || "CreditCard";
    const defaultPaymentTypeFormData = PAYMENT_TYPE_FORM_DATA[defaultPaymentType];
    const defaultPaymentTypeDefaultValues = defaultPaymentTypeFormData.defaultValues(consentType);
    const schema = useMemo(() => {
        return object().shape(Object.assign({ type: string().required(withRequiredErrorMessage), consent: boolean().oneOf([true], CONSENT_ERROR_MESSAGE) }, Object.values(PAYMENT_TYPE_FORM_DATA).reduce((objectShape, { schemaShape }) => (Object.assign(Object.assign({}, objectShape), schemaShape(acceptedCreditCardNetworks))), {})));
    }, [acceptedCreditCardNetworks]);
    const dictionary = useDictionary();
    const { control, handleSubmit, watch, reset, trigger, setError, formState, } = useForm({
        defaultValues: Object.assign(Object.assign({}, defaultPaymentTypeDefaultValues), parentDefaultValues),
        reValidateMode: "onChange",
        resolver: o(schema),
    });
    const handleSelectedPaymentMethodChange = useCallback((paymentType) => {
        reset(Object.assign({}, PAYMENT_TYPE_FORM_DATA[paymentType].defaultValues(consentType)));
    }, [reset, consentType]);
    const selectedPaymentMethod = watch("type");
    const Fields = PAYMENT_TYPE_FORM_DATA[selectedPaymentMethod].fields;
    const submitForm = handleSubmit(onSubmit);
    const checkoutErrorMessage = useFormCheckoutError({ formKey: "payment", checkoutError, fields: FIELD_NAMES, setError, deps: [selectedPaymentMethod] });
    const creditCardNumber = watch("cardNumber");
    const creditCardNetwork = getCreditCardNetworkFromNumber(creditCardNumber || "");
    const cvvLabel = getCardTypeByType(creditCardNetwork).code.name;
    const handleFormSubmit = useCallback((e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        onAttemptSubmit();
        if (selectedPaymentMethod === "ACH") {
            const isFormValid = yield trigger();
            if (!isFormValid) {
                submitForm(e);
                return;
            }
            onPlaidLinkClicked();
        }
        else if (["CreditCard", "Wire"].includes(selectedPaymentMethod)) {
            submitForm(e);
        }
    }), [onAttemptSubmit, selectedPaymentMethod, onPlaidLinkClicked, submitForm, trigger]);
    return (React__default.createElement("form", { onSubmit: handleFormSubmit },
        onSaved && (React__default.createElement(Box, { sx: { my: 2.5 } },
            React__default.createElement(SecondaryButton, { onClick: onSaved, startIcon: React__default.createElement(default_1, null) }, "Use Saved Payment Method"))),
        acceptedPaymentTypes.length > 1 && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(InputGroupLabel, { sx: { m: 0, pt: 2, pb: 1.5 } }, "Payment Method"),
            React__default.createElement(PaymentMethodSelector, { selectedPaymentMethod: selectedPaymentMethod, onPaymentMethodChange: handleSelectedPaymentMethodChange, paymentMethods: acceptedPaymentTypes }))),
        !onSaved && acceptedPaymentTypes.length <= 1 && (React__default.createElement(Box, { sx: { mt: 1 } })),
        React__default.createElement(Fields, { control: control, cvvLabel: cvvLabel, consentType: consentType, dictionary: dictionary }),
        checkoutErrorMessage && React__default.createElement(FormErrorsBox, { error: checkoutErrorMessage, sx: { mt: 5 } }),
        debug && (React__default.createElement(DebugBox, { sx: { mt: 5 } },
            JSON.stringify(watch(), null, 2),
            "\n\n",
            JSON.stringify(formState.errors, null, 2))),
        React__default.createElement(CheckoutModalFooter, { variant: selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation", consentType: consentType === "checkbox" ? undefined : consentType, submitDisabled: selectedPaymentMethod === "Crypto", onCloseClicked: onClose })));
};

export { PaymentMethodForm };
//# sourceMappingURL=PaymentMethodForm.js.map
