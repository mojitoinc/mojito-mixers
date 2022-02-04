import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { useForm } from 'react-hook-form';
import { yupResolver as o } from '../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js';
import { string, object } from 'yup';
import default_1 from '../../node_modules/@mui/icons-material/Book.js';
import React__default, { useMemo, useCallback } from 'react';
import { CheckoutModalFooter } from '../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { ControlledTextField } from '../components/shared/TextField/TextField.js';
import { ControlledCardNumberField } from '../components/shared/CardNumberField/index.js';
import { ControlledCardExpiryDateField } from '../components/shared/CardExpiryDateField/index.js';
import { ControlledCardSecureCodeField } from '../components/shared/CardSecureCodeField/index.js';
import { InputGroupLabel } from '../components/shared/InputGroupLabel/InputGroupLabel.js';
import { SecondaryButton } from '../components/shared/SecondaryButton/SecondaryButton.js';
import { PaymentMethodSelector } from '../components/shared/PaymentMethodSelector/PaymentMethodSelector.js';
import { withInvalidErrorMessage, requireSchemaWhenKeyIs } from '../utils/validationUtils.js';
import { getCardNumberIsValid, getExpiryDateIsvalid, getCVCIsValid } from '../domain/payment/payment.utils.js';
import { Typography } from '@mui/material';
import Grid from '../../node_modules/@mui/material/Grid/Grid.js';
import Box from '../../node_modules/@mui/material/Box/Box.js';

