'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var reactHookForm = require('react-hook-form');
var yup$1 = require('../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js');
var yup = require('yup');
var material = require('@mui/material');
var Book = require('../../node_modules/@mui/icons-material/Book.js');
var React = require('react');
var CheckoutModalFooter = require('../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var TextField = require('../components/shared/TextField/TextField.js');
var CardNumberField = require('../components/shared/CardNumberField/CardNumberField.js');
var CardExpiryDateField = require('../components/shared/CardExpiryDateField/CardExpiryDateField.js');
var CardSecureCodeField = require('../components/shared/CardSecureCodeField/CardSecureCodeField.js');
var InputGroupLabel = require('../components/shared/InputGroupLabel/InputGroupLabel.js');
var SecondaryButton = require('../components/shared/SecondaryButton/SecondaryButton.js');
var PaymentMethodSelector = require('../components/shared/PaymentMethodSelector/PaymentMethodSelector.js');
var validationUtils = require('../utils/validationUtils.js');
var payment_utils = require('../domain/payment/payment.utils.js');
var DisplayBox = require('../components/payments/DisplayBox/DisplayBox.js');
var DebugBox = require('../components/payments/DebugBox/DebugBox.js');
var Checkbox = require('../components/shared/Checkbox/Checkbox.js');
var ConsentText = require('../components/shared/ConsentText/ConsentText.js');
var FormErrorsBox = require('../components/shared/FormErrorsBox/FormErrorsBox.js');
var useFormCheckoutError = require('../hooks/useFormCheckoutError.js');
var useDictionary = require('../hooks/useDictionary.js');
var reactPaymentInputs_utils = require('../domain/react-payment-inputs/react-payment-inputs.utils.js');
var reactPaymentInputs = require('react-payment-inputs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const FIELD_LABELS = {
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    secureCode: "Secure Code",
    nameOnCard: "Name on Card",
    accountNumber: "Account Number",
    routingNumber: "Routing Number (ABA)",
};
const FIELD_NAMES = Object.keys(FIELD_LABELS);
const isCreditCardThenRequireSchema = validationUtils.requireSchemaWhenKeyIs("CreditCard");
const isWireThenRequireSchema = validationUtils.requireSchemaWhenKeyIs("Wire");
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
            cardNumber: yup.string()
                .label(FIELD_LABELS.cardNumber)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.required(validationUtils.withRequiredErrorMessage).test({
                    name: "is-valid-card-number",
                    test: (cardNumber, context) => {
                        const creditCardNumberError = reactPaymentInputs.getCardNumberError(cardNumber);
                        if (creditCardNumberError) {
                            return new yup.ValidationError(validationUtils.withInvalidCardNumber({ label: FIELD_LABELS.cardNumber }), cardNumber, context.path);
                        }
                        if (acceptedCreditCardNetworks && acceptedCreditCardNetworks.length > 0) {
                            const creditCardNetwork = payment_utils.getCreditCardNetworkFromNumber(cardNumber || "");
                            if (creditCardNetwork === "" || !acceptedCreditCardNetworks.includes(creditCardNetwork)) {
                                return new yup.ValidationError(validationUtils.withInvalidCreditCardNetwork({ acceptedCreditCardNetworks }), cardNumber, context.path);
                            }
                        }
                        return true;
                    },
                })
            }),
            expiryDate: yup.string()
                .label(FIELD_LABELS.expiryDate)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.required(validationUtils.withRequiredErrorMessage).test({
                    name: "is-valid-expiry-date",
                    test: payment_utils.getExpiryDateIsValid,
                    message: validationUtils.withInvalidErrorMessage
                })
            }),
            secureCode: yup.string()
                // .label(FIELD_LABELS.secureCode)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.test({
                    name: "is-valid-cvv",
                    test: (cvv, context) => {
                        const creditCardNetwork = payment_utils.getCreditCardNetworkFromNumber(context.parent.cardNumber || "");
                        const cvvLabel = reactPaymentInputs_utils.getCardTypeByType(creditCardNetwork).code.name;
                        if (!cvv) {
                            return new yup.ValidationError(validationUtils.withRequiredErrorMessage({ label: cvvLabel }), cvv, context.path);
                        }
                        const { cvvExpectedLength, isCvvValid } = payment_utils.getCvvIsValid(cvv, creditCardNetwork, acceptedCreditCardNetworks, true);
                        if (!isCvvValid) {
                            return new yup.ValidationError(validationUtils.withInvalidCVV({ cvvLabel, cvvExpectedLength }), cvv, context.path);
                        }
                        return true;
                    },
                }),
            }),
            nameOnCard: yup.string()
                .label(FIELD_LABELS.nameOnCard)
                .when("type", isCreditCardThenRequireSchema),
        }),
        fields: ({ control, cvvLabel, consentType }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(CardNumberField.ControlledCardNumberField, { name: "cardNumber", control: control, label: FIELD_LABELS.cardNumber }),
            React__default["default"].createElement(material.Grid, { container: true, columnSpacing: 2, direction: {
                    xs: "column",
                    sm: "row"
                } },
                React__default["default"].createElement(material.Grid, { item: true, sm: 6, zeroMinWidth: true },
                    React__default["default"].createElement(CardExpiryDateField.ControlledCardExpiryDateField, { name: "expiryDate", control: control, label: FIELD_LABELS.expiryDate })),
                React__default["default"].createElement(material.Grid, { item: true, sm: 6 },
                    React__default["default"].createElement(CardSecureCodeField.ControlledCardSecureCodeField, { name: "secureCode", control: control, label: cvvLabel }))),
            React__default["default"].createElement(TextField.ControlledTextField, { name: "nameOnCard", control: control, label: FIELD_LABELS.nameOnCard }),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, null)) })))),
    },
    ACH: {
        defaultValues: (consentType) => ({
            type: "ACH",
            accountId: "",
            publicToken: "",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: () => ({}),
        fields: ({ control, consentType }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                React__default["default"].createElement(material.Typography, { variant: "body1" }, "We use Plaid to connect to your account.")),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, null)) })))),
    },
    Wire: {
        defaultValues: (consentType) => ({
            type: "Wire",
            accountNumber: "",
            routingNumber: "",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: () => ({
            accountNumber: yup.string()
                .label(FIELD_LABELS.accountNumber)
                .when("type", isWireThenRequireSchema),
            routingNumber: yup.string()
                .label(FIELD_LABELS.routingNumber)
                .when("type", isWireThenRequireSchema),
        }),
        fields: ({ control, consentType, dictionary }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(TextField.ControlledTextField, { name: "accountNumber", control: control, label: FIELD_LABELS.accountNumber }),
            React__default["default"].createElement(TextField.ControlledTextField, { name: "routingNumber", control: control, label: FIELD_LABELS.routingNumber }),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, null)) })),
            React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5 } }, dictionary.wirePaymentsDisclaimer.map((line, i) => (React__default["default"].createElement(material.Typography, { key: i, variant: "body1", sx: i === 0 ? undefined : { mt: 1.5 } }, line)))))),
    },
    Crypto: {
        defaultValues: (consentType) => ({
            type: "Crypto",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: () => ({}),
        fields: ({ control, consentType }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                React__default["default"].createElement(material.Typography, { variant: "body1" }, "Not supported yet.")),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, null)) })))),
    },
};
const PaymentMethodForm = ({ acceptedPaymentTypes, acceptedCreditCardNetworks, defaultValues: parentDefaultValues, checkoutError, plaidLoading, plaidError, onPlaidLinkClicked, refetchPlaidLink, onSaved, onClose, onSubmit, onAttemptSubmit, consentType, debug = false }) => {
    const defaultPaymentType = acceptedPaymentTypes[0] || "CreditCard";
    const defaultPaymentTypeFormData = PAYMENT_TYPE_FORM_DATA[defaultPaymentType];
    const defaultPaymentTypeDefaultValues = defaultPaymentTypeFormData.defaultValues(consentType);
    const schema = React.useMemo(() => {
        return yup.object().shape(Object.assign({ type: yup.string().required(validationUtils.withRequiredErrorMessage), consent: yup.boolean().oneOf([true], ConsentText.CONSENT_ERROR_MESSAGE) }, Object.values(PAYMENT_TYPE_FORM_DATA).reduce((objectShape, { schemaShape }) => (Object.assign(Object.assign({}, objectShape), schemaShape(acceptedCreditCardNetworks))), {})));
    }, [acceptedCreditCardNetworks]);
    const dictionary = useDictionary.useDictionary();
    const { control, handleSubmit, watch, reset, trigger, setError, formState, } = reactHookForm.useForm({
        defaultValues: Object.assign(Object.assign({}, defaultPaymentTypeDefaultValues), parentDefaultValues),
        reValidateMode: "onChange",
        resolver: yup$1.yupResolver(schema),
    });
    const handleSelectedPaymentMethodChange = React.useCallback((paymentType) => {
        reset(Object.assign({}, PAYMENT_TYPE_FORM_DATA[paymentType].defaultValues(consentType)));
        if (paymentType === "ACH" && !!plaidError)
            refetchPlaidLink();
    }, [reset, consentType, plaidError, refetchPlaidLink]);
    const selectedPaymentMethod = watch("type");
    const Fields = PAYMENT_TYPE_FORM_DATA[selectedPaymentMethod].fields;
    const submitForm = handleSubmit(onSubmit);
    const checkoutErrorMessage = useFormCheckoutError.useFormCheckoutError({ formKey: "payment", checkoutError, fields: FIELD_NAMES, setError, deps: [selectedPaymentMethod] });
    const creditCardNumber = watch("cardNumber");
    const creditCardNetwork = payment_utils.getCreditCardNetworkFromNumber(creditCardNumber || "");
    const cvvLabel = reactPaymentInputs_utils.getCardTypeByType(creditCardNetwork).code.name;
    const handleFormSubmit = React.useCallback((e) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
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
    const showPlaidError = selectedPaymentMethod === "ACH" && !!plaidError;
    console.log("plaidLoading =", plaidLoading, plaidError);
    return (React__default["default"].createElement("form", { onSubmit: handleFormSubmit },
        onSaved && (React__default["default"].createElement(material.Box, { sx: { my: 2.5 } },
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onSaved, startIcon: React__default["default"].createElement(Book["default"], null) }, "Use Saved Payment Method"))),
        acceptedPaymentTypes.length > 1 && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2, pb: 1.5 } }, "Payment Method"),
            React__default["default"].createElement(PaymentMethodSelector.PaymentMethodSelector, { selectedPaymentMethod: selectedPaymentMethod, onPaymentMethodChange: handleSelectedPaymentMethodChange, paymentMethods: acceptedPaymentTypes }))),
        !onSaved && acceptedPaymentTypes.length <= 1 && (React__default["default"].createElement(material.Box, { sx: { mt: 1 } })),
        React__default["default"].createElement(Fields, { control: control, cvvLabel: cvvLabel, consentType: consentType, dictionary: dictionary }),
        checkoutErrorMessage && React__default["default"].createElement(FormErrorsBox.FormErrorsBox, { error: checkoutErrorMessage, sx: { mt: 5 } }),
        showPlaidError && (React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: { mt: 2, color: theme => theme.palette.warning.dark } }, "Error connecting to Plaid.")),
        debug && (React__default["default"].createElement(DebugBox.DebugBox, { sx: { mt: 5 } },
            JSON.stringify(watch(), null, 2),
            "\n\n",
            JSON.stringify(formState.errors, null, 2))),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation", consentType: consentType === "checkbox" ? undefined : consentType, submitDisabled: selectedPaymentMethod === "Crypto" || showPlaidError, submitLoading: plaidLoading, onCloseClicked: onClose })));
};

exports.PaymentMethodForm = PaymentMethodForm;
//# sourceMappingURL=PaymentMethodForm.js.map
