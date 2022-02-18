import { __rest } from '../../../node_modules/tslib/tslib.es6.js';
import countryRegionData from '../../../node_modules/country-region-data/dist/data-umd.js';
import { customList } from 'country-codes-list';
import { formatSentence } from '../../utils/formatUtils.js';
import { BUILT_IN_ERRORS } from '../errors/errors.constants.js';

const countryPrefixes = customList('countryCode', '{countryCallingCode}');
function formatPhoneAsE123(phoneNumber, countryCode) {
    const countryPrefix = countryPrefixes[countryCode] || "";
    const parsedPhoneNumber = phoneNumber.replace(/[()-\s]/g, "");
    if (parsedPhoneNumber.startsWith("+") || parsedPhoneNumber.startsWith("00")) {
        // The user already included the country prefix, so we respect their preference:
        return parsedPhoneNumber.replace(/^00/, "+");
    }
    // Otherwise, we add it based on the country code:
    return `+${countryPrefix}${parsedPhoneNumber}`;
}
function transformRawSavedPaymentMethods(rawSavedPaymentMethods = []) {
    return rawSavedPaymentMethods.map((_a) => {
        var { billingDetails, metadata } = _a, rest = __rest(_a, ["billingDetails", "metadata"]);
        if (!billingDetails || !metadata)
            return null;
        // Find country by short code:
        const { countryName = "", countryShortCode: countryCode = "", regions = [], } = countryRegionData.find(({ countryShortCode }) => countryShortCode === billingDetails.country) || {};
        // Find region by short code or name (some don't have short code):
        const { name: regionName, shortCode: regionCode, } = regions.find(({ shortCode, name }) => shortCode === billingDetails.district || name === billingDetails.district) || {};
        const savedPaymentInfoBillingInfo = {
            metadata: {
                email: metadata.email,
                phoneNumber: formatPhoneAsE123(metadata.phoneNumber || "", countryCode),
            },
            billingDetails: {
                name: billingDetails.name || "",
                address1: billingDetails.address1 || "",
                address2: billingDetails.address2 || "",
                city: billingDetails.city || "",
                postalCode: billingDetails.postalCode || "",
                country: {
                    label: countryName || "",
                    value: countryName ? (countryCode || countryName || "") : "",
                },
                district: {
                    label: regionName || "",
                    value: regionName ? (regionCode || regionName || "") : "",
                },
            },
        };
        const savedPaymentMethod = Object.assign(Object.assign(Object.assign({}, rest), savedPaymentInfoBillingInfo), { addressId: getSavedPaymentMethodAddressId(savedPaymentInfoBillingInfo) });
        return savedPaymentMethod;
    }).filter(Boolean);
}
function getSavedPaymentMethodAddressId({ billingDetails, metadata }) {
    return [
        billingDetails.name,
        billingDetails.address1,
        billingDetails.address2,
        billingDetails.city,
        `${billingDetails.district.label}`,
        billingDetails.postalCode,
        `${billingDetails.country.value}`,
        metadata.email,
        formatPhoneAsE123(metadata.phoneNumber, `${billingDetails.country.value}`),
    ].map((value = "") => {
        return value
            // Duplicate, leading or trailing spaces don't make a value different:
            .replace(/\s+/g, ' ').trim()
            // Casing doesn't make a value different:
            .toUpperCase();
    }).join("|");
}
// TODO: Change interface of the form to closely resemble this one:
function billingInfoToSavedPaymentMethodBillingInfo(billingInfo) {
    return {
        billingDetails: {
            name: billingInfo.fullName,
            address1: billingInfo.street,
            address2: billingInfo.apartment,
            city: billingInfo.city,
            district: billingInfo.state,
            postalCode: billingInfo.zipCode,
            country: billingInfo.country,
        },
        metadata: {
            email: billingInfo.email,
            phoneNumber: formatPhoneAsE123(billingInfo.phone, `${billingInfo.country.value}`),
        },
    };
}
function getSavedPaymentMethodAddressIdFromBillingInfo(billingInfo) {
    return getSavedPaymentMethodAddressId(billingInfoToSavedPaymentMethodBillingInfo(billingInfo));
}
function savedPaymentMethodToBillingInfo(savedPaymentMethod) {
    const { billingDetails, metadata } = savedPaymentMethod;
    return {
        fullName: billingDetails.name,
        email: metadata.email,
        phone: metadata.phoneNumber,
        street: billingDetails.address1,
        apartment: billingDetails.address2,
        country: billingDetails.country,
        city: billingDetails.city,
        state: billingDetails.district,
        zipCode: billingDetails.postalCode,
    };
}
function isCircleFieldError(obj) {
    return obj &&
        typeof obj === "object" &&
        obj.hasOwnProperty("error") &&
        obj.hasOwnProperty("invalidValue") &&
        obj.hasOwnProperty("location") &&
        obj.hasOwnProperty("message");
}
function isCircleFieldErrorArray(obj) {
    return Array.isArray(obj) && obj.every(isCircleFieldError);
}
const CIRCLE_FIELD_TO_FORM_FIELD = {
    "billingAddress.name": ["billing", "fullName", "Full Name"],
    "billingAddress.city": ["billing", "city", "City"],
    "billingAddress.country": ["billing", "country", "Country"],
    "billingAddress.address1": ["billing", "street", "Street"],
    "billingAddress.address2": ["billing", "apartment", "Apartment, Suite, etc."],
    "billingAddress.district": ["billing", "state", "State"],
    "billingAddress.postalCode": ["billing", "zipCode", "Zip Code"],
    "metadata.email": ["billing", "email", "Email"],
    "metadata.phoneNumber": ["billing", "phone", "Phone"],
    expMonth: ["payment", "expiryDate", "Expiration Date's month"],
    expYear: ["payment", "expiryDate", "Expiration Date's year"],
};
function parseCircleError(error) {
    const { name, message } = error;
    // If there's any code error like "TypeError: Cannot read properties of undefined", we don't want to show that to
    // users, so we just return undefined here to fall back to the default `ERROR_PURCHASE_CREATING_PAYMENT_METHOD` error.
    if (BUILT_IN_ERRORS.includes(name) || !message)
        return undefined;
    if (message.includes("with body: ")) {
        try {
            const parsedCircleError = JSON.parse(String.raw `${message}`.replace(/^.+with body: /, ''));
            const parsedCircleErrors = parsedCircleError.errors;
            const circleFieldErrors = {
                summary: parsedCircleError.message.replace("Invalid entity.\n", ""),
                billing: {},
                payment: {},
                unknown: {},
                firstAt: "billing",
            };
            if (isCircleFieldErrorArray(parsedCircleErrors)) {
                parsedCircleErrors.forEach(({ location, message }) => {
                    const [at, inputName, inputLabel] = CIRCLE_FIELD_TO_FORM_FIELD[location] || ["unknown", location, location];
                    const searchRegExp = new RegExp(location, "g");
                    circleFieldErrors[at][inputName] = [
                        circleFieldErrors[at][inputName],
                        formatSentence(message.replace(searchRegExp, inputLabel).replace(" (was )", "")),
                    ].filter(Boolean).join(" / ");
                    circleFieldErrors.summary = circleFieldErrors.summary.replace(searchRegExp, inputLabel).replace(" (was )", "");
                });
            }
            if (circleFieldErrors.summary) {
                if (Object.keys(circleFieldErrors.billing).length === 0)
                    delete circleFieldErrors.billing;
                if (Object.keys(circleFieldErrors.payment).length === 0)
                    delete circleFieldErrors.payment;
                if (Object.keys(circleFieldErrors.unknown).length === 0)
                    delete circleFieldErrors.unknown;
                if (!circleFieldErrors.billing && circleFieldErrors.payment)
                    circleFieldErrors.firstAt = "payment";
                return circleFieldErrors;
            }
        }
        catch (e) { /* ignore */ }
    }
    return {
        summary: message,
        firstAt: "billing",
    };
}

export { billingInfoToSavedPaymentMethodBillingInfo, formatPhoneAsE123, getSavedPaymentMethodAddressId, getSavedPaymentMethodAddressIdFromBillingInfo, isCircleFieldError, isCircleFieldErrorArray, parseCircleError, savedPaymentMethodToBillingInfo, transformRawSavedPaymentMethods };
//# sourceMappingURL=circle.utils.js.map
