import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box } from '@mui/material';
import React__default from 'react';
import { SM_BORDER_RADIUS } from '../../../config/theme/theme.js';

const DISPLAY_BOX_SX = {
    p: 2,
    m: 0,
    borderRadius: `${SM_BORDER_RADIUS}px`,
    backgroundColor: theme => theme.palette.grey["50"],
    border: theme => `1px solid ${theme.palette.grey["100"]}`,
    color: theme => theme.palette.grey["800"],
};
const DisplayBox = (_a) => {
    var { sx } = _a, props = __rest(_a, ["sx"]);
    return (React__default.createElement(Box, Object.assign({}, props, { sx: Object.assign(Object.assign({}, DISPLAY_BOX_SX), sx) })));
};

export { DISPLAY_BOX_SX, DisplayBox };
//# sourceMappingURL=DisplayBox.js.map
