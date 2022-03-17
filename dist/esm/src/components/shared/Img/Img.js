import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { Box } from '@mui/material';

const IMG_SX_PROPS = {
    display: "block",
};
const Img = (_a) => {
    var { src, sx } = _a, props = __rest(_a, ["src", "sx"]);
    return (React__default.createElement(Box, Object.assign({}, props, { component: "img", src: src, sx: Object.assign(Object.assign({}, IMG_SX_PROPS), sx) })));
};

export { Img };
//# sourceMappingURL=Img.js.map
