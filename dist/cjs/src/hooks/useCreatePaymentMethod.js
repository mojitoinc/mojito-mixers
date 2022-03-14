'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var useEncryptCard = require('./useEncryptCard.js');
var circle_utils = require('../domain/circle/circle.utils.js');
var formatUtils = require('../utils/formatUtils.js');
var promiseUtils = require('../utils/promiseUtils.js');
var config = require('../config/config.js');

function useCreatePaymentMethod({ debug, }) {
    const [encryptCardData] = useEncryptCard.useEncryptCardData();
    const [getPaymentMethodStatus] = graphqlGenerated.useGetPaymentMethodStatusLazyQuery();
    const [createPaymentMethod, createPaymentMethodResult] = graphqlGenerated.useCreatePaymentMethodMutation();
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
            name: formatUtils.fullTrim(billingInfo.fullName),
            city: formatUtils.fullTrim(billingInfo.city),
            country: `${billingInfo.country.value}`,
            address1: formatUtils.fullTrim(billingInfo.street || ""),
            address2: formatUtils.fullTrim(billingInfo.apartment || ""),
            district: `${billingInfo.state.value || billingInfo.state.label}`,
            postalCode: formatUtils.fullTrim(billingInfo.zipCode),
        };
        let createPaymentMethodPromise = null;
        if (paymentInfo.type === graphqlGenerated.PaymentType.CreditCard) {
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
        else if (paymentInfo.type === graphqlGenerated.PaymentType.Ach) {
            createPaymentMethodPromise = createPaymentMethod({
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
        while (totalWaitTimeSoFar < config.PAYMENT_CREATION_MAX_WAIT_MS && status === "pending") {
            const now = Date.now();
            const paymentMethodStatusWaitTime = Math.max(config.PAYMENT_CREATION_INTERVAL_MS - (now - lastPaymentMethodStatusCheck), 0);
            totalWaitTimeSoFar = now - paymentMethodCreatedAt;
            if (debug)
                console.log(`    👀 getPaymentMethodStatus (${totalWaitTimeSoFar / 1000 | 0} / ${config.PAYMENT_CREATION_MAX_WAIT_MS / 1000 | 0} sec.)`, { paymentMethodID });
            if (paymentMethodStatusWaitTime > 0)
                yield promiseUtils.wait(paymentMethodStatusWaitTime);
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
    }), [debug, encryptCardData, createPaymentMethod, getPaymentMethodStatus]);
    return [extendedCreatePaymentMethod, createPaymentMethodResult];
}

exports.useCreatePaymentMethod = useCreatePaymentMethod;
//# sourceMappingURL=useCreatePaymentMethod.js.map
