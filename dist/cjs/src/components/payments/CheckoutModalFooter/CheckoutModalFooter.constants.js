'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Lock = require('../../../../node_modules/@mui/icons-material/Lock.js');
var ChevronRight = require('../../../../node_modules/@mui/icons-material/ChevronRight.js');

const LABELS_BY_VARIANT = {
    toGuestCheckout: "Guest Check Out",
    toPayment: "Continue to Payment",
    toConfirmation: "Purchase",
    toPlaid: "Purchase with Plaid",
    toForm: "Review Payment Information",
    toMarketplace: "Back to Marketplace",
};
const ICONS_BY_VARIANT = {
    toGuestCheckout: null,
    toPayment: ChevronRight["default"],
    toConfirmation: Lock["default"],
    toPlaid: Lock["default"],
    toForm: null,
    toMarketplace: null,
};

exports.ICONS_BY_VARIANT = ICONS_BY_VARIANT;
exports.LABELS_BY_VARIANT = LABELS_BY_VARIANT;
//# sourceMappingURL=CheckoutModalFooter.constants.js.map
