import { Typography } from '@mui/material';
import default_1 from '../../../../../node_modules/@mui/icons-material/AccountBalance.js';
import React__default from 'react';
import { CreditCardIcon } from '../../../shared/Icons/Icons.js';
import { CREDIT_CARD_MASK_PREFIX, EXPIRATION_DATE_MASK, ACH_MASK_PREFIX } from '../../../../domain/payment/payment.constants.js';

var PaymentDetailsFragment = function (_a) {
    var savedPaymentMethod = _a.savedPaymentMethod;
    if (savedPaymentMethod.type === "CreditCard") {
        return (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(CreditCardIcon, { network: savedPaymentMethod.network }),
            React__default.createElement(Typography, null,
                CREDIT_CARD_MASK_PREFIX,
                " ",
                savedPaymentMethod.last4Digit),
            React__default.createElement(Typography, null, EXPIRATION_DATE_MASK)));
    }
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(default_1, { sx: { width: "24px", height: "24px" } }),
        React__default.createElement(Typography, null,
            ACH_MASK_PREFIX,
            " ",
            savedPaymentMethod.accountNumber)));
};

export { PaymentDetailsFragment };
//# sourceMappingURL=PaymentDetailsFragment.js.map
