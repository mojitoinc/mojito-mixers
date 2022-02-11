import { Button } from '@mui/material';
import React__default from 'react';
import { containsOnlyIcon } from '../../../utils/reactUtils.js';

const PrimaryButton = React__default.forwardRef((props, ref) => {
    const isIcon = containsOnlyIcon(props.children);
    return (React__default.createElement(Button, Object.assign({ variant: "contained", color: "primary", size: "medium", ref: ref, disableElevation: true }, props, { sx: isIcon ? Object.assign(Object.assign({}, props.sx), { p: 0 }) : undefined })));
});

export { PrimaryButton };
//# sourceMappingURL=PrimaryButton.js.map
