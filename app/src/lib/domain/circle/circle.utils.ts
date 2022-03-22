import { BillingInfo } from "../../forms/BillingInfoForm";
import { CircleError, CircleFieldError, RawSavedPaymentMethod, SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "./circle.interfaces";
import countryRegionData from "country-region-data/dist/data-umd";
import { customList } from "country-codes-list";
import { ApolloError } from "@apollo/client";
import { formatSentence, fullTrim } from "../../utils/formatUtils";
import { BUILT_IN_ERRORS } from "../errors/errors.constants";

const countryPrefixes = customList('countryCode', '{countryCallingCode}');

export function getPhonePrefix(countryCode: string, withPlus = true) {
  const prefix = countryPrefixes[countryCode];

  return prefix ? `${ withPlus ? "+" : "" }${ prefix }` : "";
}

export function phoneHasPrefix(phone: string) {
  return phone.startsWith("+") || phone.startsWith("00")
}

export function formatPhoneAsE123(phoneNumber: string, countryCode: string) {
  const parsedPhoneNumber = phoneNumber.replace(/[()-\s]/g, "");

  if (phoneHasPrefix(parsedPhoneNumber)) {
    // The user already included the country prefix, so we respect their preference:
    return parsedPhoneNumber.replace(/^00/, "+");
  }

  // Otherwise, we add it based on the country code:
  return `${ getPhonePrefix(countryCode) }${ parsedPhoneNumber }`;
}

export function transformRawSavedPaymentMethods(rawSavedPaymentMethods: RawSavedPaymentMethod[] = []): SavedPaymentMethod[] {
  return rawSavedPaymentMethods.map(({ billingDetails, metadata, ...rest }) => {
    if (!billingDetails || !metadata || !billingDetails.name || !billingDetails.address1) return null;

    // Find country by short code:
    const {
      countryName = "",
      countryShortCode: countryCode = "",
      regions = [],
    } = countryRegionData.find(({ countryShortCode }) => countryShortCode === billingDetails.country) || {};

    // Find region by short code or name (some don't have short code):
    const {
      name: regionName,
      shortCode: regionCode,
    } = regions.find(({ shortCode, name }) => shortCode === billingDetails.district || name === billingDetails.district) || {};

    const savedPaymentInfoBillingInfo: SavedPaymentMethodBillingInfo = {

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

    const savedPaymentMethod: SavedPaymentMethod = {
      ...rest,
      ...savedPaymentInfoBillingInfo,
      addressId: getSavedPaymentMethodAddressId(savedPaymentInfoBillingInfo),
    };

    return savedPaymentMethod;
  }).filter(Boolean) as SavedPaymentMethod[];
}

export function getSavedPaymentMethodAddressId({ billingDetails, metadata }: SavedPaymentMethodBillingInfo): string {
  return [
    billingDetails.name,
    billingDetails.address1,
    billingDetails.address2,
    billingDetails.city,
    `${ billingDetails.district.label }`,
    billingDetails.postalCode,
    `${ billingDetails.country.value }`,
    metadata.email,
    formatPhoneAsE123(metadata.phoneNumber, `${ billingDetails.country.value }`),
  ].map((value = "") => {
    // - Duplicate, leading or trailing spaces don't make a value different.
    // - Casing doesn't make a value different.
    return fullTrim(value).toUpperCase();
  }).join("|");
}

// TODO: Change interface of the form to closely resemble this one:

export function billingInfoToSavedPaymentMethodBillingInfo(billingInfo: BillingInfo): SavedPaymentMethodBillingInfo {
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
      phoneNumber: formatPhoneAsE123(billingInfo.phone, `${ billingInfo.country.value }`),
    },
  };
}

export function getSavedPaymentMethodAddressIdFromBillingInfo(billingInfo: BillingInfo): string {
  return getSavedPaymentMethodAddressId(billingInfoToSavedPaymentMethodBillingInfo(billingInfo));
}

export function savedPaymentMethodToBillingInfo(savedPaymentMethod: SavedPaymentMethod): BillingInfo {
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

export function isCircleFieldError(obj: any): obj is CircleFieldError {
  return obj &&
    typeof obj === "object" &&
    obj.hasOwnProperty("error") &&
    obj.hasOwnProperty("invalidValue") &&
    obj.hasOwnProperty("location") &&
    obj.hasOwnProperty("message");
}

export function isCircleFieldErrorArray(obj: any): obj is CircleFieldError[] {
  return Array.isArray(obj) && obj.every(isCircleFieldError);
}

export type CircleFieldErrorAt = "billing" | "payment";

export interface CircleFieldErrors {
  summary: string;
  billing?: Record<string, string>;
  payment?: Record<string, string>;
  unknown?: Record<string, string>;
  firstAt: CircleFieldErrorAt;
}

const CIRCLE_FIELD_TO_FORM_FIELD: Record<string, [CircleFieldErrorAt, string, string]> = {
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

export function parseCircleError(error: ApolloError | Error): CircleFieldErrors | undefined {
  const { name, message } = error;

  // If there's any code error like "TypeError: Cannot read properties of undefined", we don't want to show that to
  // users, so we just return undefined here to fall back to the default `ERROR_PURCHASE_CREATING_PAYMENT_METHOD` error.
  if (BUILT_IN_ERRORS.includes(name) || !message) return undefined;

  if (message.includes("with body: ")) {
    try {
      const parsedCircleError: CircleError = JSON.parse(String.raw`${ message }`.replace(/^.+with body: /, ''));
      const parsedCircleErrors = parsedCircleError.errors;
      const circleFieldErrors: CircleFieldErrors = {
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
          const sectionFieldErrors = circleFieldErrors[at];

          if (!sectionFieldErrors) return;

          sectionFieldErrors[inputName] = [
            sectionFieldErrors[inputName],
            formatSentence(message.replace(searchRegExp, inputLabel).replace(" (was )", "")),
          ].filter(Boolean).join(" / ");

          circleFieldErrors.summary = circleFieldErrors.summary.replace(searchRegExp, inputLabel).replace(" (was )", "");
        });
      }

      if (circleFieldErrors.summary) {
        if (circleFieldErrors.billing && Object.keys(circleFieldErrors.billing).length === 0) delete circleFieldErrors.billing;
        if (circleFieldErrors.payment && Object.keys(circleFieldErrors.payment).length === 0) delete circleFieldErrors.payment;
        if (circleFieldErrors.unknown && Object.keys(circleFieldErrors.unknown).length === 0) delete circleFieldErrors.unknown;

        if (!circleFieldErrors.billing && circleFieldErrors.payment) circleFieldErrors.firstAt = "payment";

        return circleFieldErrors;
      }
    } catch (e) { /* ignore */ }
  }

  return {
    summary: message,
    firstAt: "billing",
  };
}
