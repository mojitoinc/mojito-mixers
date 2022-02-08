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
var DisplayBox = require('../components/payments/DisplayBox/DisplayBox.js');
var index$3 = require('../components/shared/Checkbox/index.js');
var ConsentText = require('../components/shared/ConsentText/ConsentText.js');
var Grid = require('../../node_modules/@mui/material/Grid/Grid.js');
var Box = require('../../node_modules/@mui/material/Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var FIELD_LABELS = {
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    secureCode: "Secure Code",
    nameOnCard: "Name on Card",
};
var isCreditCardThenRequireSchema = validationUtils.requireSchemaWhenKeyIs("CreditCard");
var PAYMENT_TYPE_FORM_DATA = {
    CreditCard: {
        defaultValues: function (consentType) { return ({
            type: "CreditCard",
            cardNumber: "",
            expiryDate: "",
            secureCode: "",
            nameOnCard: "",
            consent: consentType === "checkbox" ? false : true,
        }); },
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
                .when("type", isCreditCardThenRequireSchema),
        },
        fields: function (_a) {
            var control = _a.control, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref;
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
                React__default["default"].createElement(TextField.ControlledTextField, { name: "nameOnCard", control: control, label: FIELD_LABELS.nameOnCard }),
                consentType === "checkbox" && (React__default["default"].createElement(index$3.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                        "I ",
                        React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) }))));
        },
    },
    ACH: {
        defaultValues: function (consentType) { return ({
            type: "ACH",
            accountId: "",
            publicToken: "",
            consent: consentType === "checkbox" ? false : true,
        }); },
        schemaShape: {},
        fields: function (_a) {
            var control = _a.control, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref;
            return (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                    React__default["default"].createElement(material.Typography, { variant: "body1" }, "We use Plaid to connect to your account.")),
                consentType === "checkbox" && (React__default["default"].createElement(index$3.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                        "I ",
                        React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) }))));
        },
    },
    Wire: {
        defaultValues: function (consentType) { return ({
            type: "Wire",
            consent: consentType === "checkbox" ? false : true,
        }); },
        schemaShape: {},
        fields: function (_a) {
            var control = _a.control, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref;
            return (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                    React__default["default"].createElement(material.Typography, { variant: "body1" }, "Not supported yet.")),
                consentType === "checkbox" && (React__default["default"].createElement(index$3.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                        "I ",
                        React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) }))));
        },
    },
    Crypto: {
        defaultValues: function (consentType) { return ({
            type: "Crypto",
            consent: consentType === "checkbox" ? false : true,
        }); },
        schemaShape: {},
        fields: function (_a) {
            var control = _a.control, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref;
            return (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { mt: 1.5, mb: consentType === "checkbox" ? 1 : 0 } },
                    React__default["default"].createElement(material.Typography, { variant: "body1" }, "Not supported yet.")),
                consentType === "checkbox" && (React__default["default"].createElement(index$3.ControlledCheckbox, { name: "consent", control: control, label: React__default["default"].createElement(React__default["default"].Fragment, null,
                        "I ",
                        React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) }))));
        },
    },
};
var PaymentMethodForm = function (_a) {
    var acceptedPaymentTypes = _a.acceptedPaymentTypes, parentDefaultValues = _a.defaultValues, onPlaidLinkClicked = _a.onPlaidLinkClicked, onSaved = _a.onSaved, onClose = _a.onClose, onSubmit = _a.onSubmit, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, _b = _a.debug, debug = _b === void 0 ? false : _b;
    var defaultPaymentType = acceptedPaymentTypes[0] || "CreditCard";
    var defaultPaymentTypeFormData = PAYMENT_TYPE_FORM_DATA[defaultPaymentType];
    var defaultPaymentTypeDefaultValues = defaultPaymentTypeFormData.defaultValues(consentType);
    var schema = React.useMemo(function () {
        return yup.object().shape(tslib_es6.__assign({ type: yup.string().required(), consent: yup.boolean().oneOf([true], ConsentText.CONSENT_ERROR_MESSAGE) }, Object.values(PAYMENT_TYPE_FORM_DATA).reduce(function (objectShape, _a) {
            var schemaShape = _a.schemaShape;
            return (tslib_es6.__assign(tslib_es6.__assign({}, objectShape), schemaShape));
        }, {})));
    }, []);
    var _c = reactHookForm.useForm({
        defaultValues: tslib_es6.__assign(tslib_es6.__assign({}, defaultPaymentTypeDefaultValues), parentDefaultValues),
        reValidateMode: "onChange",
        resolver: yup$1.yupResolver(schema)
    }), control = _c.control, handleSubmit = _c.handleSubmit, watch = _c.watch, reset = _c.reset, trigger = _c.trigger;
    var handleSelectedPaymentMethodChange = React.useCallback(function (paymentType) {
        reset(tslib_es6.__assign({}, PAYMENT_TYPE_FORM_DATA[paymentType].defaultValues(consentType)));
    }, [reset, consentType]);
    var selectedPaymentMethod = watch("type");
    var Fields = PAYMENT_TYPE_FORM_DATA[selectedPaymentMethod].fields;
    var submitForm = handleSubmit(onSubmit);
    var handleFormSubmit = React.useCallback(function (e) { return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
        var isFormValid;
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!(selectedPaymentMethod === "ACH")) return [3 /*break*/, 2];
                    return [4 /*yield*/, trigger()];
                case 1:
                    isFormValid = _a.sent();
                    if (!isFormValid) {
                        submitForm(e);
                        return [2 /*return*/];
                    }
                    onPlaidLinkClicked();
                    return [3 /*break*/, 3];
                case 2:
                    if (selectedPaymentMethod === "CreditCard") {
                        submitForm(e);
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [selectedPaymentMethod, onPlaidLinkClicked, submitForm, trigger]);
    return (React__default["default"].createElement("form", { onSubmit: handleFormSubmit },
        onSaved && (React__default["default"].createElement(Box["default"], { sx: { my: 2.5 } },
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onSaved, startIcon: React__default["default"].createElement(Book["default"], null) }, "Use Saved Payment Method"))),
        acceptedPaymentTypes.length > 1 ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2, pb: 1.5 } }, "Payment Method"),
            React__default["default"].createElement(PaymentMethodSelector.PaymentMethodSelector, { selectedPaymentMethod: selectedPaymentMethod, onPaymentMethodChange: handleSelectedPaymentMethodChange, paymentMethods: acceptedPaymentTypes }))) : (null),
        React__default["default"].createElement(Fields, { control: control, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref }),
        debug && (React__default["default"].createElement(Box["default"], { component: "pre", sx: { my: 2, overflow: "scroll" } }, JSON.stringify(watch(), null, 2))),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation", consentType: consentType === "checkbox" ? undefined : consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, submitDisabled: selectedPaymentMethod === "Wire" || selectedPaymentMethod === "Crypto", onCloseClicked: onClose })));
};

exports.PaymentMethodForm = PaymentMethodForm;
//# sourceMappingURL=PaymentMethodForm.js.map
