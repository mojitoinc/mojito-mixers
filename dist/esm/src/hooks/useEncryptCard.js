import { __awaiter } from '../../node_modules/tslib/tslib.es6.js';
import { useCallback } from 'react';
import { usePaymentKeyLazyQuery } from '../queries/graphqlGenerated.js';
import { encryptCardData } from '../utils/encryptionUtils.js';

function useEncryptCardData() {
    // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.
    const [fetchPaymentKey, fetchPaymentKeyResult] = usePaymentKeyLazyQuery();
    const encryptCardData$1 = useCallback((encryptCardDataOptions) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const paymentKeyResult = yield fetchPaymentKey().catch((err) => {
            console.log(err);
            return undefined;
        });
        const paymentKeyData = paymentKeyResult === null || paymentKeyResult === void 0 ? void 0 : paymentKeyResult.data;
        const publicKey = (_a = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _a === void 0 ? void 0 : _a.publicKey;
        const keyID = (_b = paymentKeyData === null || paymentKeyData === void 0 ? void 0 : paymentKeyData.getPaymentPublicKey) === null || _b === void 0 ? void 0 : _b.keyID;
        if (!publicKey || !keyID)
            throw new Error("Missing `publicKey` or `keyID`");
        const encryptedCardData = yield encryptCardData(Object.assign(Object.assign({}, encryptCardDataOptions), { key: publicKey }));
        return {
            keyID,
            encryptedCardData,
        };
    }), [fetchPaymentKey]);
    return [encryptCardData$1, fetchPaymentKeyResult];
}

export { useEncryptCardData };
//# sourceMappingURL=useEncryptCard.js.map
