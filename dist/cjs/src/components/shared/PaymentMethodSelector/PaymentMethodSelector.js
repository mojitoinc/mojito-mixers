'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var AccountBalance = require('../../../../node_modules/@mui/icons-material/AccountBalance.js');
var CreditCard = require('../../../../node_modules/@mui/icons-material/CreditCard.js');
var Language = require('../../../../node_modules/@mui/icons-material/Language.js');
var Icon = require('@mdi/react');
var js = require('@mdi/js');
var ToggleButtonGroup = require('../../../../node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js');
var ToggleButton = require('../../../../node_modules/@mui/material/ToggleButton/ToggleButton.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Icon__default = /*#__PURE__*/_interopDefaultLegacy(Icon);

var PAYMENT_METHOD_OPTION_PROPS = {
  CreditCard: {
    label: "Credit Card",
    icon: /*#__PURE__*/React__default["default"].createElement(CreditCard["default"], null)
  },
  ACH: {
    label: "ACH",
    icon: /*#__PURE__*/React__default["default"].createElement(AccountBalance["default"], {
      sx: {
        fontSize: "20px"
      }
    })
  },
  Wire: {
    label: "Wire",
    icon: /*#__PURE__*/React__default["default"].createElement(Language["default"], {
      sx: {
        fontSize: "20px"
      }
    })
  },
  Crypto: {
    label: "Crypto",
    icon: /*#__PURE__*/React__default["default"].createElement(Icon__default["default"], {
      path: js.mdiEthereum,
      size: "20px"
    })
  }
};
var PaymentMethodSelector = function PaymentMethodSelector(_a) {
  var paymentMethods = _a.paymentMethods,
      selectedPaymentMethod = _a.selectedPaymentMethod,
      onPaymentMethodChange = _a.onPaymentMethodChange;
  var theme = material.useTheme();
  var wideViewport = material.useMediaQuery(theme.breakpoints.up("sm"));
  var handleChange = React.useCallback(function (_, paymentMethod) {
    if (paymentMethod) onPaymentMethodChange(paymentMethod);
  }, [onPaymentMethodChange]);
  return /*#__PURE__*/React__default["default"].createElement(ToggleButtonGroup["default"], {
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
    return wideViewport ? /*#__PURE__*/React__default["default"].createElement(ToggleButton["default"], {
      key: paymentMethod,
      value: paymentMethod,
      "aria-label": paymentMethod
    }, /*#__PURE__*/React__default["default"].createElement(material.Stack, {
      spacing: 1,
      direction: "row",
      sx: {
        alignItems: "center"
      }
    }, icon, /*#__PURE__*/React__default["default"].createElement(material.Typography, {
      sx: {
        fontWeight: 500
      }
    }, label))) : /*#__PURE__*/React__default["default"].createElement(material.Tooltip, {
      key: paymentMethod,
      title: label
    }, /*#__PURE__*/React__default["default"].createElement(ToggleButton["default"], {
      value: paymentMethod,
      "aria-label": paymentMethod
    }, icon));
  }));
};

exports.PaymentMethodSelector = PaymentMethodSelector;
//# sourceMappingURL=PaymentMethodSelector.js.map
