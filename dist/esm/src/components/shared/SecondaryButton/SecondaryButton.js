import { __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import { Button } from '@mui/material';
import React__default from 'react';
import { containsOnlyIcon } from '../../../utils/reactUtils.js';

var SecondaryButton = React__default.forwardRef(function (props, ref) {
    var isIcon = containsOnlyIcon(props.children);
    return (React__default.createElement(Button, __assign({ variant: "contained", color: "secondary", size: "small", ref: ref, disableElevation: true }, props, { sx: isIcon ? __assign(__assign({}, props.sx), { p: 0 }) : props.sx })));
});

export { SecondaryButton };
//# sourceMappingURL=SecondaryButton.js.map
