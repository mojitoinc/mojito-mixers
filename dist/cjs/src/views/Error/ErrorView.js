'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var WarningAmber = require('../../../node_modules/@mui/icons-material/WarningAmber.js');
var formatUtils = require('../../utils/formatUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ErrorView = function ErrorView(_a) {
  var _b = _a.errorMessage,
      errorMessage = _b === void 0 ? "The purchase could not be completed." : _b,
      errorImageSrc = _a.errorImageSrc,
      onReviewData = _a.onReviewData,
      onClose = _a.onClose;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(material.Box, {
    sx: {
      position: "relative",
      mt: 2
    }
  }, errorImageSrc ? /*#__PURE__*/React__default["default"].createElement(material.Box, {
    component: "img",
    src: errorImageSrc,
    sx: {
      width: 196,
      height: 196,
      mx: "auto",
      mt: 2.5,
      mb: 5
    }
  }) : /*#__PURE__*/React__default["default"].createElement(material.Box, {
    sx: {
      width: 196,
      height: 196,
      mx: "auto",
      mt: 2.5,
      mb: 2.5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/React__default["default"].createElement(WarningAmber["default"], {
    sx: {
      fontSize: "40px",
      color: function color(theme) {
        return theme.palette.text.primary;
      }
    }
  })), /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5
    }
  }, "Sorry, it looks like we are having some issues on our side:"), /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5
    }
  }, formatUtils.formatSentence(errorMessage)), /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5
    }
  }, "Please, review your payment information and try again.")), /*#__PURE__*/React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, {
    variant: "toForm",
    privacyHref: "",
    termsOfUseHref: "",
    onSubmitClicked: onReviewData,
    onCloseClicked: onClose
  }));
};

exports.ErrorView = ErrorView;
//# sourceMappingURL=ErrorView.js.map
