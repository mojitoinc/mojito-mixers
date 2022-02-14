import { __awaiter, __rest } from '../../node_modules/tslib/tslib.es6.js';
import { readKeys, createMessage, encrypt } from 'openpgp';
import atob from 'atob';
import btoa from 'btoa';

function encryptCardData(_a) {
    var { key } = _a, dataToEncrypt = __rest(_a, ["key"]);
    return __awaiter(this, void 0, void 0, function* () {
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

export { encryptCardData };
//# sourceMappingURL=encryptionUtils.js.map
