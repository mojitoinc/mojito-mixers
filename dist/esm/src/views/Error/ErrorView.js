import React__default from 'react';
import { Box, Typography } from '@mui/material';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import default_1 from '../../../node_modules/@mui/icons-material/WarningAmber.js';
import { formatSentence } from '../../utils/formatUtils.js';

var ErrorView = function ErrorView(_a) {
  var _b = _a.errorMessage,
      errorMessage = _b === void 0 ? "The purchase could not be completed." : _b,
      errorImageSrc = _a.errorImageSrc,
      onReviewData = _a.onReviewData,
      onClose = _a.onClose;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      position: "relative",
      mt: 2
    }
  }, errorImageSrc ? /*#__PURE__*/React__default.createElement(Box, {
    component: "img",
    src: errorImageSrc,
    sx: {
      width: 196,
      height: 196,
      mx: "auto",
      mt: 2.5,
      mb: 5
    }
  }) : /*#__PURE__*/React__default.createElement(Box, {
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
  }, /*#__PURE__*/React__default.createElement(default_1, {
    sx: {
      fontSize: "40px",
      color: function color(theme) {
        return theme.palette.text.primary;
      }
    }
  })), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5
    }
  }, "Sorry, it looks like we are having some issues on our side:"), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5
    }
  }, formatSentence(errorMessage)), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5
    }
  }, "Please, review your payment information and try again.")), /*#__PURE__*/React__default.createElement(CheckoutModalFooter, {
    variant: "toForm",
    privacyHref: "",
    termsOfUseHref: "",
    onSubmitClicked: onReviewData,
    onCloseClicked: onClose
  }));
};

export { ErrorView };
//# sourceMappingURL=ErrorView.js.map
