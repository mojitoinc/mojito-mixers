'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var openpgp = require('openpgp');
var atob = require('atob');
var btoa = require('btoa');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var atob__default = /*#__PURE__*/_interopDefaultLegacy(atob);
var btoa__default = /*#__PURE__*/_interopDefaultLegacy(btoa);

function encryptCardData(_a) {
    var { key } = _a, dataToEncrypt = tslib_es6.__rest(_a, ["key"]);
    return tslib_es6.__awaiter(this, void 0, void 0, function* () {
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

exports.encryptCardData = encryptCardData;
//# sourceMappingURL=encryptionUtils.js.map
