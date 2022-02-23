import React__default from 'react';
import { Box, Typography } from '@mui/material';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { parseSentences } from '../../utils/formatUtils.js';
import { DebugBox } from '../../components/payments/DisplayBox/DisplayBox.js';
import { XS_MOBILE_MAX_WIDTH } from '../../config/theme/theme.js';
import { StatusIcon } from '../../components/shared/StatusIcon/StatusIcon.js';

const ERROR_ACTION_LABELS = {
    reset: "Try Again",
    authentication: "Review Information",
    billing: "Review Billing Information",
    payment: "Review Payment Information",
    purchasing: "Try Again",
};
const ErrorView = ({ checkoutError: { error, errorMessage, at, }, errorImageSrc, onFixError, onClose, debug, }) => {
    const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
    const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Box, null,
            React__default.createElement(StatusIcon, { variant: "error", imgSrc: errorImageSrc, sx: { my: 5 } }),
            React__default.createElement(Box, { sx: { maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto" } },
                parseSentences(errorMessage).map((sentence) => {
                    return React__default.createElement(Typography, { key: sentence, variant: "body2", sx: { textAlign: "center", mb: 1.5 } }, sentence);
                }),
                React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mt: 5 } }, "Sorry, we are experiencing some issues. Please, review your payment information and try again. ")),
            debug && React__default.createElement(DebugBox, { sx: { mt: 5 } }, debugErrorMessage)),
        React__default.createElement(CheckoutModalFooter, { variant: "toReview", buttonLabel: ERROR_ACTION_LABELS[at], onSubmitClicked: onFixError, onCloseClicked: onClose })));
};

export { ErrorView };
//# sourceMappingURL=ErrorView.js.map
