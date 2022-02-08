import React__default, { useState, useEffect } from 'react';
import { useFullPayment } from '../../hooks/useFullPayment.js';
import { Box, Typography } from '@mui/material';
import { useTimeout, useInterval } from '@swyg/corre';

var DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";
var PURCHASING_MIN_WAIT_MS = 3000;
var PURCHASING_MESSAGES_INTERVAL_MS = 5000;
var PURCHASING_MESSAGES_DEFAULT = ["Muddling mint and lime.", "Topping up with club soda.", "Adding rum, lime juice and ice.", "Shaking things up!"];
var PurchasingView = function PurchasingView(_a) {
  var purchasingImageSrc = _a.purchasingImageSrc,
      customPurchasingMessages = _a.purchasingMessages,
      orgID = _a.orgID,
      invoiceID = _a.invoiceID,
      lotID = _a.lotID,
      lotType = _a.lotType,
      savedPaymentMethods = _a.savedPaymentMethods,
      selectedPaymentMethod = _a.selectedPaymentMethod,
      onPurchaseSuccess = _a.onPurchaseSuccess,
      onPurchaseError = _a.onPurchaseError,
      onNext = _a.onNext,
      onDialogBlocked = _a.onDialogBlocked,
      debug = _a.debug;
  var purchasingMessages = customPurchasingMessages;

  if (purchasingMessages === false) {
    purchasingMessages = [];
  } else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
    purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
  }

  var _b = useState(false),
      hasWaited = _b[0],
      setHasWaited = _b[1];

  var _c = useState(0),
      purchasingMessageIndex = _c[0],
      setPurchasingMessageIndex = _c[1];

  var purchasingMessage = purchasingMessages[purchasingMessageIndex];
  var paymentState = useFullPayment({
    orgID: orgID,
    invoiceID: invoiceID,
    lotID: lotID,
    lotType: lotType,
    savedPaymentMethods: savedPaymentMethods,
    selectedPaymentMethod: selectedPaymentMethod,
    debug: debug
  });
  useEffect(function () {
    var paymentStatus = paymentState.paymentStatus,
        paymentReferenceNumber = paymentState.paymentReferenceNumber,
        paymentError = paymentState.paymentError;

    if (paymentStatus === "processing") {
      onDialogBlocked(true);
      return;
    }

    if (!hasWaited) return;
    onDialogBlocked(false);

    if (paymentStatus === "error" || paymentError) {
      onPurchaseError(paymentError);
      return;
    }

    onPurchaseSuccess(paymentReferenceNumber);
    onNext();
  }, [paymentState, hasWaited, onPurchaseError, onNext, onDialogBlocked, onPurchaseSuccess]);
  useTimeout(function () {
    setHasWaited(true);
  }, PURCHASING_MIN_WAIT_MS);
  useInterval(function () {
    setPurchasingMessageIndex(function (prevWaitMessageIndex) {
      return Math.min(prevWaitMessageIndex + 1, PURCHASING_MESSAGES_DEFAULT.length - 1);
    });
  }, PURCHASING_MESSAGES_INTERVAL_MS);
  return /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      position: "relative",
      mt: 2
    }
  }, /*#__PURE__*/React__default.createElement(Box, {
    component: "img",
    src: purchasingImageSrc || DEFAULT_PURCHASING_IMAGE_SRC,
    sx: {
      width: 196,
      height: 196,
      mx: "auto",
      mt: 5
    }
  }), purchasingMessage ? /*#__PURE__*/React__default.createElement(Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5
    }
  }, purchasingMessage) : null, /*#__PURE__*/React__default.createElement(Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 5,
      mb: 1.5
    }
  }, "Hang tight! We are currently processing your payment."), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "body2",
    sx: {
      textAlign: "center",
      mt: 1.5,
      mb: 5
    }
  }, "Please, don't close or reload the page..."));
};

export { PurchasingView };
//# sourceMappingURL=PurchasingView.js.map
