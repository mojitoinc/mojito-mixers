import { __awaiter } from '../../node_modules/tslib/tslib.es6.js';
import { useCallback } from 'react';
import { usePaymentKeyLazyQuery, useCreatePaymentMethodMutation, PaymentType } from '../queries/graphqlGenerated.js';
import { readKeys, createMessage, encrypt } from 'openpgp';
import atob from 'atob';
import btoa from 'btoa';
import { formatPhoneAsE123 } from '../domain/circle/circle.utils.js';

function encryptCard(key, cardNumber, cvv) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataToEncrypt = {
            number: cardNumber,
            cvv,
        };
        const decodedPublicKey = atob(key);
        const [encryptionKeys, message] = yield Promise.allSettled([
            readKeys({ armoredKeys: decodedPublicKey }),
            createMessage({ text: JSON.stringify(dataToEncrypt) }),
        ]).then((allSettledResults) => {
            return allSettledResults.map((allSettledResult) => {
                return allSettledResult.status === "fulfilled" ? allSettledResult.value : null;
            });
        });
        const ciphertext = yield encrypt({
            message,
            encryptionKeys,
        });
        return btoa(ciphertext);
    });
}
function useCreatePaymentMethod() {
    // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.
    const [fetchPaymentKey] = usePaymentKeyLazyQuery();
    const [createPaymentMethod, createPaymentMethodResult,] = useCreatePaymentMethodMutation();
    const extendedCreatePaymentMethod = useCallback((orgID, billingInfo, paymentInfo) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!orgID)
            throw new Error("Missing `orgID`");
        const metadata = {
            email: billingInfo.email,
            phoneNumber: formatPhoneAsE123(billingInfo.phone, `${billingInfo.country.value}`),
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
        if (paymentInfo.type === PaymentType.CreditCard) {
            const paymentKeyResult = yield fetchPaymentKey().catch((err) => {
                console.log(err);
                return undefined;
            });
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
                        paymentType: PaymentType.CreditCard,
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
        if (paymentInfo.type === PaymentType.Ach) {
            return createPaymentMethod({
                variables: {
                    orgID,
                    input: {
                        paymentType: PaymentType.Ach,
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

export { useCreatePaymentMethod };
//# sourceMappingURL=useCreatePaymentMethod.js.map
