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
import { useFormCheckoutError } from '../hooks/useFormCheckoutError.js';
import { FormErrorsBox } from '../components/shared/FormErrorsBox/FormErrorsBox.js';
import Grid from '../../node_modules/@mui/material/Grid/Grid.js';

const FULL_NAME_FIELD = "fullName";
const EMAIL_FIELD = "email";
const PHONE_FIELD = "phone";
const STREET_FIELD = "street";
const APARTMENT_FIELD = "apartment";
const COUNTRY_FIELD = "country";
const CITY_FIELD = "city";
const STATE_FIELD = "state";
const ZIP_CODE_FIELD = "zipCode";
const FIELD_LABELS = {
    [FULL_NAME_FIELD]: "Full Name",
    [EMAIL_FIELD]: "Email",
    [PHONE_FIELD]: "Phone",
    [STREET_FIELD]: "Street",
    [APARTMENT_FIELD]: "Apartment, Suite, etc. (optional)",
    [COUNTRY_FIELD]: "Country",
    [CITY_FIELD]: "City",
    [STATE_FIELD]: "State",
    [ZIP_CODE_FIELD]: "Zip Code"
};
const FIELD_NAMES = Object.keys(FIELD_LABELS);
const EMPTY_FORM_VALUES = {
    [FULL_NAME_FIELD]: "",
    [EMAIL_FIELD]: "",
    [PHONE_FIELD]: "",
    [STREET_FIELD]: "",
    [APARTMENT_FIELD]: "",
    [COUNTRY_FIELD]: EMPTY_OPTION,
    [CITY_FIELD]: "",
    [STATE_FIELD]: EMPTY_OPTION,
    [ZIP_CODE_FIELD]: ""
};
// export type BillingInfoFormVariant = "guest" | "loggedIn";
const schema = object()
    .shape({
    [FULL_NAME_FIELD]: string()
        .label(FIELD_LABELS[FULL_NAME_FIELD])
        .required(withRequiredErrorMessage),
    [EMAIL_FIELD]: string()
        .label(FIELD_LABELS[EMAIL_FIELD])
        .email()
        .required(withRequiredErrorMessage),
    [PHONE_FIELD]: string()
        .label(FIELD_LABELS[PHONE_FIELD])
        .required(withRequiredErrorMessage),
    [STREET_FIELD]: string()
        .label(FIELD_LABELS[STREET_FIELD])
        .required(withRequiredErrorMessage),
    [APARTMENT_FIELD]: string().label(FIELD_LABELS[APARTMENT_FIELD]),
    [COUNTRY_FIELD]: object().shape({
        value: string()
            .label(FIELD_LABELS[COUNTRY_FIELD])
            .required(withRequiredErrorMessage)
    }),
    [CITY_FIELD]: string()
        .label(FIELD_LABELS[CITY_FIELD])
        .required(withRequiredErrorMessage),
    [STATE_FIELD]: object().shape({
        value: string()
            .label(FIELD_LABELS[STATE_FIELD])
            .required(withRequiredErrorMessage)
    }),
    [ZIP_CODE_FIELD]: string()
        .label(FIELD_LABELS[ZIP_CODE_FIELD])
        .required(withRequiredErrorMessage)
})
    .required();
const BillingInfoForm = ({ 
// variant,
defaultValues, checkoutError, onSaved, onClose, onSubmit, debug }) => {
    const { control, handleSubmit, watch, setError, formState, } = useForm({
        defaultValues: Object.assign(Object.assign({}, EMPTY_FORM_VALUES), defaultValues),
        reValidateMode: "onChange",
        resolver: o(schema),
    });
    const selectedCountryOption = watch(COUNTRY_FIELD);
    const selectedCountryCode = selectedCountryOption === null || selectedCountryOption === void 0 ? void 0 : selectedCountryOption.value;
    const submitForm = handleSubmit(onSubmit);
    const checkoutErrorMessage = useFormCheckoutError({ formKey: "billing", checkoutError, fields: FIELD_NAMES, setError });
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
        checkoutErrorMessage && React__default.createElement(FormErrorsBox, { error: checkoutErrorMessage, sx: { mt: 5 } }),
        debug && (React__default.createElement(DebugBox, { sx: { mt: 5 } },
            JSON.stringify(watch(), null, 2),
            "\n\n",
            JSON.stringify(formState.errors, null, 2))),
        React__default.createElement(CheckoutModalFooter, { variant: "toPayment", onCloseClicked: onClose })));
};

export { BillingInfoForm };
//# sourceMappingURL=BillingInfoForm.js.map
