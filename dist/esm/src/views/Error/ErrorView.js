import { __awaiter } from '../../../node_modules/tslib/tslib.es6.js';
import React__default, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { parseSentences } from '../../utils/formatUtils.js';
import { DebugBox } from '../../components/payments/DebugBox/DebugBox.js';
import { XS_MOBILE_MAX_WIDTH } from '../../config/theme/themeConstants.js';
import { StatusIcon } from '../../components/shared/StatusIcon/StatusIcon.js';
import { DEFAULT_ERROR_AT, ERROR_GENERIC, ERROR_LOADING } from '../../domain/errors/errors.constants.js';
import { DEV_EXCEPTION_PREFIX } from '../../domain/errors/exceptions.constants.js';
import { useTimeout } from '@swyg/corre';
import { ASYNC_ERROR_MAX_WAIT_MS } from '../../config/config.js';

const ERROR_ACTION_LABELS = {
    reset: "Try Again",
    authentication: "Review Information",
    billing: "Review Billing Information",
    payment: "Review Payment Information",
    purchasing: "Try Again",
};
const ErrorView = ({ checkoutError: { at = DEFAULT_ERROR_AT, error, circleFieldErrors, errorMessage = "", } = {}, errorImageSrc, onFixError, onClose, debug, }) => {
    const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
    const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;
    let rawDisplayMessage = "";
    if (circleFieldErrors) {
        rawDisplayMessage = circleFieldErrors.summary;
    }
    else {
        rawDisplayMessage = errorMessage.startsWith(DEV_EXCEPTION_PREFIX) ? ERROR_GENERIC.errorMessage : errorMessage;
    }
    const [displayMessage, setDisplayMessage] = useState(rawDisplayMessage);
    useEffect(() => {
        setDisplayMessage(rawDisplayMessage);
    }, [rawDisplayMessage]);
    useTimeout(() => {
        if (!displayMessage)
            setDisplayMessage(ERROR_GENERIC.errorMessage);
    }, displayMessage ? null : ASYNC_ERROR_MAX_WAIT_MS, []);
    const handleSubmitClicked = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (onFixError)
            onFixError(displayMessage);
        return false;
    }), [onFixError, displayMessage]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Box, null,
            React__default.createElement(StatusIcon, { variant: "error", imgSrc: errorImageSrc, sx: { my: 5 } }),
            React__default.createElement(Box, { sx: { maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", textAlign: "center" } },
                React__default.createElement(Typography, { variant: "body2", sx: { mb: 1.5 } }, "Sorry, we are experiencing some issues:"),
                parseSentences(displayMessage || ERROR_LOADING.errorMessage).map((sentence) => {
                    return React__default.createElement(Typography, { key: sentence, variant: "body2", sx: { mb: 1.5 } }, sentence);
                }),
                React__default.createElement(Typography, { variant: "body2", sx: { mt: 5 } }, "Please, review your payment information and try again.")),
            debug && React__default.createElement(DebugBox, { sx: { mt: 5 } }, debugErrorMessage)),
        React__default.createElement(CheckoutModalFooter, { variant: "toReview", submitLabel: ERROR_ACTION_LABELS[at], submitDisabled: !displayMessage || !onFixError, submitLoading: !displayMessage || !onFixError, onSubmitClicked: handleSubmitClicked, closeDisabled: !displayMessage || !onClose, onCloseClicked: onClose })));
};

export { ErrorView };
//# sourceMappingURL=ErrorView.js.map
