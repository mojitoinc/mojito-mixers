import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box, Typography } from '@mui/material';
import React__default from 'react';
import { parseSentences } from '../../../utils/formatUtils.js';

const FormErrorsBox = (_a) => {
    var { error, sx } = _a, props = __rest(_a, ["error", "sx"]);
    return (React__default.createElement(Box, Object.assign({}, props, { sx: Object.assign({ color: theme => theme.palette.warning.dark }, sx) }),
        React__default.createElement(Typography, { variant: "caption", component: "p", sx: { fontWeight: 600 } }, "Last purchase attempt errors:"),
        React__default.createElement(Box, { component: "ul", sx: { m: 0, pl: "16px !important", listStyle: "disc !important" } }, parseSentences(error).map((sentence) => {
            return React__default.createElement(Typography, { key: sentence, variant: "caption", component: "li", sx: { mt: 1.5 } }, sentence);
        }))));
};

export { FormErrorsBox };
//# sourceMappingURL=FormErrorsBox.js.map
