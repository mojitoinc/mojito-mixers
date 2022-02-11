import { BillingInfoFragment } from '../Fragment/BillingInfoFragment.js';
import { SavedItem } from '../../SavedItem/SavedItem.js';
import React__default from 'react';

const BILLING_INFO_ITEM_LABELS = {
    select: "Use Billing Info",
};
const BillingInfoItem = ({ data: savedPaymentMethod, additionalProps: savedItemProps, }) => {
    return (React__default.createElement(SavedItem, Object.assign({ variant: "stacked", labels: BILLING_INFO_ITEM_LABELS }, savedItemProps, { id: savedPaymentMethod.addressId }),
        React__default.createElement(BillingInfoFragment, { savedPaymentMethod: savedPaymentMethod })));
};

export { BillingInfoItem };
//# sourceMappingURL=BillingInfoItem.js.map
