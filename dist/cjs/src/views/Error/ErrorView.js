'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var formatUtils = require('../../utils/formatUtils.js');
var DisplayBox = require('../../components/payments/DisplayBox/DisplayBox.js');
var theme = require('../../config/theme/theme.js');
var StatusIcon = require('../../components/shared/StatusIcon/StatusIcon.js');
var errors_constants = require('../../domain/errors/errors.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ERROR_ACTION_LABELS = {
    reset: "Try Again",
    authentication: "Review Information",
    billing: "Review Billing Information",
    payment: "Review Payment Information",
    purchasing: "Try Again",
};
const ErrorView = ({ checkoutError: { error, errorMessage, at = errors_constants.DEFAULT_ERROR_AT, }, errorImageSrc, onFixError, onClose, debug, }) => {
    const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
    const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Box, null,
            React__default["default"].createElement(StatusIcon.StatusIcon, { variant: "error", imgSrc: errorImageSrc, sx: { my: 5 } }),
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
