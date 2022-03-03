import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box } from '@mui/material';
import React__default from 'react';
import { ROUNDED_BORDER_RADIUS, DEFAULT_PURCHASING_IMAGE_SRC, DEFAULT_ERROR_IMAGE_SRC } from '../../../config/theme/theme.js';
import default_1$2 from '../../../../node_modules/@mui/icons-material/WarningAmber.js';
import default_1$1 from '../../../../node_modules/@mui/icons-material/Check.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Autorenew.js';

const statusIconConfigs = {
    loading: {
        icon: default_1,
        iconColor: theme => theme.palette.primary.main,
        defaultImgSrc: DEFAULT_PURCHASING_IMAGE_SRC,
    },
    success: {
        icon: default_1$1,
        iconColor: theme => theme.palette.success.main,
    },
    error: {
        icon: default_1$2,
        iconColor: theme => theme.palette.warning.dark,
        defaultImgSrc: DEFAULT_ERROR_IMAGE_SRC,
    },
};
const StatusIcon = (_a) => {
    var { variant = "loading", imgSrc, sx } = _a; __rest(_a, ["variant", "imgSrc", "sx"]);
    const { icon: Icon, iconColor, defaultImgSrc, } = statusIconConfigs[variant];
    const src = imgSrc || defaultImgSrc;
    return src ? (React__default.createElement(Box, { component: "img", src: src, sx: Object.assign({ width: 196, height: 196, mx: "auto" }, sx) })) : (React__default.createElement(Box, { sx: Object.assign({ width: 96, height: 96, mx: "auto", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: ROUNDED_BORDER_RADIUS, border: (theme) => `4px solid ${iconColor(theme)}` }, sx) },
        React__default.createElement(Icon, { sx: {
                fontSize: 40,
                color: (theme) => iconColor(theme),
            } })));
};

export { StatusIcon };
//# sourceMappingURL=StatusIcon.js.map
