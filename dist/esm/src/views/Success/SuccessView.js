import { Box, Typography } from '@mui/material';
import React__default from 'react';
import { StatusIcon } from '../../components/shared/StatusIcon/StatusIcon.js';
import { XS_MOBILE_MAX_WIDTH } from '../../config/theme/themeConstants.js';

const SuccessView = ({ successImageSrc, }) => {
    return (React__default.createElement(Box, null,
        React__default.createElement(StatusIcon, { variant: "success", imgSrc: successImageSrc, sx: { my: 5 } }),
        React__default.createElement(Box, { sx: { maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 } },
            React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mb: 1.5 } }, "Payment success!"),
            React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center" } }, "Redirecting you to the confirmation screen..."))));
};

export { SuccessView };
//# sourceMappingURL=SuccessView.js.map
