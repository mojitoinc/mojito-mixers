import { __rest } from '../../../node_modules/tslib/tslib.es6.js';
import countryRegionData from '../../../node_modules/country-region-data/dist/data-umd.js';
import { customList } from 'country-codes-list';

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
function parseCircleError(error) {
    const { message } = error;
    if (message.includes("with body: ")) {
        try {
            const parsedCircleError = JSON.parse(String.raw `${message}`.replace(/^.+with body: /, ''));
            const parsedCircleErrors = parsedCircleError.errors;
            if (isCircleFieldErrorArray(parsedCircleErrors)) {
                return parsedCircleErrors.reduce((errors, circleFieldError) => {
                    // TODO: Match Circle errors to form field errors:
                    errors[circleFieldError.location] = circleFieldError.message;
                    return errors;
                }, { form: parsedCircleError.message });
            }
            return parsedCircleError.message || "";
        }
        catch (e) { /* ignore */ }
    }
    return "";
}

export { billingInfoToSavedPaymentMethodBillingInfo, formatPhoneAsE123, getSavedPaymentMethodAddressId, getSavedPaymentMethodAddressIdFromBillingInfo, isCircleFieldError, isCircleFieldErrorArray, parseCircleError, savedPaymentMethodToBillingInfo, transformRawSavedPaymentMethods };
//# sourceMappingURL=circle.utils.js.map
