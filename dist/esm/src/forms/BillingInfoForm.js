import { __awaiter } from '../../node_modules/tslib/tslib.es6.js';
import { useForm } from 'react-hook-form';
import { yupResolver as o } from '../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js';
import { object, string } from 'yup';
import React__default, { useEffect, useCallback } from 'react';
import { ControlledCountrySelector } from '../components/shared/Select/CountrySelector/CountrySelector.js';
import { ControlledStateSelector } from '../components/shared/Select/StateSelector/StateSelector.js';
import { CheckoutModalFooter } from '../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { InputGroupLabel } from '../components/shared/InputGroupLabel/InputGroupLabel.js';
import { ControlledTextField } from '../components/shared/TextField/TextField.js';
import { SecondaryButton } from '../components/shared/SecondaryButton/SecondaryButton.js';
import { Box, InputAdornment, Typography } from '@mui/material';
import default_1 from '../../node_modules/@mui/icons-material/Book.js';
import { EMPTY_OPTION } from '../components/shared/Select/Select.js';
import { withRequiredErrorMessage, withFullNameErrorMessage, withPhoneErrorMessage } from '../utils/validationUtils.js';
import { DebugBox } from '../components/payments/DebugBox/DebugBox.js';
import { useFormCheckoutError } from '../hooks/useFormCheckoutError.js';
import { TaxesMessagesBox } from '../components/shared/TaxesMessagesBox/TaxesMessagesBox.js';
import { FormErrorsBox } from '../components/shared/FormErrorsBox/FormErrorsBox.js';
import { formatPhoneAsE123, phoneHasPrefix, getPhonePrefix } from '../domain/circle/circle.utils.js';
import Grid from '../../node_modules/@mui/material/Grid/Grid.js';

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
    [STATE_FIELD]: EMPTY_OPTION,
    [COUNTRY_FIELD]: EMPTY_OPTION,
};
// export type BillingInfoFormVariant = "guest" | "loggedIn";
const schema = object()
    .shape({
    [FULL_NAME_FIELD]: string()
        .label(FIELD_LABELS[FULL_NAME_FIELD])
        .required(withRequiredErrorMessage)
        .test({
        name: "is-valid-full-name",
        test: (value) => {
            if (!value)
                return false;
            return /(. .)/.test(value);
        },
        message: withFullNameErrorMessage,
    }),
    [EMAIL_FIELD]: string()
        .label(FIELD_LABELS[EMAIL_FIELD])
        .required(withRequiredErrorMessage)
        .email(),
    [PHONE_FIELD]: string()
        .label(FIELD_LABELS[PHONE_FIELD])
        .required(withRequiredErrorMessage)
        .test({
        name: "is-valid-phone-number",
        test: (value, context) => {
            var _a;
            if (!value)
                return false;
            const formattedPhoneNumber = formatPhoneAsE123(value || "", ((_a = context.parent.country) === null || _a === void 0 ? void 0 : _a.value) || "");
            return /\+(?:[0-9] ?){6,14}[0-9]$/.test(formattedPhoneNumber);
        },
        message: withPhoneErrorMessage,
    }),
    [STREET_FIELD]: string()
        .label(FIELD_LABELS[STREET_FIELD])
        .required(withRequiredErrorMessage),
    [APARTMENT_FIELD]: string()
        .label(FIELD_LABELS[APARTMENT_FIELD]),
    [ZIP_CODE_FIELD]: string()
        .label(FIELD_LABELS[ZIP_CODE_FIELD])
        .required(withRequiredErrorMessage),
    [CITY_FIELD]: string()
        .label(FIELD_LABELS[CITY_FIELD])
        .required(withRequiredErrorMessage),
    [STATE_FIELD]: object().shape({
        value: string()
            .label(FIELD_LABELS[STATE_FIELD])
            .required(withRequiredErrorMessage)
    }),
    [COUNTRY_FIELD]: object().shape({
        value: string()
            .label(FIELD_LABELS[COUNTRY_FIELD])
            .required(withRequiredErrorMessage)
    }),
}).required();
const BillingInfoForm = ({ 
// variant,
defaultValues, checkoutError, taxes, onTaxInfoChange, onSaved, onClose, onSubmit, onAttemptSubmit, debug }) => {
    const { control, handleSubmit, watch, setError, formState, } = useForm({
        defaultValues: Object.assign(Object.assign({}, EMPTY_FORM_VALUES), defaultValues),
        reValidateMode: "onChange",
        resolver: o(schema),
    });
    const [phone, street, zip, city, state, country] = watch([PHONE_FIELD, STREET_FIELD, ZIP_CODE_FIELD, CITY_FIELD, STATE_FIELD, COUNTRY_FIELD]);
    useEffect(() => {
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
    const checkoutErrorMessage = useFormCheckoutError({ formKey: "billing", checkoutError, fields: FIELD_NAMES, setError });
    const handleFormSubmit = useCallback((e) => __awaiter(void 0, void 0, void 0, function* () {
        onAttemptSubmit();
        submitForm(e);
    }), [onAttemptSubmit, submitForm]);
    return (React__default.createElement("form", { onSubmit: handleFormSubmit },
        onSaved && (React__default.createElement(Box, { sx: { my: 2.5 } },
            React__default.createElement(SecondaryButton, { onClick: onSaved, startIcon: React__default.createElement(default_1, null) }, "Use Saved Billing Info"))),
        React__default.createElement(InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Information"),
        React__default.createElement(ControlledTextField, { name: FULL_NAME_FIELD, control: control, label: FIELD_LABELS[FULL_NAME_FIELD] }),
        React__default.createElement(ControlledTextField, { name: EMAIL_FIELD, control: control, label: FIELD_LABELS[EMAIL_FIELD] }),
        React__default.createElement(ControlledTextField, { name: PHONE_FIELD, control: control, label: FIELD_LABELS[PHONE_FIELD], InputProps: selectedCountryCode && !phoneHasPrefix(phone) ? {
                startAdornment: (React__default.createElement(InputAdornment, { position: "start" },
                    React__default.createElement(Typography, { variant: "subtitle1", component: "span", sx: { pointerEvents: "none" } }, getPhonePrefix(`${selectedCountryCode}`)))),
            } : undefined }),
        debug && phone && (React__default.createElement(DebugBox, { compact: true, sx: { mt: 1 } }, formatPhoneAsE123(phone || "", `${selectedCountryCode}`))),
        React__default.createElement(InputGroupLabel, { sx: { m: 0, pt: 2 } }, "Address"),
        React__default.createElement(ControlledTextField, { name: STREET_FIELD, control: control, label: FIELD_LABELS[STREET_FIELD] }),
        React__default.createElement(ControlledTextField, { name: APARTMENT_FIELD, control: control, label: FIELD_LABELS[APARTMENT_FIELD] }),
        React__default.createElement(Grid, { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default.createElement(Grid, { item: true, sm: 6, zeroMinWidth: true },
                React__default.createElement(ControlledTextField, { name: CITY_FIELD, control: control, label: FIELD_LABELS[CITY_FIELD] })),
            React__default.createElement(Grid, { item: true, sm: 6 },
                React__default.createElement(ControlledCountrySelector, { name: COUNTRY_FIELD, control: control, label: FIELD_LABELS[COUNTRY_FIELD] }))),
        React__default.createElement(Grid, { container: true, columnSpacing: 2, direction: {
                xs: "column",
                sm: "row"
            } },
            React__default.createElement(Grid, { item: true, sm: 6, zeroMinWidth: true, sx: { maxWidth: "100%" } },
                React__default.createElement(ControlledStateSelector, { name: STATE_FIELD, control: control, label: FIELD_LABELS[STATE_FIELD], countryCode: selectedCountryCode })),
            React__default.createElement(Grid, { item: true, sm: 6 },
                React__default.createElement(ControlledTextField, { name: ZIP_CODE_FIELD, control: control, label: FIELD_LABELS[ZIP_CODE_FIELD] }))),
        checkoutErrorMessage && React__default.createElement(FormErrorsBox, { error: checkoutErrorMessage, sx: { mt: 5 } }),
        formState.isSubmitted && React__default.createElement(TaxesMessagesBox, { sx: { mt: 5 }, taxes: taxes, variant: "form" }),
        debug && (React__default.createElement(DebugBox, { sx: { mt: 5 } },
            JSON.stringify(watch(), null, 2),
            "\n\n",
            JSON.stringify(formState.errors, null, 2))),
        React__default.createElement(CheckoutModalFooter, { variant: "toPayment", buttonLabel: taxesStatus === "loading" ? "Calculating taxes..." : undefined, submitDisabled: taxesStatus === "loading", onCloseClicked: onClose })));
};

export { BillingInfoForm };
//# sourceMappingURL=BillingInfoForm.js.map
