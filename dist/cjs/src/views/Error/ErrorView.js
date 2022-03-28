'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var material = require('@mui/material');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var formatUtils = require('../../utils/formatUtils.js');
var DebugBox = require('../../components/payments/DebugBox/DebugBox.js');
var themeConstants = require('../../config/theme/themeConstants.js');
var StatusIcon = require('../../components/shared/StatusIcon/StatusIcon.js');
var errors_constants = require('../../domain/errors/errors.constants.js');
var exceptions_constants = require('../../domain/errors/exceptions.constants.js');
var corre = require('@swyg/corre');
var config = require('../../config/config.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ERROR_ACTION_LABELS = {
    reset: "Try Again",
    authentication: "Review Information",
    billing: "Review Billing Information",
    payment: "Review Payment Information",
    purchasing: "Try Again",
};
const ErrorView = ({ checkoutError: { at = errors_constants.DEFAULT_ERROR_AT, error, circleFieldErrors, errorMessage = "", } = {}, errorImageSrc, onFixError, onClose, debug, }) => {
    const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
    const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;
    let rawDisplayMessage = "";
    if (circleFieldErrors) {
        rawDisplayMessage = circleFieldErrors.summary;
    }
    else {
        rawDisplayMessage = errorMessage.startsWith(exceptions_constants.DEV_EXCEPTION_PREFIX) ? errors_constants.ERROR_GENERIC.errorMessage : errorMessage;
    }
    const [displayMessage, setDisplayMessage] = React.useState(rawDisplayMessage);
    React.useEffect(() => {
        setDisplayMessage(rawDisplayMessage);
    }, [rawDisplayMessage]);
    corre.useTimeout(() => {
        if (!displayMessage)
            setDisplayMessage(errors_constants.ERROR_GENERIC.errorMessage);
    }, displayMessage ? null : config.ASYNC_ERROR_MAX_WAIT_MS, []);
    const handleSubmitClicked = React.useCallback(() => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        if (onFixError)
            onFixError(displayMessage);
        return false;
    }), [onFixError, displayMessage]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Box, null,
            React__default["default"].createElement(StatusIcon.StatusIcon, { variant: "error", imgSrc: errorImageSrc, sx: { my: 5 } }),
            React__default["default"].createElement(material.Box, { sx: { maxWidth: themeConstants.XS_MOBILE_MAX_WIDTH, mx: "auto", textAlign: "center" } },
                React__default["default"].createElement(material.Typography, { variant: "body2", sx: { mb: 1.5 } }, "Sorry, we are experiencing some issues:"),
                formatUtils.parseSentences(displayMessage || errors_constants.ERROR_LOADING.errorMessage).map((sentence) => {
                    return React__default["default"].createElement(material.Typography, { key: sentence, variant: "body2", sx: { mb: 1.5 } }, sentence);
                }),
                React__default["default"].createElement(material.Typography, { variant: "body2", sx: { mt: 5 } }, "Please, review your payment information and try again.")),
            debug && React__default["default"].createElement(DebugBox.DebugBox, { sx: { mt: 5 } }, debugErrorMessage)),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toReview", submitLabel: ERROR_ACTION_LABELS[at], submitDisabled: !displayMessage || !onFixError, submitLoading: !displayMessage || !onFixError, onSubmitClicked: handleSubmitClicked, closeDisabled: !displayMessage || !onClose, onCloseClicked: onClose })));
};

exports.ErrorView = ErrorView;
//# sourceMappingURL=ErrorView.js.map
