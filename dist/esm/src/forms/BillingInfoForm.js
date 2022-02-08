import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { useForm } from 'react-hook-form';
import { yupResolver as o } from '../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js';
import { object, string } from 'yup';
import React__default from 'react';
import { ControlledCountrySelector } from '../components/shared/Select/CountrySelector/CountrySelector.js';
import { ControlledStateSelector } from '../components/shared/Select/StateSelector/StateSelector.js';
import { CheckoutModalFooter } from '../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { InputGroupLabel } from '../components/shared/InputGroupLabel/InputGroupLabel.js';
import { ControlledTextField } from '../components/shared/TextField/TextField.js';
import { SecondaryButton } from '../components/shared/SecondaryButton/SecondaryButton.js';
import { Box } from '@mui/material';
import default_1 from '../../node_modules/@mui/icons-material/Book.js';
import { EMPTY_OPTION } from '../components/shared/Select/Select.js';
import { withRequiredErrorMessage } from '../utils/validationUtils.js';
import { DebugBox } from '../components/payments/DisplayBox/DisplayBox.js';
import Grid from '../../node_modules/@mui/material/Grid/Grid.js';

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
    _b[COUNTRY_FIELD] = EMPTY_OPTION,
    _b[CITY_FIELD] = "",
    _b[STATE_FIELD] = EMPTY_OPTION,
    _b[ZIP_CODE_FIELD] = "",
    _b);
// export type BillingInfoFormVariant = "guest" | "loggedIn";
var schema = object()
    .shape((_c = {},
    _c[FULL_NAME_FIELD] = string()
        .label(FIELD_LABELS[FULL_NAME_FIELD])
        .required(withRequiredErrorMessage),
    _c[EMAIL_FIELD] = string()
        .label(FIELD_LABELS[EMAIL_FIELD])
        .email()
        .required(withRequiredErrorMessage),
    _c[PHONE_FIELD] = string()
        .label(FIELD_LABELS[PHONE_FIELD])
        .required(withRequiredErrorMessage),
    _c[STREET_FIELD] = string()
        .label(FIELD_LABELS[STREET_FIELD])
        .required(withRequiredErrorMessage),
    _c[APARTMENT_FIELD] = string().label(FIELD_LABELS[APARTMENT_FIELD]),
    _c[COUNTRY_FIELD] = object().shape({
        value: string()
            .label(FIELD_LABELS[COUNTRY_FIELD])
            .required(withRequiredErrorMessage)
    }),
    _c[CITY_FIELD] = string()
        .label(FIELD_LABELS[CITY_FIELD])
        .required(withRequiredErrorMessage),
    _c[STATE_FIELD] = object().shape({
        value: string()
            .label(FIELD_LABELS[STATE_FIELD])
            .required(withRequiredErrorMessage)
    }),
    _c[ZIP_CODE_FIELD] = string()
        .label(FIELD_LABELS[ZIP_CODE_FIELD])
        .required(withRequiredErrorMessage),
    _c))
    .required();
var BillingInfoForm = function (_a) {
    var 
    // variant,
    defaultValues = _a.defaultValues, onSaved = _a.onSaved, onClose = _a.onClose, onSubmit = _a.onSubmit, debug = _a.debug;
    var _b = useForm({
        defaultValues: __assign(__assign({}, EMPTY_FORM_VALUES), defaultValues),
        reValidateMode: "onChange",
        resolver: o(schema),
    }), control = _b.control, handleSubmit = _b.handleSubmit, watch = _b.watch;
    var selectedCountryOption = watch(COUNTRY_FIELD);
    var selectedCountryCode = selectedCountryOption === null || selectedCountryOption === void 0 ? void 0 : selectedCountryOption.value;
    var submitForm = handleSubmit(onSubmit);
    return (React__default.createElement("form", { onSubmit: submitForm },
        onSaved && (React__default.createElement(Box, { sx: { my: 2.5 } },
            React__default.createElement(SecondaryButton, { onClick: onSaved, startIcon: React__default.createElement(default_1, null) }, "Use Saved Billing Info"))),
        React__default.createElement(InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Information"),
        React__default.createElement(ControlledTextField, { name: FULL_NAME_FIELD, control: control, label: FIELD_LABELS[FULL_NAME_FIELD] }),
        React__default.createElement(ControlledTextField, { name: EMAIL_FIELD, control: control, label: FIELD_LABELS[EMAIL_FIELD] }),
        React__default.createElement(ControlledTextField, { name: PHONE_FIELD, control: control, label: FIELD_LABELS[PHONE_FIELD] }),
        React__default.createElement(InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Address"),
        React__default.createElement(ControlledTextField, { name: STREET_FIELD, control: control, label: FIELD_LABELS[STREET_FIELD] }),
        React__default.createElement(ControlledTextField, { name: APARTMENT_FIELD, control: control, label: FIELD_LABELS[APARTMENT_FIELD] }),
        React__default.createElement(Grid, { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default.createElement(Grid, { item: true, sm: 6, zeroMinWidth: true },
                React__default.createElement(ControlledCountrySelector, { name: COUNTRY_FIELD, control: control, label: FIELD_LABELS[COUNTRY_FIELD] })),
            React__default.createElement(Grid, { item: true, sm: 6 },
                React__default.createElement(ControlledTextField, { name: CITY_FIELD, control: control, label: FIELD_LABELS[CITY_FIELD] }))),
        React__default.createElement(Grid, { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default.createElement(Grid, { item: true, sm: 6, zeroMinWidth: true, sx: { maxWidth: "100%" } },
                React__default.createElement(ControlledStateSelector, { name: STATE_FIELD, control: control, label: FIELD_LABELS[STATE_FIELD], countryCode: selectedCountryCode })),
            React__default.createElement(Grid, { item: true, sm: 6 },
                React__default.createElement(ControlledTextField, { name: ZIP_CODE_FIELD, control: control, label: FIELD_LABELS[ZIP_CODE_FIELD] }))),
        debug && (React__default.createElement(DebugBox, { sx: { my: 2 } }, JSON.stringify(watch(), null, 2))),
        React__default.createElement(CheckoutModalFooter, { variant: "toPayment", onCloseClicked: onClose })));
};

export { BillingInfoForm };
//# sourceMappingURL=BillingInfoForm.js.map
