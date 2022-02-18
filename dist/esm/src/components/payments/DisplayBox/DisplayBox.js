import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box } from '@mui/material';
import React__default from 'react';
import { SM_BORDER_RADIUS } from '../../../config/theme/theme.js';

const DISPLAY_BOX_PROPS = {
    p: 2,
    m: 0,
    border: 1,
    borderRadius: SM_BORDER_RADIUS,
    backgroundColor: theme => theme.palette.grey["50"],
    borderColor: theme => theme.palette.grey["100"],
    color: theme => theme.palette.grey["800"],
    display: "flex",
    flexDirection: {
        xs: "column",
        sm: "row"
    },
};
const DisplayBox = (_a) => {
    var { sx } = _a, props = __rest(_a, ["sx"]);
    return (React__default.createElement(Box, Object.assign({}, props, { sx: Object.assign(Object.assign({}, DISPLAY_BOX_PROPS), sx) })));
};
const DebugBox = (_a) => {
    var { sx } = _a, props = __rest(_a, ["sx"]);
    return (React__default.createElement(DisplayBox, Object.assign({}, props, { component: "pre", sx: Object.assign(Object.assign({}, sx), { overflow: "scroll", whiteSpace: "pre-wrap" }) })));
};

export { DebugBox, DisplayBox };
//# sourceMappingURL=DisplayBox.js.map
