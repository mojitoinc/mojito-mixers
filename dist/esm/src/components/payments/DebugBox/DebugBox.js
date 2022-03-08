import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box, Typography } from '@mui/material';
import React__default from 'react';
import { SM_BORDER_RADIUS } from '../../../config/theme/theme.js';

const DEBUG_BOX_OUTER_SX = {
    position: "relative",
    m: 0,
    borderRadius: `${SM_BORDER_RADIUS}px`,
    backgroundColor: theme => theme.palette.grey["50"],
    border: theme => `1px solid ${theme.palette.grey["100"]}`,
    color: theme => theme.palette.grey["800"],
    overflow: "hidden",
};
const DEBUG_BOX_INNER_COMPACT_SX = {
    p: 1,
    pr: 6,
    m: 0,
};
const DEBUG_BOX_INNER_SCROLL_SX = {
    p: 2,
    pt: 3,
    m: 0,
    overflow: "scroll",
    whiteSpace: "pre-wrap",
    maxHeight: "256px",
};
const DEBUG_LABEL_COMPACT_SX = {
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: `${SM_BORDER_RADIUS}px`,
    px: 0.5,
    borderLeft: theme => `1px solid ${theme.palette.grey["100"]}`,
    borderBottom: theme => `1px solid ${theme.palette.grey["100"]}`,
    pointerEvents: "none",
};
const DEBUG_LABEL_SCROLL_SX = Object.assign(Object.assign({}, DEBUG_LABEL_COMPACT_SX), { pr: 2.5 });
const DebugBox = (_a) => {
    var { compact, sx, children } = _a, props = __rest(_a, ["compact", "sx", "children"]);
    return (React__default.createElement(Box, Object.assign({}, props, { sx: Object.assign(Object.assign({}, DEBUG_BOX_OUTER_SX), sx) }),
        React__default.createElement(Typography, { component: "span", variant: "caption", sx: compact ? DEBUG_LABEL_COMPACT_SX : DEBUG_LABEL_SCROLL_SX }, "DEBUG"),
        React__default.createElement(Box, { component: "pre", sx: compact ? DEBUG_BOX_INNER_COMPACT_SX : DEBUG_BOX_INNER_SCROLL_SX }, children)));
};

export { DebugBox };
//# sourceMappingURL=DebugBox.js.map
