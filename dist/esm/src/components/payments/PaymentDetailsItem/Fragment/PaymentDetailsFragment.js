import { Typography } from '@mui/material';
import default_1 from '../../../../../node_modules/@mui/icons-material/AccountBalance.js';
import React__default from 'react';
import { CreditCardIcon } from '../../../shared/Icons/Icons.js';
import { CREDIT_CARD_MASK_PREFIX, EXPIRATION_DATE_MASK, ACH_MASK_PREFIX } from '../../../../domain/payment/payment.constants.js';

var PaymentDetailsFragment = function PaymentDetailsFragment(_a) {
  var savedPaymentMethod = _a.savedPaymentMethod;

  if (savedPaymentMethod.type === "CreditCard") {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(CreditCardIcon, {
      network: savedPaymentMethod.network
    }), /*#__PURE__*/React__default.createElement(Typography, null, CREDIT_CARD_MASK_PREFIX, " ", savedPaymentMethod.last4Digit), /*#__PURE__*/React__default.createElement(Typography, null, EXPIRATION_DATE_MASK));
  }

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(default_1, {
    sx: {
      width: "24px",
      height: "24px"
    }
  }), /*#__PURE__*/React__default.createElement(Typography, null, ACH_MASK_PREFIX, " ", savedPaymentMethod.accountNumber));
};

export { PaymentDetailsFragment };
//# sourceMappingURL=PaymentDetailsFragment.js.map
