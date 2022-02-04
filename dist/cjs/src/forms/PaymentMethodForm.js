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
var index = require('../components/shared/CardNumberField/index.js');
var index$1 = require('../components/shared/CardExpiryDateField/index.js');
var index$2 = require('../components/shared/CardSecureCodeField/index.js');
var InputGroupLabel = require('../components/shared/InputGroupLabel/InputGroupLabel.js');
var SecondaryButton = require('../components/shared/SecondaryButton/SecondaryButton.js');
var PaymentMethodSelector = require('../components/shared/PaymentMethodSelector/PaymentMethodSelector.js');
var validationUtils = require('../utils/validationUtils.js');
var payment_utils = require('../domain/payment/payment.utils.js');
var material = require('@mui/material');
var Grid = require('../../node_modules/@mui/material/Grid/Grid.js');
var Box = require('../../node_modules/@mui/material/Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var FIELD_LABELS = {
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    secureCode: "Secure Code",
    nameOnCard: "Name on Card",
    accountNumber: "Account Number",
    routingNumber: "Routing Number",
    accountName: "Account Name"
};
var isCreditCardThenRequireSchema = validationUtils.requireSchemaWhenKeyIs("CreditCard");
var PAYMENT_METHOD_FORM_DATA = {
    CreditCard: {
        defaultValues: {
            type: "CreditCard",
            cardNumber: "",
            expiryDate: "",
            secureCode: "",
            nameOnCard: ""
        },
        schemaShape: {
            cardNumber: yup.string()
                .label(FIELD_LABELS.cardNumber)
                .when("type", {
                is: "CreditCard",
                then: function (schema) {
                    return schema.required().test({
                        name: "is-valid-card-number",
                        test: payment_utils.getCardNumberIsValid,
                        message: validationUtils.withInvalidErrorMessage
                    });
                }
            }),
            expiryDate: yup.string()
                .label(FIELD_LABELS.expiryDate)
                .when("type", {
                is: "CreditCard",
                then: function (schema) {
                    return schema.required().test({
                        name: "is-valid-expiry-date",
                        test: payment_utils.getExpiryDateIsvalid,
                        message: validationUtils.withInvalidErrorMessage
                    });
                }
            }),
            secureCode: yup.string()
                .label(FIELD_LABELS.secureCode)
                .when("type", {
                is: "CreditCard",
                then: function (schema) {
                    return schema.required().test({
                        name: "is-valid-cvv-or-cid-number",
                        test: function (value, context) {
                            return payment_utils.getCVCIsValid(value, context.parent.cardNumber);
                        },
                        message: validationUtils.withInvalidErrorMessage
                    });
                }
            }),
            nameOnCard: yup.string()
                .label(FIELD_LABELS.nameOnCard)
                .when("type", isCreditCardThenRequireSchema)
        },
        fields: function (_a) {
            var control = _a.control;
            return (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(index.ControlledCardNumberField, { name: "cardNumber", control: control, label: FIELD_LABELS.cardNumber }),
                React__default["default"].createElement(Grid["default"], { container: true, columnSpacing: 2, direction: {
                        xs: "column",
                        sm: "row"
                    } },
                    React__default["default"].createElement(Grid["default"], { item: true, sm: 6, zeroMinWidth: true },
                        React__default["default"].createElement(index$1.ControlledCardExpiryDateField, { name: "expiryDate", control: control, label: FIELD_LABELS.expiryDate })),
                    React__default["default"].createElement(Grid["default"], { item: true, sm: 6 },
                        React__default["default"].createElement(index$2.ControlledCardSecureCodeField, { name: "secureCode", control: control, label: FIELD_LABELS.secureCode }))),
                React__default["default"].createElement(TextField.ControlledTextField, { name: "nameOnCard", control: control, label: FIELD_LABELS.nameOnCard })));
        }
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
        fields: function () { return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Typography, { variant: "body2", sx: { mt: 1.5 } }, "We use Plaid to connect to your account."))); }
    },
    Wire: {
        defaultValues: {
            type: "Wire",
        },
        fields: function () { return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Typography, { variant: "body2", sx: { mt: 1.5, mb: 5 } }, "Not supported yet."))); },
        schemaShape: {},
    },
    Crypto: {
        defaultValues: {
            type: "Crypto",
        },
        fields: function () { return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Typography, { variant: "body2", sx: { mt: 1.5, mb: 5 } }, "Not supported yet."))); },
        schemaShape: {},
    },
};
var PaymentMethodForm = function (_a) {
    var _b;
    var acceptedPaymentTypes = _a.acceptedPaymentTypes, parentDefaultValues = _a.defaultValues, onPlaidLinkClicked = _a.onPlaidLinkClicked, onSaved = _a.onSaved, onClose = _a.onClose, onSubmit = _a.onSubmit, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, debug = _a.debug;
    var formDefaultValues = ((_b = PAYMENT_METHOD_FORM_DATA[acceptedPaymentTypes[0]]) === null || _b === void 0 ? void 0 : _b.defaultValues) ||
        PAYMENT_METHOD_FORM_DATA.CreditCard.defaultValues;
    var schema = React.useMemo(function () {
        return yup.object().shape(tslib_es6.__assign({ type: yup.string().required() }, Object.values(PAYMENT_METHOD_FORM_DATA).reduce(function (acc, _a) {
            var schemaShape = _a.schemaShape;
            return (tslib_es6.__assign(tslib_es6.__assign({}, acc), schemaShape));
        }, {})));
    }, []);
    var _c = reactHookForm.useForm({
        defaultValues: tslib_es6.__assign(tslib_es6.__assign({}, formDefaultValues), parentDefaultValues),
        resolver: yup$1.yupResolver(schema)
    }), control = _c.control, handleSubmit = _c.handleSubmit, watch = _c.watch, reset = _c.reset; _c.formState.errors;
    var handleSelectedPaymentMethodChange = React.useCallback(function (paymentType) {
        var _a;
        var defaultValues = ((_a = PAYMENT_METHOD_FORM_DATA[paymentType]) === null || _a === void 0 ? void 0 : _a.defaultValues) ||
            PAYMENT_METHOD_FORM_DATA.CreditCard.defaultValues;
        reset(tslib_es6.__assign({}, defaultValues));
    }, [reset]);
    var selectedPaymentMethod = watch("type");
    var Fields = PAYMENT_METHOD_FORM_DATA[selectedPaymentMethod].fields;
    var submitForm = handleSubmit(onSubmit);
    return (React__default["default"].createElement("form", { onSubmit: submitForm },
        onSaved && (React__default["default"].createElement(Box["default"], { sx: { my: 2.5 } },
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onSaved, startIcon: React__default["default"].createElement(Book["default"], null) }, "Use Saved Payment Method"))),
        acceptedPaymentTypes.length > 1 ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2, pb: 1.5 } }, "Payment Method"),
            React__default["default"].createElement(PaymentMethodSelector.PaymentMethodSelector, { selectedPaymentMethod: selectedPaymentMethod, onPaymentMethodChange: handleSelectedPaymentMethodChange, paymentMethods: acceptedPaymentTypes }))) : (null),
        React__default["default"].createElement(Fields, { control: control }),
        debug && (React__default["default"].createElement(Box["default"], { component: "pre", sx: { my: 2, overflow: "scroll" } }, JSON.stringify(watch(), null, 2))),
        selectedPaymentMethod === "Wire" || selectedPaymentMethod === "Crypto" ? null : (React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation", privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, onSubmitClicked: selectedPaymentMethod === "ACH" ? onPlaidLinkClicked : submitForm, onCloseClicked: onClose }))));
};

exports.PaymentMethodForm = PaymentMethodForm;
//# sourceMappingURL=PaymentMethodForm.js.map
