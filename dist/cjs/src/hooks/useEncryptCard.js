'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var encryptionUtils = require('../utils/encryptionUtils.js');

function useEncryptCardData({ orgID }) {
    // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.
    const [fetchPaymentKey, fetchPaymentKeyResult] = graphqlGenerated.usePaymentKeyLazyQuery();
    const encryptCardData = React.useCallback((encryptCardDataOptions) => tslib_es6.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const paymentKeyResult = yield fetchPaymentKey({ variables: { orgID } });
        const paymentKeyData = paymentKeyResult === null || paymentKeyResult === void 0 ? void 0 : paymentKeyResult.data;
        const publicKey = (_a = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _a === void 0 ? void 0 : _a.publicKey;
        const keyID = (_b = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _b === void 0 ? void 0 : _b.keyID;
        if (!publicKey || !keyID)
            throw new Error("Missing `publicKey` or `keyID`");
        const encryptedCardData = yield encryptionUtils.encryptCardData(Object.assign(Object.assign({}, encryptCardDataOptions), { key: publicKey }));
        return {
            keyID,
            encryptedCardData,
        };
    }), [fetchPaymentKey, orgID]);
    return [encryptCardData, fetchPaymentKeyResult];
}

exports.useEncryptCardData = useEncryptCardData;
//# sourceMappingURL=useEncryptCard.js.map
