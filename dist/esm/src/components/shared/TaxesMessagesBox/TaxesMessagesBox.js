import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box, Typography } from '@mui/material';
import React__default from 'react';

const TaxesMessagesBox = (_a) => {
    var { variant, taxes, sx } = _a, props = __rest(_a, ["variant", "taxes", "sx"]);
    if (taxes === null || taxes.status !== "error")
        return null;
    return (React__default.createElement(Box, Object.assign({}, props),
        React__default.createElement(Typography, { variant: "caption", component: "p", sx: Object.assign({ color: theme => theme.palette.warning.dark }, sx) },
            "Please, ",
            variant === "form" ? "enter" : "select",
            " a valid address to calculate taxes.")));
};

export { TaxesMessagesBox };
//# sourceMappingURL=TaxesMessagesBox.js.map
