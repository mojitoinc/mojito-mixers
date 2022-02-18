'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var useEncryptCard = require('./useEncryptCard.js');
var circle_utils = require('../domain/circle/circle.utils.js');

function useCreatePaymentMethod() {
    const [encryptCardData] = useEncryptCard.useEncryptCardData();
    const [createPaymentMethod, createPaymentMethodResult] = graphqlGenerated.useCreatePaymentMethodMutation();
    const extendedCreatePaymentMethod = React.useCallback((orgID, billingInfo, paymentInfo) => tslib_es6.__awaiter(this, void 0, void 0, function* () {
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
    }), [encryptCardData, createPaymentMethod]);
    return [extendedCreatePaymentMethod, createPaymentMethodResult];
}

exports.useCreatePaymentMethod = useCreatePaymentMethod;
//# sourceMappingURL=useCreatePaymentMethod.js.map
