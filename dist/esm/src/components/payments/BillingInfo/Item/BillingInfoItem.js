import { __assign } from '../../../../../node_modules/tslib/tslib.es6.js';
import { BillingInfoFragment } from '../Fragment/BillingInfoFragment.js';
import { SavedItem } from '../../SavedItem/SavedItem.js';
import React__default from 'react';

var BILLING_INFO_ITEM_LABELS = {
    select: "Use Billing Info",
};
var BillingInfoItem = function (_a) {
    var savedPaymentMethod = _a.data, savedItemProps = _a.additionalProps;
    return (React__default.createElement(SavedItem, __assign({ variant: "stacked", labels: BILLING_INFO_ITEM_LABELS }, savedItemProps, { id: savedPaymentMethod.addressId }),
        React__default.createElement(BillingInfoFragment, { savedPaymentMethod: savedPaymentMethod })));
};

export { BillingInfoItem };
//# sourceMappingURL=BillingInfoItem.js.map
