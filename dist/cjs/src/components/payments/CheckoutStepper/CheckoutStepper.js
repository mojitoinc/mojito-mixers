'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var corre = require('@swyg/corre');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

let lastProgress = 0;
function resetStepperProgress() {
    lastProgress = 0;
}
const CheckoutStepper = ({ progress: currentProgress, }) => {
    const [progress, setProgress] = React.useState(lastProgress);
    corre.useTimeout(() => {
        setProgress(lastProgress = currentProgress);
    }, 0, [currentProgress]);
    return (React__default["default"].createElement(material.Box, { sx: { position: "relative" } },
        React__default["default"].createElement(material.Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", pt: 2, pb: 1 } },
            React__default["default"].createElement(material.Typography, { variant: "subtitle2", sx: { width: "100%", color: theme => theme.palette.grey[progress === 50 ? "700" : "600"] } }, "Billing Information"),
            React__default["default"].createElement(material.Typography, { variant: "subtitle2", sx: { width: "100%", color: theme => theme.palette.grey[progress === 50 ? "600" : "700"] } }, "Payment and Delivery")),
        React__default["default"].createElement(material.Box, { sx: {
                position: "relative",
                width: "100%",
                height: 2,
                background: theme => { var _a; return ((_a = theme.palette.paymentUI) === null || _a === void 0 ? void 0 : _a.progressBar) || theme.palette.primary.main; },
            } },
            React__default["default"].createElement(material.Divider, { sx: {
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    background: theme => theme.palette.background.paper,
                    width: `${100 - progress}%`,
                    height: 2,
                    marginLeft: "auto",
                    transition: theme => `width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                } }))));
};

exports.CheckoutStepper = CheckoutStepper;
exports.resetStepperProgress = resetStepperProgress;
//# sourceMappingURL=CheckoutStepper.js.map
