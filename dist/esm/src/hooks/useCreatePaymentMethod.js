import { __awaiter, __generator } from '../../node_modules/tslib/tslib.es6.js';
import { useCallback } from 'react';
import { usePaymentKeyLazyQuery, useCreatePaymentMethodMutation, PaymentType } from '../queries/graphqlGenerated.js';
import { encrypt, readKeys, createMessage } from 'openpgp';
import atob from 'atob';
import btoa from 'btoa';
import { formatPhoneAsE123 } from '../domain/circle/circle.utils.js';

function encryptCard(key, cardNumber, cvv) {
  return __awaiter(this, void 0, void 0, function () {
    var dataToEncrypt, decodedPublicKey, _a, encryptionKeys, message, ciphertext;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          dataToEncrypt = {
            number: cardNumber,
            cvv: cvv
          };
          decodedPublicKey = atob(key);
          return [4
          /*yield*/
          , Promise.allSettled([readKeys({
            armoredKeys: decodedPublicKey
          }), createMessage({
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
          , encrypt({
            message: message,
            encryptionKeys: encryptionKeys
          })];

        case 2:
          ciphertext = _b.sent();
          return [2
          /*return*/
          , btoa(ciphertext)];
      }
    });
  });
}

function useCreatePaymentMethod() {
  var _this = this; // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.


  var fetchPaymentKey = usePaymentKeyLazyQuery()[0];

  var _a = useCreatePaymentMethodMutation(),
      createPaymentMethod = _a[0],
      createPaymentMethodResult = _a[1];

  var extendedCreatePaymentMethod = useCallback(function (orgID, billingInfo, paymentInfo) {
    return __awaiter(_this, void 0, void 0, function () {
      var metadata, billingDetails, paymentKeyResult, paymentKeyData, publicKey, keyID, encryptedCardData, _a, expirationMonth, expirationYearLastTwoDigits, expirationYear;

      var _b, _c;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!orgID) throw new Error("Missing `orgID`");
            metadata = {
              email: billingInfo.email,
              phoneNumber: formatPhoneAsE123(billingInfo.phone, "".concat(billingInfo.country.value))
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
            if (!(paymentInfo.type === PaymentType.CreditCard)) return [3
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
                  paymentType: PaymentType.CreditCard,
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
            if (paymentInfo.type === PaymentType.Ach) {
              return [2
              /*return*/
              , createPaymentMethod({
                variables: {
                  orgID: orgID,
                  input: {
                    paymentType: PaymentType.Ach,
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

export { useCreatePaymentMethod };
//# sourceMappingURL=useCreatePaymentMethod.js.map
