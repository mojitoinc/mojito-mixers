import React__default, { useCallback } from 'react';
import { useTheme, useMediaQuery, Stack, Typography, Tooltip } from '@mui/material';
import default_1$1 from '../../../../node_modules/@mui/icons-material/AccountBalance.js';
import default_1 from '../../../../node_modules/@mui/icons-material/CreditCard.js';
import default_1$2 from '../../../../node_modules/@mui/icons-material/Language.js';
import Icon from '@mdi/react';
import { mdiEthereum } from '@mdi/js';
import ToggleButtonGroup from '../../../../node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js';
import ToggleButton from '../../../../node_modules/@mui/material/ToggleButton/ToggleButton.js';

var PAYMENT_METHOD_OPTION_PROPS = {
  CreditCard: {
    label: "Credit Card",
    icon: /*#__PURE__*/React__default.createElement(default_1, null)
  },
  ACH: {
    label: "ACH",
    icon: /*#__PURE__*/React__default.createElement(default_1$1, {
      sx: {
        fontSize: "20px"
      }
    })
  },
  Wire: {
    label: "Wire",
    icon: /*#__PURE__*/React__default.createElement(default_1$2, {
      sx: {
        fontSize: "20px"
      }
    })
  },
  Crypto: {
    label: "Crypto",
    icon: /*#__PURE__*/React__default.createElement(Icon, {
      path: mdiEthereum,
      size: "20px"
    })
  }
};
var PaymentMethodSelector = function PaymentMethodSelector(_a) {
  var paymentMethods = _a.paymentMethods,
      selectedPaymentMethod = _a.selectedPaymentMethod,
      onPaymentMethodChange = _a.onPaymentMethodChange;
  var theme = useTheme();
  var wideViewport = useMediaQuery(theme.breakpoints.up("sm"));
  var handleChange = useCallback(function (_, paymentMethod) {
    if (paymentMethod) onPaymentMethodChange(paymentMethod);
  }, [onPaymentMethodChange]);
  return /*#__PURE__*/React__default.createElement(ToggleButtonGroup, {
    value: selectedPaymentMethod,
    exclusive: true,
    onChange: handleChange,
    "aria-label": "payment method",
    sx: {
      mb: 3.5
    }
  }, paymentMethods.map(function (paymentMethod) {
    var _a = PAYMENT_METHOD_OPTION_PROPS[paymentMethod],
        label = _a.label,
        icon = _a.icon;
    return wideViewport ? /*#__PURE__*/React__default.createElement(ToggleButton, {
      key: paymentMethod,
      value: paymentMethod,
      "aria-label": paymentMethod
    }, /*#__PURE__*/React__default.createElement(Stack, {
      spacing: 1,
      direction: "row",
      sx: {
        alignItems: "center"
      }
    }, icon, /*#__PURE__*/React__default.createElement(Typography, {
      sx: {
        fontWeight: 500
      }
    }, label))) : /*#__PURE__*/React__default.createElement(Tooltip, {
      key: paymentMethod,
      title: label
    }, /*#__PURE__*/React__default.createElement(ToggleButton, {
      value: paymentMethod,
      "aria-label": paymentMethod
    }, icon));
  }));
};

export { PaymentMethodSelector };
//# sourceMappingURL=PaymentMethodSelector.js.map
