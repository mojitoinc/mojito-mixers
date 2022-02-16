import { BillingInfo } from "../../forms/BillingInfoForm";
import { CircleError, CircleFieldError, RawSavedPaymentMethod, SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "./circle.interfaces";
import countryRegionData from "country-region-data/dist/data-umd";
import { customList } from "country-codes-list";
import { ApolloError } from "@apollo/client";

const countryPrefixes = customList('countryCode', '{countryCallingCode}') as Record<string, string>;

export function formatPhoneAsE123(phoneNumber: string, countryCode: string) {
  const countryPrefix = countryPrefixes[countryCode] || "";

  const parsedPhoneNumber = phoneNumber.replace(/[()-\s]/g, "");

  if (parsedPhoneNumber.startsWith("+") || parsedPhoneNumber.startsWith("00")) {
    // The user already included the country prefix, so we respect their preference:
    return parsedPhoneNumber.replace(/^00/, "+");
  }

  // Otherwise, we add it based on the country code:
  return `+${ countryPrefix }${ parsedPhoneNumber }`;
}

export function transformRawSavedPaymentMethods(rawSavedPaymentMethods: RawSavedPaymentMethod[] = []): SavedPaymentMethod[] {
  return rawSavedPaymentMethods.map(({ billingDetails, metadata, ...rest }) => {
    if (!billingDetails || !metadata) return null;

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
  }).filter(Boolean);
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
    return value
      // Duplicate, leading or trailing spaces don't make a value different:
      .replace(/\s+/g, ' ').trim()
      // Casing doesn't make a value different:
      .toUpperCase();
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

  expMonth: ["payment", "expiryDate", "Expiration Year"],
  expYear: ["payment", "expiryDate", "Expiration Year"],
};

export function parseCircleError(error: ApolloError | Error): CircleFieldErrors | undefined {
  const { message } = error;

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

      console.log(parsedCircleErrors);

      if (isCircleFieldErrorArray(parsedCircleErrors)) {
        parsedCircleErrors.forEach(({ location, message }) => {
          const [at, inputName, inputLabel] = CIRCLE_FIELD_TO_FORM_FIELD[location] || ["unknown", location, location];
          const searchRegExp = new RegExp(location, "g");

          circleFieldErrors[at][inputName] = message.replace(searchRegExp, inputLabel);
          circleFieldErrors.summary = circleFieldErrors.summary.replace(searchRegExp, inputLabel)
        });
      }

      if (circleFieldErrors.summary) {
        if (Object.keys(circleFieldErrors.billing).length === 0) delete circleFieldErrors.billing;
        if (Object.keys(circleFieldErrors.payment).length === 0) delete circleFieldErrors.payment;
        if (Object.keys(circleFieldErrors.unknown).length === 0) delete circleFieldErrors.unknown;

        if (!circleFieldErrors.billing && circleFieldErrors.payment) circleFieldErrors.firstAt = "payment";

        return circleFieldErrors;
      }

    } catch (e) { /* ignore */ }
  }
}