var FIELD_LABELS = {
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    secureCode: "Secure Code",
    nameOnCard: "Name on Card",
    accountNumber: "Account Number",
    routingNumber: "Routing Number",
    accountName: "Account Name"
};
var isCreditCardThenRequireSchema = requireSchemaWhenKeyIs("CreditCard");
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
            cardNumber: string()
                .label(FIELD_LABELS.cardNumber)
                .when("type", {
                is: "CreditCard",
                then: function (schema) {
                    return schema.required().test({
                        name: "is-valid-card-number",
                        test: getCardNumberIsValid,
                        message: withInvalidErrorMessage
                    });
                }
            }),
            expiryDate: string()
                .label(FIELD_LABELS.expiryDate)
                .when("type", {
                is: "CreditCard",
                then: function (schema) {
                    return schema.required().test({
                        name: "is-valid-expiry-date",
                        test: getExpiryDateIsvalid,
                        message: withInvalidErrorMessage
                    });
                }
            }),
            secureCode: string()
                .label(FIELD_LABELS.secureCode)
                .when("type", {
                is: "CreditCard",
                then: function (schema) {
                    return schema.required().test({
                        name: "is-valid-cvv-or-cid-number",
                        test: function (value, context) {
                            return getCVCIsValid(value, context.parent.cardNumber);
                        },
                        message: withInvalidErrorMessage
                    });
                }
            }),
            nameOnCard: string()
                .label(FIELD_LABELS.nameOnCard)
                .when("type", isCreditCardThenRequireSchema)
        },
        fields: function (_a) {
            var control = _a.control;
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(ControlledCardNumberField, { name: "cardNumber", control: control, label: FIELD_LABELS.cardNumber }),
                React__default.createElement(Grid, { container: true, columnSpacing: 2, direction: {
                        xs: "column",
                        sm: "row"
                    } },
                    React__default.createElement(Grid, { item: true, sm: 6, zeroMinWidth: true },
                        React__default.createElement(ControlledCardExpiryDateField, { name: "expiryDate", control: control, label: FIELD_LABELS.expiryDate })),
                    React__default.createElement(Grid, { item: true, sm: 6 },
                        React__default.createElement(ControlledCardSecureCodeField, { name: "secureCode", control: control, label: FIELD_LABELS.secureCode }))),
                React__default.createElement(ControlledTextField, { name: "nameOnCard", control: control, label: FIELD_LABELS.nameOnCard })));
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
        fields: function () { return (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Typography, { variant: "body2", sx: { mt: 1.5 } }, "We use Plaid to connect to your account."))); }
    },
    Wire: {
        defaultValues: {
            type: "Wire",
        },
        fields: function () { return (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Typography, { variant: "body2", sx: { mt: 1.5, mb: 5 } }, "Not supported yet."))); },
        schemaShape: {},
    },
    Crypto: {
        defaultValues: {
            type: "Crypto",
        },
        fields: function () { return (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Typography, { variant: "body2", sx: { mt: 1.5, mb: 5 } }, "Not supported yet."))); },
        schemaShape: {},
    },
};
var PaymentMethodForm = function (_a) {
    var _b;
    var acceptedPaymentTypes = _a.acceptedPaymentTypes, parentDefaultValues = _a.defaultValues, onPlaidLinkClicked = _a.onPlaidLinkClicked, onSaved = _a.onSaved, onClose = _a.onClose, onSubmit = _a.onSubmit, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, debug = _a.debug;
    var formDefaultValues = ((_b = PAYMENT_METHOD_FORM_DATA[acceptedPaymentTypes[0]]) === null || _b === void 0 ? void 0 : _b.defaultValues) ||
        PAYMENT_METHOD_FORM_DATA.CreditCard.defaultValues;
    var schema = useMemo(function () {
        return object().shape(__assign({ type: string().required() }, Object.values(PAYMENT_METHOD_FORM_DATA).reduce(function (acc, _a) {
            var schemaShape = _a.schemaShape;
            return (__assign(__assign({}, acc), schemaShape));
        }, {})));
    }, []);
    var _c = useForm({
        defaultValues: __assign(__assign({}, formDefaultValues), parentDefaultValues),
        resolver: o(schema)
    }), control = _c.control, handleSubmit = _c.handleSubmit, watch = _c.watch, reset = _c.reset; _c.formState.errors;
    var handleSelectedPaymentMethodChange = useCallback(function (paymentType) {
        var _a;
        var defaultValues = ((_a = PAYMENT_METHOD_FORM_DATA[paymentType]) === null || _a === void 0 ? void 0 : _a.defaultValues) ||
            PAYMENT_METHOD_FORM_DATA.CreditCard.defaultValues;
        reset(__assign({}, defaultValues));
    }, [reset]);
    var selectedPaymentMethod = watch("type");
    var Fields = PAYMENT_METHOD_FORM_DATA[selectedPaymentMethod].fields;
    var submitForm = handleSubmit(onSubmit);
    return (React__default.createElement("form", { onSubmit: submitForm },
        onSaved && (React__default.createElement(Box, { sx: { my: 2.5 } },
            React__default.createElement(SecondaryButton, { onClick: onSaved, startIcon: React__default.createElement(default_1, null) }, "Use Saved Payment Method"))),
        acceptedPaymentTypes.length > 1 ? (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(InputGroupLabel, { sx: { m: 0, pt: 2, pb: 1.5 } }, "Payment Method"),
            React__default.createElement(PaymentMethodSelector, { selectedPaymentMethod: selectedPaymentMethod, onPaymentMethodChange: handleSelectedPaymentMethodChange, paymentMethods: acceptedPaymentTypes }))) : (null),
        React__default.createElement(Fields, { control: control }),
        debug && (React__default.createElement(Box, { component: "pre", sx: { my: 2, overflow: "scroll" } }, JSON.stringify(watch(), null, 2))),
        selectedPaymentMethod === "Wire" || selectedPaymentMethod === "Crypto" ? null : (React__default.createElement(CheckoutModalFooter, { variant: selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation", privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, onSubmitClicked: selectedPaymentMethod === "ACH" ? onPlaidLinkClicked : submitForm, onCloseClicked: onClose }))));
};

export { PaymentMethodForm };
//# sourceMappingURL=PaymentMethodForm.js.map
