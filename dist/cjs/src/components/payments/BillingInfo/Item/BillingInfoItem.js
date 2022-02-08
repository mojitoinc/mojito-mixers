'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.js');
var BillingInfoFragment = require('../Fragment/BillingInfoFragment.js');
var SavedItem = require('../../SavedItem/SavedItem.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var BILLING_INFO_ITEM_LABELS = {
  select: "Use Billing Info"
};
var BillingInfoItem = function BillingInfoItem(_a) {
  var savedPaymentMethod = _a.data,
      savedItemProps = _a.additionalProps;
  return /*#__PURE__*/React__default["default"].createElement(SavedItem.SavedItem, tslib_es6.__assign({
    variant: "stacked",
    labels: BILLING_INFO_ITEM_LABELS
  }, savedItemProps, {
    id: savedPaymentMethod.addressId
  }), /*#__PURE__*/React__default["default"].createElement(BillingInfoFragment.BillingInfoFragment, {
    savedPaymentMethod: savedPaymentMethod
  }));
};

exports.BillingInfoItem = BillingInfoItem;
//# sourceMappingURL=BillingInfoItem.js.map
