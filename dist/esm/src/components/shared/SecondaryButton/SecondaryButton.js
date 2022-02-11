import { Button } from '@mui/material';
import React__default from 'react';
import { containsOnlyIcon } from '../../../utils/reactUtils.js';

const SecondaryButton = React__default.forwardRef((props, ref) => {
    const isIcon = containsOnlyIcon(props.children);
    return (React__default.createElement(Button, Object.assign({ variant: "contained", color: "secondary", size: "small", ref: ref, disableElevation: true }, props, { sx: isIcon ? Object.assign(Object.assign({}, props.sx), { p: 0 }) : props.sx })));
});

export { SecondaryButton };
//# sourceMappingURL=SecondaryButton.js.map
