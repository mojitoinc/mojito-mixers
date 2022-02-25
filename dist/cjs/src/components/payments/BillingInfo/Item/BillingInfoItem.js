'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.js');
var BillingInfoFragment = require('../Fragment/BillingInfoFragment.js');
var SavedItem = require('../../SavedItem/SavedItem.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const BILLING_INFO_ITEM_LABELS = {
    select: "Use Billing Info",
};
const BillingInfoItem = (_a) => {
    var { data: savedPaymentMethod, additionalProps: savedItemProps, children, index } = _a, boxProps = tslib_es6.__rest(_a, ["data", "additionalProps", "children", "index"]);
    return (React__default["default"].createElement(SavedItem.SavedItem, Object.assign({ variant: "stacked", labels: BILLING_INFO_ITEM_LABELS }, savedItemProps, { id: savedPaymentMethod.addressId, boxProps: Object.assign(Object.assign({}, boxProps), savedItemProps === null || savedItemProps === void 0 ? void 0 : savedItemProps.boxProps) }),
        React__default["default"].createElement(BillingInfoFragment.BillingInfoFragment, { savedPaymentMethod: savedPaymentMethod })));
};

exports.BillingInfoItem = BillingInfoItem;
//# sourceMappingURL=BillingInfoItem.js.map
