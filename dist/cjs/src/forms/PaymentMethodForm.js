'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var reactHookForm = require('react-hook-form');
var yup$1 = require('../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js');
var yup = require('yup');
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
var material = require('@mui/material');
var DisplayBox = require('../components/payments/DisplayBox/DisplayBox.js');
var Checkbox = require('../components/shared/Checkbox/Checkbox.js');
var ConsentText = require('../components/shared/ConsentText/ConsentText.js');
var FormErrorsBox = require('../components/shared/FormErrorsBox/FormErrorsBox.js');
var useFormCheckoutError = require('../hooks/useFormCheckoutError.js');
var Grid = require('../../node_modules/@mui/material/Grid/Grid.js');
var Box = require('../../node_modules/@mui/material/Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const FIELD_LABELS = {
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    secureCode: "Secure Code",
    nameOnCard: "Name on Card",
};
const FIELD_NAMES = Object.keys(FIELD_LABELS);
const isCreditCardThenRequireSchema = validationUtils.requireSchemaWhenKeyIs("CreditCard");
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
        schemaShape: {
            cardNumber: yup.string()
                .label(FIELD_LABELS.cardNumber)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.required().test({
                    name: "is-valid-card-number",
                    test: payment_utils.getCardNumberIsValid,
                    message: validationUtils.withInvalidErrorMessage
                })
            }),
            expiryDate: yup.string()
                .label(FIELD_LABELS.expiryDate)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.required().test({
                    name: "is-valid-expiry-date",
                    test: payment_utils.getExpiryDateIsvalid,
                    message: validationUtils.withInvalidErrorMessage
                })
            }),
            secureCode: yup.string()
                .label(FIELD_LABELS.secureCode)
                .when("type", {
                is: "CreditCard",
                then: (schema) => schema.required().test({
                    name: "is-valid-cvv-or-cid-number",
                    test: (value, context) => payment_utils.getCVCIsValid(value, context.parent.cardNumber),
                    message: validationUtils.withInvalidErrorMessage
                })
            }),
            nameOnCard: yup.string()
                .label(FIELD_LABELS.nameOnCard)
                .when("type", isCreditCardThenRequireSchema),
        },
        fields: ({ control, consentType, privacyHref, termsOfUseHref }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(CardNumberField.ControlledCardNumberField, { name: "cardNumber", control: control, label: FIELD_LABELS.cardNumber }),
            React__default["default"].createElement(Grid["default"], { container: true, columnSpacing: 2, direction: {
                    xs: "column",
                    sm: "row"
                } },
                React__default["default"].createElement(Grid["default"], { item: true, sm: 6, zeroMinWidth: true },
                    React__default["default"].createElement(CardExpiryDateField.ControlledCardExpiryDateField, { name: "expiryDate", control: control, label: FIELD_LABELS.expiryDate })),
                React__default["default"].createElement(Grid["default"], { item: true, sm: 6 },
                    React__default["default"].createElement(CardSecureCodeField.ControlledCardSecureCodeField, { name: "secureCode", control: control, label: FIELD_LABELS.secureCode }))),
            React__default["default"].createElement(TextField.ControlledTextField, { name: "nameOnCard", control: control, label: FIELD_LABELS.nameOnCard }),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) })))),
    },
    ACH: {
        defaultValues: (consentType) => ({
            type: "ACH",
            accountId: "",
            publicToken: "",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: {},
        fields: ({ control, consentType, privacyHref, termsOfUseHref }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                React__default["default"].createElement(material.Typography, { variant: "body1" }, "We use Plaid to connect to your account.")),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) })))),
    },
    Wire: {
        defaultValues: (consentType) => ({
            type: "Wire",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: {},
        fields: ({ control, consentType, privacyHref, termsOfUseHref }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                React__default["default"].createElement(material.Typography, { variant: "body1" }, "Not supported yet.")),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) })))),
    },
    Crypto: {
        defaultValues: (consentType) => ({
            type: "Crypto",
            consent: consentType === "checkbox" ? false : true,
        }),
        schemaShape: {},
        fields: ({ control, consentType, privacyHref, termsOfUseHref }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                React__default["default"].createElement(material.Typography, { variant: "body1" }, "Not supported yet.")),
            consentType === "checkbox" && (React__default["default"].createElement(Checkbox.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                    "I ",
                    React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) })))),
    },
};
const PaymentMethodForm = ({ acceptedPaymentTypes, defaultValues: parentDefaultValues, checkoutError, onPlaidLinkClicked, onSaved, onClose, onSubmit, consentType, privacyHref, termsOfUseHref, debug = false }) => {
    const defaultPaymentType = acceptedPaymentTypes[0] || "CreditCard";
    const defaultPaymentTypeFormData = PAYMENT_TYPE_FORM_DATA[defaultPaymentType];
    const defaultPaymentTypeDefaultValues = defaultPaymentTypeFormData.defaultValues(consentType);
    const schema = React.useMemo(() => {
        return yup.object().shape(Object.assign({ type: yup.string().required(), consent: yup.boolean().oneOf([true], ConsentText.CONSENT_ERROR_MESSAGE) }, Object.values(PAYMENT_TYPE_FORM_DATA).reduce((objectShape, { schemaShape }) => (Object.assign(Object.assign({}, objectShape), schemaShape)), {})));
    }, []);
    const { control, handleSubmit, watch, reset, trigger, setError, formState, } = reactHookForm.useForm({
        defaultValues: Object.assign(Object.assign({}, defaultPaymentTypeDefaultValues), parentDefaultValues),
        reValidateMode: "onChange",
        resolver: yup$1.yupResolver(schema),
    });
    const handleSelectedPaymentMethodChange = React.useCallback((paymentType) => {
        reset(Object.assign({}, PAYMENT_TYPE_FORM_DATA[paymentType].defaultValues(consentType)));
    }, [reset, consentType]);
    const selectedPaymentMethod = watch("type");
    const Fields = PAYMENT_TYPE_FORM_DATA[selectedPaymentMethod].fields;
    const submitForm = handleSubmit(onSubmit);
    const checkoutErrorMessage = useFormCheckoutError.useFormCheckoutError({ formKey: "payment", checkoutError, fields: FIELD_NAMES, setError, deps: [selectedPaymentMethod] });
    const handleFormSubmit = React.useCallback((e) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (selectedPaymentMethod === "ACH") {
            const isFormValid = yield trigger();
            if (!isFormValid) {
                submitForm(e);
                return;
            }
            onPlaidLinkClicked();
        }
        else if (selectedPaymentMethod === "CreditCard") {
            submitForm(e);
        }
    }), [selectedPaymentMethod, onPlaidLinkClicked, submitForm, trigger]);
    return (React__default["default"].createElement("form", { onSubmit: handleFormSubmit },
        onSaved && (React__default["default"].createElement(Box["default"], { sx: { my: 2.5 } },
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onSaved, startIcon: React__default["default"].createElement(Book["default"], null) }, "Use Saved Payment Method"))),
        acceptedPaymentTypes.length > 1 ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2, pb: 1.5 } }, "Payment Method"),
            React__default["default"].createElement(PaymentMethodSelector.PaymentMethodSelector, { selectedPaymentMethod: selectedPaymentMethod, onPaymentMethodChange: handleSelectedPaymentMethodChange, paymentMethods: acceptedPaymentTypes }))) : (null),
        React__default["default"].createElement(Fields, { control: control, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref }),
        checkoutErrorMessage && React__default["default"].createElement(FormErrorsBox.FormErrorsBox, { error: checkoutErrorMessage, sx: { mt: 5 } }),
        debug && (React__default["default"].createElement(DisplayBox.DebugBox, { sx: { mt: 5 } },
            JSON.stringify(watch(), null, 2),
            "\n\n",
            JSON.stringify(formState.errors, null, 2))),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation", consentType: consentType === "checkbox" ? undefined : consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, submitDisabled: selectedPaymentMethod === "Wire" || selectedPaymentMethod === "Crypto", onCloseClicked: onClose })));
};

exports.PaymentMethodForm = PaymentMethodForm;
//# sourceMappingURL=PaymentMethodForm.js.map
