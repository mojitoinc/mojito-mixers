'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

exports.getAugmentedNamespace = getAugmentedNamespace;
//# sourceMappingURL=_commonjsHelpers.js.map
