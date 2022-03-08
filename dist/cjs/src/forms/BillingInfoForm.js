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
var DisplayBox = require('../components/payments/DisplayBox/DisplayBox.js');
var useFormCheckoutError = require('../hooks/useFormCheckoutError.js');
var TaxesMessagesBox = require('../components/shared/TaxesMessagesBox/TaxesMessagesBox.js');
var FormErrorsBox = require('../components/shared/FormErrorsBox/FormErrorsBox.js');
var circle_utils = require('../domain/circle/circle.utils.js');
var Grid = require('../../node_modules/@mui/material/Grid/Grid.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const FULL_NAME_FIELD = "fullName";
const EMAIL_FIELD = "email";
const PHONE_FIELD = "phone";
const STREET_FIELD = "street";
const APARTMENT_FIELD = "apartment";
const ZIP_CODE_FIELD = "zipCode";
const CITY_FIELD = "city";
const STATE_FIELD = "state";
const COUNTRY_FIELD = "country";
const FIELD_LABELS = {
    [FULL_NAME_FIELD]: "Full Name",
    [EMAIL_FIELD]: "Email",
    [PHONE_FIELD]: "Phone",
    [STREET_FIELD]: "Street",
    [APARTMENT_FIELD]: "Apartment, Suite, etc. (optional)",
    [ZIP_CODE_FIELD]: "Zip Code",
    [CITY_FIELD]: "City",
    [STATE_FIELD]: "State",
    [COUNTRY_FIELD]: "Country",
};
const FIELD_NAMES = Object.keys(FIELD_LABELS);
const EMPTY_FORM_VALUES = {
    [FULL_NAME_FIELD]: "",
    [EMAIL_FIELD]: "",
    [PHONE_FIELD]: "",
    [STREET_FIELD]: "",
    [APARTMENT_FIELD]: "",
    [ZIP_CODE_FIELD]: "",
    [CITY_FIELD]: "",
    [STATE_FIELD]: Select.EMPTY_OPTION,
    [COUNTRY_FIELD]: Select.EMPTY_OPTION,
};
// export type BillingInfoFormVariant = "guest" | "loggedIn";
const schema = yup.object()
    .shape({
    [FULL_NAME_FIELD]: yup.string()
        .label(FIELD_LABELS[FULL_NAME_FIELD])
        .required(validationUtils.withRequiredErrorMessage)
        .test({
        name: "is-valid-full-name",
        test: (value) => {
            if (!value)
                return false;
            return /(. .)/.test(value);
        },
        message: validationUtils.withFullNameErrorMessage,
    }),
    [EMAIL_FIELD]: yup.string()
        .label(FIELD_LABELS[EMAIL_FIELD])
        .required(validationUtils.withRequiredErrorMessage)
        .email(),
    [PHONE_FIELD]: yup.string()
        .label(FIELD_LABELS[PHONE_FIELD])
        .required(validationUtils.withRequiredErrorMessage)
        .test({
        name: "is-valid-phone-number",
        test: (value, context) => {
            var _a;
            if (!value)
                return false;
            const formattedPhoneNumber = circle_utils.formatPhoneAsE123(value || "", ((_a = context.parent.country) === null || _a === void 0 ? void 0 : _a.value) || "");
            return /\+(?:[0-9] ?){6,14}[0-9]$/.test(formattedPhoneNumber);
        },
        message: validationUtils.withPhoneErrorMessage,
    }),
    [STREET_FIELD]: yup.string()
        .label(FIELD_LABELS[STREET_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    [APARTMENT_FIELD]: yup.string()
        .label(FIELD_LABELS[APARTMENT_FIELD]),
    [ZIP_CODE_FIELD]: yup.string()
        .label(FIELD_LABELS[ZIP_CODE_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    [CITY_FIELD]: yup.string()
        .label(FIELD_LABELS[CITY_FIELD])
        .required(validationUtils.withRequiredErrorMessage),
    [STATE_FIELD]: yup.object().shape({
        value: yup.string()
            .label(FIELD_LABELS[STATE_FIELD])
            .required(validationUtils.withRequiredErrorMessage)
    }),
    [COUNTRY_FIELD]: yup.object().shape({
        value: yup.string()
            .label(FIELD_LABELS[COUNTRY_FIELD])
            .required(validationUtils.withRequiredErrorMessage)
    }),
}).required();
const BillingInfoForm = ({ 
// variant,
defaultValues, checkoutError, taxes, onTaxInfoChange, onSaved, onClose, onSubmit, onAttemptSubmit, debug }) => {
    const { control, handleSubmit, watch, setError, formState, } = reactHookForm.useForm({
        defaultValues: Object.assign(Object.assign({}, EMPTY_FORM_VALUES), defaultValues),
        reValidateMode: "onChange",
        resolver: yup$1.yupResolver(schema),
    });
    const [phone, street, zip, city, state, country] = watch([PHONE_FIELD, STREET_FIELD, ZIP_CODE_FIELD, CITY_FIELD, STATE_FIELD, COUNTRY_FIELD]);
    React.useEffect(() => {
        onTaxInfoChange({
            [STREET_FIELD]: street,
            [ZIP_CODE_FIELD]: zip,
            [CITY_FIELD]: city,
            [STATE_FIELD]: state,
            [COUNTRY_FIELD]: country,
        });
    }, [onTaxInfoChange, street, zip, city, state, country]);
    const taxesStatus = taxes.status;
    const selectedCountryCode = country === null || country === void 0 ? void 0 : country.value;
    const submitForm = handleSubmit(onSubmit);
    const checkoutErrorMessage = useFormCheckoutError.useFormCheckoutError({ formKey: "billing", checkoutError, fields: FIELD_NAMES, setError });
    const handleFormSubmit = React.useCallback((e) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        onAttemptSubmit();
        submitForm(e);
    }), [onAttemptSubmit, submitForm]);
    return (React__default["default"].createElement("form", { onSubmit: handleFormSubmit },
        onSaved && (React__default["default"].createElement(material.Box, { sx: { my: 2.5 } },
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onSaved, startIcon: React__default["default"].createElement(Book["default"], null) }, "Use Saved Billing Info"))),
        React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Information"),
        React__default["default"].createElement(TextField.ControlledTextField, { name: FULL_NAME_FIELD, control: control, label: FIELD_LABELS[FULL_NAME_FIELD] }),
        React__default["default"].createElement(TextField.ControlledTextField, { name: EMAIL_FIELD, control: control, label: FIELD_LABELS[EMAIL_FIELD] }),
        React__default["default"].createElement(TextField.ControlledTextField, { name: PHONE_FIELD, control: control, label: FIELD_LABELS[PHONE_FIELD], InputProps: selectedCountryCode && !circle_utils.phoneHasPrefix(phone) ? {
                startAdornment: (React__default["default"].createElement(material.InputAdornment, { position: "start" },
                    React__default["default"].createElement(material.Typography, { variant: "subtitle1", component: "span", sx: { pointerEvents: "none" } }, circle_utils.getPhonePrefix(`${selectedCountryCode}`)))),
            } : undefined }),
        debug && phone && (React__default["default"].createElement(DisplayBox.DebugBox, null,
            "Debug: ",
            circle_utils.formatPhoneAsE123(phone || "", `${selectedCountryCode}`))),
        React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Address"),
        React__default["default"].createElement(TextField.ControlledTextField, { name: STREET_FIELD, control: control, label: FIELD_LABELS[STREET_FIELD] }),
        React__default["default"].createElement(TextField.ControlledTextField, { name: APARTMENT_FIELD, control: control, label: FIELD_LABELS[APARTMENT_FIELD] }),
        React__default["default"].createElement(Grid["default"], { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6, zeroMinWidth: true },
                React__default["default"].createElement(TextField.ControlledTextField, { name: CITY_FIELD, control: control, label: FIELD_LABELS[CITY_FIELD] })),
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6 },
                React__default["default"].createElement(CountrySelector.ControlledCountrySelector, { name: COUNTRY_FIELD, control: control, label: FIELD_LABELS[COUNTRY_FIELD] }))),
        React__default["default"].createElement(Grid["default"], { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6, zeroMinWidth: true, sx: { maxWidth: "100%" } },
                React__default["default"].createElement(StateSelector.ControlledStateSelector, { name: STATE_FIELD, control: control, label: FIELD_LABELS[STATE_FIELD], countryCode: selectedCountryCode })),
            React__default["default"].createElement(Grid["default"], { item: true, sm: 6 },
                React__default["default"].createElement(TextField.ControlledTextField, { name: ZIP_CODE_FIELD, control: control, label: FIELD_LABELS[ZIP_CODE_FIELD] }))),
        checkoutErrorMessage && React__default["default"].createElement(FormErrorsBox.FormErrorsBox, { error: checkoutErrorMessage, sx: { mt: 5 } }),
        formState.isSubmitted && React__default["default"].createElement(TaxesMessagesBox.TaxesMessagesBox, { sx: { mt: 5 }, taxes: taxes, variant: "form" }),
        debug && (React__default["default"].createElement(DisplayBox.DebugBox, { sx: { mt: 5 } },
            JSON.stringify(watch(), null, 2),
            "\n\n",
            JSON.stringify(formState.errors, null, 2))),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toPayment", buttonLabel: taxesStatus === "loading" ? "Calculating taxes..." : undefined, submitDisabled: taxesStatus === "loading", onCloseClicked: onClose })));
};

exports.BillingInfoForm = BillingInfoForm;
//# sourceMappingURL=BillingInfoForm.js.map
