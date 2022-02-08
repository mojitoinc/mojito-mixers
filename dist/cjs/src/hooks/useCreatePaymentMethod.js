'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var openpgp = require('openpgp');
var atob = require('atob');
var btoa = require('btoa');
var circle_utils = require('../domain/circle/circle.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var atob__default = /*#__PURE__*/_interopDefaultLegacy(atob);
var btoa__default = /*#__PURE__*/_interopDefaultLegacy(btoa);

function encryptCard(key, cardNumber, cvv) {
  return tslib_es6.__awaiter(this, void 0, void 0, function () {
    var dataToEncrypt, decodedPublicKey, _a, encryptionKeys, message, ciphertext;

    return tslib_es6.__generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          dataToEncrypt = {
            number: cardNumber,
            cvv: cvv
          };
          decodedPublicKey = atob__default["default"](key);
          return [4
          /*yield*/
          , Promise.allSettled([openpgp.readKeys({
            armoredKeys: decodedPublicKey
          }), openpgp.createMessage({
            text: JSON.stringify(dataToEncrypt)
          })]).then(function (allSettledResults) {
            return allSettledResults.map(function (allSettledResult) {
              return allSettledResult.status === "fulfilled" ? allSettledResult.value : null;
            });
          })];

        case 1:
          _a = _b.sent(), encryptionKeys = _a[0], message = _a[1];
          return [4
          /*yield*/
          , openpgp.encrypt({
            message: message,
            encryptionKeys: encryptionKeys
          })];

        case 2:
          ciphertext = _b.sent();
          return [2
          /*return*/
          , btoa__default["default"](ciphertext)];
      }
    });
  });
}

function useCreatePaymentMethod() {
  var _this = this; // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.


  var fetchPaymentKey = graphqlGenerated.usePaymentKeyLazyQuery()[0];

  var _a = graphqlGenerated.useCreatePaymentMethodMutation(),
      createPaymentMethod = _a[0],
      createPaymentMethodResult = _a[1];

  var extendedCreatePaymentMethod = React.useCallback(function (orgID, billingInfo, paymentInfo) {
    return tslib_es6.__awaiter(_this, void 0, void 0, function () {
      var metadata, billingDetails, paymentKeyResult, paymentKeyData, publicKey, keyID, encryptedCardData, _a, expirationMonth, expirationYearLastTwoDigits, expirationYear;

      var _b, _c;

      return tslib_es6.__generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!orgID) throw new Error("Missing `orgID`");
            metadata = {
              email: billingInfo.email,
              phoneNumber: circle_utils.formatPhoneAsE123(billingInfo.phone, "".concat(billingInfo.country.value))
            };
            billingDetails = {
              name: billingInfo.fullName,
              city: billingInfo.city,
              country: "".concat(billingInfo.country.value),
              address1: billingInfo.street || "",
              address2: billingInfo.apartment || "",
              district: "".concat(billingInfo.state.value || billingInfo.state.label),
              postalCode: billingInfo.zipCode
            };
            if (!(paymentInfo.type === graphqlGenerated.PaymentType.CreditCard)) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , fetchPaymentKey()["catch"](function (err) {
              return undefined;
            })];

          case 1:
            paymentKeyResult = _d.sent();
            paymentKeyData = paymentKeyResult === null || paymentKeyResult === void 0 ? void 0 : paymentKeyResult.data;
            publicKey = (_b = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _b === void 0 ? void 0 : _b.publicKey;
            keyID = (_c = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _c === void 0 ? void 0 : _c.keyID;
            if (!publicKey || !keyID) throw new Error("Missing `publicKey` or `keyID`");
            return [4
            /*yield*/
            , encryptCard(publicKey, paymentInfo.cardNumber.replace(/\s/g, ""), paymentInfo.secureCode)];

          case 2:
            encryptedCardData = _d.sent();
            _a = paymentInfo.expiryDate.split("/").map(function (value) {
              return parseInt(value.trim(), 10);
            }), expirationMonth = _a[0], expirationYearLastTwoDigits = _a[1];
            expirationYear = 2000 + expirationYearLastTwoDigits;
            return [2
            /*return*/
            , createPaymentMethod({
              variables: {
                orgID: orgID,
                input: {
                  paymentType: graphqlGenerated.PaymentType.CreditCard,
                  creditCardData: {
                    keyID: keyID,
                    encryptedData: encryptedCardData,
                    expirationMonth: expirationMonth,
                    expirationYear: expirationYear,
                    metadata: metadata,
                    billingDetails: billingDetails
                  }
                }
              }
            })];

          case 3:
            if (paymentInfo.type === graphqlGenerated.PaymentType.Ach) {
              return [2
              /*return*/
              , createPaymentMethod({
                variables: {
                  orgID: orgID,
                  input: {
                    paymentType: graphqlGenerated.PaymentType.Ach,
                    achData: {
                      // TODO: Add account name?
                      accountId: paymentInfo.accountId,
                      publicToken: paymentInfo.publicToken,
                      metadata: metadata,
                      billingDetails: billingDetails
                    }
                  }
                }
              })];
            }

            throw new Error("Unsupported payment method.");
        }
      });
    });
  }, [fetchPaymentKey, createPaymentMethod]);
  return [extendedCreatePaymentMethod, createPaymentMethodResult];
}

exports.useCreatePaymentMethod = useCreatePaymentMethod;
//# sourceMappingURL=useCreatePaymentMethod.js.map
