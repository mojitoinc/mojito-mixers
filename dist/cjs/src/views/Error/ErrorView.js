'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var WarningAmber = require('../../../node_modules/@mui/icons-material/WarningAmber.js');
var formatUtils = require('../../utils/formatUtils.js');
var DisplayBox = require('../../components/payments/DisplayBox/DisplayBox.js');
var theme = require('../../config/theme/theme.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ERROR_ACTION_LABELS = {
    authentication: "Review Information",
    billing: "Review Billing Information",
    payment: "Review Payment Information",
    purchasing: "Try Again",
};
const ErrorView = ({ checkoutError: { error, errorMessage, at, }, errorImageSrc, onFixError, onClose, debug, }) => {
    const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
    const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Box, { sx: { position: "relative" } },
            errorImageSrc ? (React__default["default"].createElement(material.Box, { component: "img", src: errorImageSrc, sx: {
                    width: 196,
                    height: 196,
                    mx: "auto",
                    mt: 2.5,
                    mb: 5,
                } })) : (React__default["default"].createElement(material.Box, { sx: {
                    width: 196,
                    height: 196,
                    mx: "auto",
                    mt: 2.5,
                    mb: 2.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                } },
                React__default["default"].createElement(WarningAmber["default"], { sx: { fontSize: "40px", color: theme => theme.palette.text.primary } }))),
            React__default["default"].createElement(material.Box, { sx: { maxWidth: theme.XS_MOBILE_MAX_WIDTH, mx: "auto" } },
                formatUtils.parseSentences(errorMessage).map((sentence) => {
                    return React__default["default"].createElement(material.Typography, { key: sentence, variant: "body2", sx: { textAlign: "center", mb: 1.5 } }, sentence);
                }),
                React__default["default"].createElement(material.Typography, { variant: "body2", sx: { textAlign: "center", mt: 5 } }, "Sorry, we are experiencing some issues. Please, review your payment information and try again. ")),
            debug && React__default["default"].createElement(DisplayBox.DebugBox, { sx: { mt: 5 } }, debugErrorMessage)),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toReview", buttonLabel: ERROR_ACTION_LABELS[at], onSubmitClicked: onFixError, onCloseClicked: onClose })));
};

exports.ErrorView = ErrorView;
//# sourceMappingURL=ErrorView.js.map
