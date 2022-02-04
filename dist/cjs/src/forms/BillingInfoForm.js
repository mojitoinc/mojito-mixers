'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var reactHookForm = require('react-hook-form');
var yup$1 = require('../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js');
var yup = require('yup');
var React = require('react');
var CountrySelector = require('../components/shared/Select/CountrySelector/CountrySelector.js');
var StateSelector = require('../components/shared/Select/StateSelector/StateSelector.js');
var CheckoutModalFooter = require('../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var InputGroupLabel = require('../components/shared/InputGroupLabel/InputGroupLabel.js');
var TextField = require('../components/shared/TextField/TextField.js');
var SecondaryButton = require('../components/shared/SecondaryButton/SecondaryButton.js');
var material = require('@mui/material');
var Book = require('../../node_modules/@mui/icons-material/Book.js');
var Select = require('../components/shared/Select/Select.js');
var validationUtils = require('../utils/validationUtils.js');
var Grid = require('../../node_modules/@mui/material/Grid/Grid.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _a, _b, _c;
var FULL_NAME_FIELD = "fullName";
var EMAIL_FIELD = "email";
var PHONE_FIELD = "phone";
var STREET_FIELD = "street";
var APARTMENT_FIELD = "apartment";
var COUNTRY_FIELD = "country";
var CITY_FIELD = "city";
var STATE_FIELD = "state";
var ZIP_CODE_FIELD = "zipCode";
var FIELD_LABELS = (_a = {},
    _a[FULL_NAME_FIELD] = "Full Name",
    _a[EMAIL_FIELD] = "Email",
    _a[PHONE_FIELD] = "Phone",
    _a[STREET_FIELD] = "Street",
    _a[APARTMENT_FIELD] = "Apartment, Suite, etc. (optional)",
    _a[COUNTRY_FIELD] = "Country",
    _a[CITY_FIELD] = "City",
    _a[STATE_FIELD] = "State",
    _a[ZIP_CODE_FIELD] = "Zip Code",
    _a);
var EMPTY_FORM_VALUES = (_b = {},
    _b[FULL_NAME_FIELD] = "",
    _b[EMAIL_FIELD] = "",
    _b[PHONE_FIELD] = "",
    _b[STREET_FIELD] = "",
    _b[APARTMENT_FIELD] = "",
    _b[COUNTRY_FIELD] = Select.EMPTY_OPTION,
    _b[CITY_FIELD] = "",
    _b[STATE_FIELD] = Select.EMPTY_OPTION,
    _b[ZIP_CODE_FIELD] = "",
    _b);
// export type BillingInfoFormVariant = "guest" | "loggedIn";
var schema = yup.object()
    .shape((_c = {},
    _c[FULL_NAME_FIELD] = yup.string()
        .label(FIELD_LABELS[FULL_NAME_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    _c[EMAIL_FIELD] = yup.string()
        .label(FIELD_LABELS[EMAIL_FIELD])
        .email()
        .required(validationUtils.withRequiredErrorMessage),
    _c[PHONE_FIELD] = yup.string()
        .label(FIELD_LABELS[PHONE_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    _c[STREET_FIELD] = yup.string()
        .label(FIELD_LABELS[STREET_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    _c[APARTMENT_FIELD] = yup.string().label(FIELD_LABELS[APARTMENT_FIELD]),
    _c[COUNTRY_FIELD] = yup.object().shape({
        value: yup.string()
            .label(FIELD_LABELS[COUNTRY_FIELD])
            .required(validationUtils.withRequiredErrorMessage)
    }),
    _c[CITY_FIELD] = yup.string()
        .label(FIELD_LABELS[CITY_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    _c[STATE_FIELD] = yup.object().shape({
        value: yup.string()
            .label(FIELD_LABELS[STATE_FIELD])
            .required(validationUtils.withRequiredErrorMessage)
    }),
    _c[ZIP_CODE_FIELD] = yup.string()
        .label(FIELD_LABELS[ZIP_CODE_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    _c))
    .required();
var BillingInfoForm = function (_a) {
    var 
    // variant,
    defaultValues = _a.defaultValues, onSaved = _a.onSaved, onClose = _a.onClose, onSubmit = _a.onSubmit, debug = _a.debug;
    var _b = reactHookForm.useForm({
        defaultValues: tslib_es6.__assign(tslib_es6.__assign({}, EMPTY_FORM_VALUES), defaultValues),
        resolver: yup$1.yupResolver(schema)
    }), control = _b.control, handleSubmit = _b.handleSubmit, watch = _b.watch;
    var selectedCountryOption = watch(COUNTRY_FIELD);
    var selectedCountryCode = selectedCountryOption === null || selectedCountryOption === void 0 ? void 0 : selectedCountryOption.value;
    var submitForm = handleSubmit(onSubmit);
    return (React__default["default"].createElement("form", { onSubmit: submitForm },
        onSaved && (React__default["default"].createElement(material.Box, { sx: { my: 2.5 } },
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onSaved, startIcon: React__default["default"].createElement(Book["default"], null) }, "Use Saved Billing Info"))),
        React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Information"),
        React__default["default"].createElement(TextField.ControlledTextField, { name: FULL_NAME_FIELD, control: control, label: FIELD_LABELS[FULL_NAME_FIELD] }),
        React__default["default"].createElement(TextField.ControlledTextField, { name: EMAIL_FIELD, control: control, label: FIELD_LABELS[EMAIL_FIELD] }),
        React__default["default"].createElement(TextField.ControlledTextField, { name: PHONE_FIELD, control: control, label: FIELD_LABELS[PHONE_FIELD] }),
        React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Address"),
        React__default["default"].createElement(TextField.ControlledTextField, { name: STREET_FIELD, control: control, label: FIELD_LABELS[STREET_FIELD] }),
        React__default["default"].createElement(TextField.ControlledTextField, { name: APARTMENT_FIELD, control: control, label: FIELD_LABELS[APARTMENT_FIELD] }),
        React__default["default"].createElement(Grid["default"], { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6, zeroMinWidth: true },
                React__default["default"].createElement(CountrySelector.ControlledCountrySelector, { name: COUNTRY_FIELD, control: control, label: FIELD_LABELS[COUNTRY_FIELD] })),
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6 },
                React__default["default"].createElement(TextField.ControlledTextField, { name: CITY_FIELD, control: control, label: FIELD_LABELS[CITY_FIELD] }))),
        React__default["default"].createElement(Grid["default"], { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6, zeroMinWidth: true, sx: { maxWidth: "100%" } },
                React__default["default"].createElement(StateSelector.ControlledStateSelector, { name: STATE_FIELD, control: control, label: FIELD_LABELS[STATE_FIELD], countryCode: selectedCountryCode })),
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6 },
                React__default["default"].createElement(TextField.ControlledTextField, { name: ZIP_CODE_FIELD, control: control, label: FIELD_LABELS[ZIP_CODE_FIELD] }))),
        debug && (React__default["default"].createElement(material.Box, { component: "pre", sx: { my: 2, overflow: "scroll" } }, JSON.stringify(watch(), null, 2))),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toPayment", privacyHref: "", termsOfUseHref: "", onSubmitClicked: submitForm, onCloseClicked: onClose })));
};

exports.BillingInfoForm = BillingInfoForm;
//# sourceMappingURL=BillingInfoForm.js.map
