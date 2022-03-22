import { __awaiter } from '../../node_modules/tslib/tslib.es6.js';
import { useCallback } from 'react';
import { useGetPaymentMethodStatusLazyQuery, useCreatePaymentMethodMutation, PaymentType } from '../queries/graphqlGenerated.js';
import { useEncryptCardData } from './useEncryptCard.js';
import { formatPhoneAsE123 } from '../domain/circle/circle.utils.js';
import { fullTrim } from '../utils/formatUtils.js';
import { wait } from '../utils/promiseUtils.js';
import { PAYMENT_CREATION_MAX_WAIT_MS, PAYMENT_CREATION_INTERVAL_MS } from '../config/config.js';

function useCreatePaymentMethod({ orgID, debug, }) {
    const [encryptCardData] = useEncryptCardData({ orgID });
    const [getPaymentMethodStatus] = useGetPaymentMethodStatusLazyQuery();
    const [createPaymentMethod, createPaymentMethodResult] = useCreatePaymentMethodMutation();
    const extendedCreatePaymentMethod = useCallback((billingInfo, paymentInfo) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
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
        let createPaymentMethodPromise = null;
        if (paymentInfo.type === PaymentType.CreditCard) {
            const { keyID, encryptedCardData } = yield encryptCardData({
                number: paymentInfo.cardNumber.replace(/\s/g, ""),
                cvv: paymentInfo.secureCode,
            });
            const [expirationMonth, expirationYearLastTwoDigits] = paymentInfo.expiryDate.split("/").map(value => parseInt(value.trim(), 10));
            const expirationYear = 2000 + expirationYearLastTwoDigits;
            createPaymentMethodPromise = createPaymentMethod({
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
        else if (paymentInfo.type === PaymentType.Ach) {
            createPaymentMethodPromise = createPaymentMethod({
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
        else {
            throw new Error("Unsupported payment method.");
        }
        if (!createPaymentMethodPromise) {
            throw new Error("Payment method could not be saved.");
        }
        let lastPaymentMethodStatusCheck;
        const paymentMethodCreatedAt = lastPaymentMethodStatusCheck = Date.now();
        const createPaymentMethodResult = yield createPaymentMethodPromise;
        const createPaymentMethodResultData = ((_a = createPaymentMethodResult.data) === null || _a === void 0 ? void 0 : _a.createPaymentMethod) || {};
        const paymentMethodID = createPaymentMethodResultData.id;
        let status = createPaymentMethodResultData.status;
        let totalWaitTimeSoFar = 0;
        if (!paymentMethodID || status === "failed")
            throw new Error("Payment method could not be saved.");
        if (status === "complete")
            return createPaymentMethodPromise;
        while (totalWaitTimeSoFar < PAYMENT_CREATION_MAX_WAIT_MS && status === "pending") {
            const now = Date.now();
            const paymentMethodStatusWaitTime = Math.max(PAYMENT_CREATION_INTERVAL_MS - (now - lastPaymentMethodStatusCheck), 0);
            totalWaitTimeSoFar = now - paymentMethodCreatedAt;
            if (debug)
                console.log(`    👀 getPaymentMethodStatus (${totalWaitTimeSoFar / 1000 | 0} / ${PAYMENT_CREATION_MAX_WAIT_MS / 1000 | 0} sec.)`, { paymentMethodID });
            if (paymentMethodStatusWaitTime > 0)
                yield wait(paymentMethodStatusWaitTime);
            lastPaymentMethodStatusCheck = Date.now();
            const paymentMethodStatusResult = yield getPaymentMethodStatus({
                variables: { paymentMethodID },
            });
            status = ((_b = paymentMethodStatusResult.data) === null || _b === void 0 ? void 0 : _b.getPaymentMethod.status) || "failed";
        }
        if (status === "failed")
            throw new Error("Payment method could not be saved.");
        else if (status === "complete")
            return createPaymentMethodPromise;
        throw new Error("Payment method could not be validated.");
    }), [debug, orgID, encryptCardData, createPaymentMethod, getPaymentMethodStatus]);
    return [extendedCreatePaymentMethod, createPaymentMethodResult];
}

export { useCreatePaymentMethod };
//# sourceMappingURL=useCreatePaymentMethod.js.map
