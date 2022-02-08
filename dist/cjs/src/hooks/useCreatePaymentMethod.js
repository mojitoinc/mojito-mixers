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
    return tslib_es6.__awaiter(this, void 0, void 0, function* () {
        const dataToEncrypt = {
            number: cardNumber,
            cvv,
        };
        const decodedPublicKey = atob__default["default"](key);
        const [encryptionKeys, message] = yield Promise.allSettled([
            openpgp.readKeys({ armoredKeys: decodedPublicKey }),
            openpgp.createMessage({ text: JSON.stringify(dataToEncrypt) }),
        ]).then((allSettledResults) => {
            return allSettledResults.map((allSettledResult) => {
                return allSettledResult.status === "fulfilled" ? allSettledResult.value : null;
            });
        });
        const ciphertext = yield openpgp.encrypt({
            message,
            encryptionKeys,
        });
        return btoa__default["default"](ciphertext);
    });
}
function useCreatePaymentMethod() {
    // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.
    const [fetchPaymentKey] = graphqlGenerated.usePaymentKeyLazyQuery();
    const [createPaymentMethod, createPaymentMethodResult,] = graphqlGenerated.useCreatePaymentMethodMutation();
    const extendedCreatePaymentMethod = React.useCallback((orgID, billingInfo, paymentInfo) => tslib_es6.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!orgID)
            throw new Error("Missing `orgID`");
        const metadata = {
            email: billingInfo.email,
            phoneNumber: circle_utils.formatPhoneAsE123(billingInfo.phone, `${billingInfo.country.value}`),
        };
        // Using CreditCardBillingDetails as it's more restrictive than AchBillingDetails (address 2 is required instead of optional):
        const billingDetails = {
            name: billingInfo.fullName,
            city: billingInfo.city,
            country: `${billingInfo.country.value}`,
            address1: billingInfo.street || "",
            address2: billingInfo.apartment || "",
            district: `${billingInfo.state.value || billingInfo.state.label}`,
            postalCode: billingInfo.zipCode,
        };
        if (paymentInfo.type === graphqlGenerated.PaymentType.CreditCard) {
            const paymentKeyResult = yield fetchPaymentKey().catch(err => undefined);
            const paymentKeyData = paymentKeyResult === null || paymentKeyResult === void 0 ? void 0 : paymentKeyResult.data;
            const publicKey = (_a = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _a === void 0 ? void 0 : _a.publicKey;
            const keyID = (_b = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _b === void 0 ? void 0 : _b.keyID;
            if (!publicKey || !keyID)
                throw new Error("Missing `publicKey` or `keyID`");
            const encryptedCardData = yield encryptCard(publicKey, paymentInfo.cardNumber.replace(/\s/g, ""), paymentInfo.secureCode);
            const [expirationMonth, expirationYearLastTwoDigits] = paymentInfo.expiryDate.split("/").map(value => parseInt(value.trim(), 10));
            const expirationYear = 2000 + expirationYearLastTwoDigits;
            return createPaymentMethod({
                variables: {
                    orgID,
                    input: {
                        paymentType: graphqlGenerated.PaymentType.CreditCard,
                        creditCardData: {
                            keyID,
                            encryptedData: encryptedCardData,
                            expirationMonth,
                            expirationYear,
                            metadata,
                            billingDetails,
                        },
                    },
                },
            });
        }
        if (paymentInfo.type === graphqlGenerated.PaymentType.Ach) {
            return createPaymentMethod({
                variables: {
                    orgID,
                    input: {
                        paymentType: graphqlGenerated.PaymentType.Ach,
                        achData: {
                            // TODO: Add account name?
                            accountId: paymentInfo.accountId,
                            publicToken: paymentInfo.publicToken,
                            metadata,
                            billingDetails,
                        },
                    },
                },
            });
        }
        throw new Error("Unsupported payment method.");
    }), [fetchPaymentKey, createPaymentMethod]);
    return [extendedCreatePaymentMethod, createPaymentMethodResult];
}

exports.useCreatePaymentMethod = useCreatePaymentMethod;
//# sourceMappingURL=useCreatePaymentMethod.js.map
