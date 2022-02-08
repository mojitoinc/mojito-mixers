import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Typography } from '@mui/material';
import React__default from 'react';

const InputGroupLabel = (_a) => {
    var { sx } = _a, props = __rest(_a, ["sx"]);
    return (React__default.createElement(Typography, Object.assign({ variant: "body2", sx: [
            (theme) => ({
                fontWeight: 500,
                color: theme.palette.grey["700"],
                mt: 1.5
            }),
            sx
        ] }, props)));
};

export { InputGroupLabel };
//# sourceMappingURL=InputGroupLabel.js.map
