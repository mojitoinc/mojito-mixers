import { SvgIcon } from '@mui/material';
import React__default from 'react';
import useTheme from '../../../../../node_modules/@mui/material/styles/useTheme.js';

const CheckboxIconUnchecked = ({ error, }) => {
    const { palette } = useTheme();
    return (React__default.createElement(SvgIcon, null,
        React__default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React__default.createElement("rect", { x: "0.5", y: "0.5", width: "19", height: "19", rx: "1.5", stroke: error ? palette.warning.dark : palette.grey[200] }))));
};

export { CheckboxIconUnchecked };
//# sourceMappingURL=CheckboxIconUnchecked.js.map
