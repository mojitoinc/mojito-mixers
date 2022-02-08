'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/esm/typeof');
var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var dataUmd = require('../../../node_modules/country-region-data/dist/data-umd.js');
var countryCodesList = require('country-codes-list');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

var countryPrefixes = countryCodesList.customList('countryCode', '{countryCallingCode}');
function formatPhoneAsE123(phoneNumber, countryCode) {
  var countryPrefix = countryPrefixes[countryCode] || "";
  var parsedPhoneNumber = phoneNumber.replace(/[()-\s]/g, "");

  if (parsedPhoneNumber.startsWith("+") || parsedPhoneNumber.startsWith("00")) {
    // The user already included the country prefix, so we respect their preference:
    return parsedPhoneNumber.replace(/^00/, "+");
  } // Otherwise, we add it based on the country code:


  return "+".concat(countryPrefix).concat(parsedPhoneNumber);
}
function transformRawSavedPaymentMethods(rawSavedPaymentMethods) {
  if (rawSavedPaymentMethods === void 0) {
    rawSavedPaymentMethods = [];
  }

  return rawSavedPaymentMethods.map(function (_a) {
    var billingDetails = _a.billingDetails,
        metadata = _a.metadata,
        rest = tslib_es6.__rest(_a, ["billingDetails", "metadata"]);

    if (!billingDetails || !metadata) return null; // Find country by short code:

    var _b = dataUmd["default"].find(function (_a) {
      var countryShortCode = _a.countryShortCode;
      return countryShortCode === billingDetails.country;
    }) || {},
        _c = _b.countryName,
        countryName = _c === void 0 ? "" : _c,
        _d = _b.countryShortCode,
        countryCode = _d === void 0 ? "" : _d,
        _e = _b.regions,
        regions = _e === void 0 ? [] : _e; // Find region by short code or name (some don't have short code):


    var _f = regions.find(function (_a) {
      var shortCode = _a.shortCode,
          name = _a.name;
      return shortCode === billingDetails.district || name === billingDetails.district;
    }) || {},
        regionName = _f.name,
        regionCode = _f.shortCode;

    var savedPaymentInfoBillingInfo = {
      metadata: {
        email: metadata.email,
        phoneNumber: formatPhoneAsE123(metadata.phoneNumber || "", countryCode)
      },
      billingDetails: {
        name: billingDetails.name || "",
        address1: billingDetails.address1 || "",
        address2: billingDetails.address2 || "",
        city: billingDetails.city || "",
        postalCode: billingDetails.postalCode || "",
        country: {
          label: countryName || "",
          value: countryName ? countryCode || countryName || "" : ""
        },
        district: {
          label: regionName || "",
          value: regionName ? regionCode || regionName || "" : ""
        }
      }
    };

    var savedPaymentMethod = tslib_es6.__assign(tslib_es6.__assign(tslib_es6.__assign({}, rest), savedPaymentInfoBillingInfo), {
      addressId: getSavedPaymentMethodAddressId(savedPaymentInfoBillingInfo)
    });

    return savedPaymentMethod;
  }).filter(Boolean);
}
function getSavedPaymentMethodAddressId(_a) {
  var billingDetails = _a.billingDetails,
      metadata = _a.metadata;
  return [billingDetails.name, billingDetails.address1, billingDetails.address2, billingDetails.city, "".concat(billingDetails.district.label), billingDetails.postalCode, "".concat(billingDetails.country.value), metadata.email, formatPhoneAsE123(metadata.phoneNumber, "".concat(billingDetails.country.value))].map(function (value) {
    if (value === void 0) {
      value = "";
    }

    return value // Duplicate, leading or trailing spaces don't make a value different:
    .replace(/\s+/g, ' ').trim() // Casing doesn't make a value different:
    .toUpperCase();
  }).join("|");
} // TODO: Change interface of the form to closely resemble this one:

function billingInfoToSavedPaymentMethodBillingInfo(billingInfo) {
  return {
    billingDetails: {
      name: billingInfo.fullName,
      address1: billingInfo.street,
      address2: billingInfo.apartment,
      city: billingInfo.city,
      district: billingInfo.state,
      postalCode: billingInfo.zipCode,
      country: billingInfo.country
    },
    metadata: {
      email: billingInfo.email,
      phoneNumber: formatPhoneAsE123(billingInfo.phone, "".concat(billingInfo.country.value))
    }
  };
}
function getSavedPaymentMethodAddressIdFromBillingInfo(billingInfo) {
  return getSavedPaymentMethodAddressId(billingInfoToSavedPaymentMethodBillingInfo(billingInfo));
}
function savedPaymentMethodToBillingInfo(savedPaymentMethod) {
  var billingDetails = savedPaymentMethod.billingDetails,
      metadata = savedPaymentMethod.metadata;
  return {
    fullName: billingDetails.name,
    email: metadata.email,
    phone: metadata.phoneNumber,
    street: billingDetails.address1,
    apartment: billingDetails.address2,
    country: billingDetails.country,
    city: billingDetails.city,
    state: billingDetails.district,
    zipCode: billingDetails.postalCode
  };
}
function isCircleFieldError(obj) {
  return obj && _typeof__default["default"](obj) === "object" && obj.hasOwnProperty("error") && obj.hasOwnProperty("invalidValue") && obj.hasOwnProperty("location") && obj.hasOwnProperty("message");
}
function isCircleFieldErrorArray(obj) {
  return Array.isArray(obj) && obj.every(isCircleFieldError);
}
function parseCircleError(error) {
  var message = error.message;

  if (message.includes("with body: ")) {
    try {
      var parsedCircleError = JSON.parse(String.raw(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["", ""], ["", ""])), message).replace(/^.+with body: /, ''));
      var parsedCircleErrors = parsedCircleError.errors;

      if (isCircleFieldErrorArray(parsedCircleErrors)) {
        return parsedCircleErrors.reduce(function (errors, circleFieldError) {
          // TODO: Match Circle errors to form field errors:
          errors[circleFieldError.location] = circleFieldError.message;
          return errors;
        }, {
          form: parsedCircleError.message
        });
      }

      return parsedCircleError.message || "";
    } catch (e) {
      /* ignore */
    }
  }

  return "";
}
var templateObject_1;

exports.billingInfoToSavedPaymentMethodBillingInfo = billingInfoToSavedPaymentMethodBillingInfo;
exports.formatPhoneAsE123 = formatPhoneAsE123;
exports.getSavedPaymentMethodAddressId = getSavedPaymentMethodAddressId;
exports.getSavedPaymentMethodAddressIdFromBillingInfo = getSavedPaymentMethodAddressIdFromBillingInfo;
exports.isCircleFieldError = isCircleFieldError;
exports.isCircleFieldErrorArray = isCircleFieldErrorArray;
exports.parseCircleError = parseCircleError;
exports.savedPaymentMethodToBillingInfo = savedPaymentMethodToBillingInfo;
exports.transformRawSavedPaymentMethods = transformRawSavedPaymentMethods;
//# sourceMappingURL=circle.utils.js.map
