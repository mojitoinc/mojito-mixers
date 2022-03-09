import { __awaiter } from '../../node_modules/tslib/tslib.es6.js';
import { useCallback } from 'react';
import { useCreatePaymentMethodMutation, PaymentType } from '../queries/graphqlGenerated.js';
import { useEncryptCardData } from './useEncryptCard.js';
import { formatPhoneAsE123 } from '../domain/circle/circle.utils.js';
import { fullTrim } from '../utils/formatUtils.js';

function useCreatePaymentMethod() {
    const [encryptCardData] = useEncryptCardData();
    const [createPaymentMethod, createPaymentMethodResult] = useCreatePaymentMethodMutation();
    const extendedCreatePaymentMethod = useCallback((orgID, billingInfo, paymentInfo) => __awaiter(this, void 0, void 0, function* () {
        if (!orgID)
            throw new Error("Missing `orgID`");
        const metadata = {
            email: billingInfo.email,
            phoneNumber: formatPhoneAsE123(billingInfo.phone, `${billingInfo.country.value}`),
        };
        // Using CreditCardBillingDetails as it's more restrictive than AchBillingDetails (address 2 is required instead of optional):
        const billingDetails = {
            name: fullTrim(billingInfo.fullName),
            city: fullTrim(billingInfo.city),
            country: `${billingInfo.country.value}`,
            address1: fullTrim(billingInfo.street || ""),
            address2: fullTrim(billingInfo.apartment || ""),
            district: `${billingInfo.state.value || billingInfo.state.label}`,
            postalCode: fullTrim(billingInfo.zipCode),
        };
        if (paymentInfo.type === PaymentType.CreditCard) {
            const { keyID, encryptedCardData } = yield encryptCardData({
                number: paymentInfo.cardNumber.replace(/\s/g, ""),
                cvv: paymentInfo.secureCode,
            });
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
    }), [encryptCardData, createPaymentMethod]);
    return [extendedCreatePaymentMethod, createPaymentMethodResult];
}

export { useCreatePaymentMethod };
//# sourceMappingURL=useCreatePaymentMethod.js.map
