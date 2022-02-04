import { Box, Stack, Typography, Divider } from '@mui/material';
import { useTimeout } from '@swyg/corre';
import React__default, { useState } from 'react';

var lastProgress = 0;
function resetStepperProgress() {
    lastProgress = 0;
}
var CheckoutStepper = function (_a) {
    var currentProgress = _a.progress;
    var _b = useState(lastProgress), progress = _b[0], setProgress = _b[1];
    useTimeout(function () {
        setProgress(lastProgress = currentProgress);
    }, 0, [currentProgress]);
    return (React__default.createElement(Box, { sx: { position: "relative", mb: 1 } },
        React__default.createElement(Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", pt: 2, pb: 1 } },
            React__default.createElement(Typography, { variant: "subtitle2", sx: { width: "100%", color: function (theme) { return theme.palette.grey[progress === 50 ? "700" : "600"]; } } }, "Billing Info"),
            React__default.createElement(Typography, { variant: "subtitle2", sx: { width: "100%", color: function (theme) { return theme.palette.grey[progress === 50 ? "600" : "700"]; } } }, "Payment")),
        React__default.createElement(Box, { sx: {
                position: "relative",
                width: "100%",
                height: 2,
                background: function (theme) { var _a, _b; return (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.gradients) === null || _b === void 0 ? void 0 : _b.stepper; },
            } },
            React__default.createElement(Divider, { sx: {
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    background: function (theme) { return theme.palette.background.paper; },
                    width: "".concat(100 - progress, "%"),
                    height: 2,
                    marginLeft: "auto",
                    transition: function (theme) { return "width ".concat(theme.transitions.duration.standard, "ms ").concat(theme.transitions.easing.easeInOut); },
                } }))));
};

export { CheckoutStepper, resetStepperProgress };
//# sourceMappingURL=CheckoutStepper.js.map
