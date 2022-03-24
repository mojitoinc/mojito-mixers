import { SvgIcon } from '@mui/material';
import React__default from 'react';
import useTheme from '../../../../../node_modules/@mui/material/styles/useTheme.js';

const CheckboxIconChecked = ({ error, }) => {
    const { palette } = useTheme();
    return (React__default.createElement(SvgIcon, null,
        React__default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React__default.createElement("rect", { x: "0.5", y: "0.5", width: "19", height: "19", rx: "1.5", fill: error ? palette.warning.light : palette.success.light, stroke: error ? palette.warning.dark : palette.success.main }),
            React__default.createElement("path", { d: "M5.75926 10.3492C5.39983 9.92988 4.76853 9.88132 4.34921 10.2407C3.92988 10.6002 3.88132 11.2315 4.24074 11.6508L5.75926 10.3492ZM8 14.5L7.24074 15.1508C7.42202 15.3623 7.68328 15.4886 7.96162 15.4993C8.23996 15.51 8.51015 15.4041 8.70711 15.2071L8 14.5ZM16.7071 7.20711C17.0976 6.81658 17.0976 6.18342 16.7071 5.79289C16.3166 5.40237 15.6834 5.40237 15.2929 5.79289L16.7071 7.20711ZM4.24074 11.6508L7.24074 15.1508L8.75926 13.8492L5.75926 10.3492L4.24074 11.6508ZM8.70711 15.2071L16.7071 7.20711L15.2929 5.79289L7.29289 13.7929L8.70711 15.2071Z", fill: error ? palette.warning.dark : palette.success.main }))));
};

export { CheckboxIconChecked };
//# sourceMappingURL=CheckboxIconChecked.js.map
