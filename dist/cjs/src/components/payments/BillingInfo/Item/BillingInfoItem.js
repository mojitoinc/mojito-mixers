'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var BillingInfoFragment = require('../Fragment/BillingInfoFragment.js');
var SavedItem = require('../../SavedItem/SavedItem.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const BILLING_INFO_ITEM_LABELS = {
    select: "Use Billing Info",
};
const BillingInfoItem = ({ data: savedPaymentMethod, additionalProps: savedItemProps, }) => {
    return (React__default["default"].createElement(SavedItem.SavedItem, Object.assign({ variant: "stacked", labels: BILLING_INFO_ITEM_LABELS }, savedItemProps, { id: savedPaymentMethod.addressId }),
        React__default["default"].createElement(BillingInfoFragment.BillingInfoFragment, { savedPaymentMethod: savedPaymentMethod })));
};

exports.BillingInfoItem = BillingInfoItem;
//# sourceMappingURL=BillingInfoItem.js.map
