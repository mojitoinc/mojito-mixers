'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var animationUtils = require('../../../utils/animationUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const centeredSx = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};
const FullScreenOverlay = (_a) => {
    var { open = true, onClose, isDialogBlocked, dialogRootRef, header, children } = _a, variantProps = tslib_es6.__rest(_a, ["open", "onClose", "isDialogBlocked", "dialogRootRef", "header", "children"]);
    const paperRef = React.useRef(null);
    const [shakeSx, shake] = animationUtils.useShakeAnimation(paperRef.current);
    return (React__default["default"].createElement(material.Dialog, { open: isDialogBlocked ? true : open, onClose: isDialogBlocked ? shake : onClose, "aria-labelledby": "checkout-modal-header-title", scroll: "body", ref: dialogRootRef, PaperProps: { sx: shakeSx, ref: paperRef }, 
        // Dialog only:
        // fullWidth
        // maxWidth="sm"
        fullScreen: true },
        React__default["default"].createElement(material.DialogContent, { sx: {
                overflowX: 'hidden',
                px: {
                    xs: 1.5,
                    sm: 2.5,
                },
                py: 2.5,
                maxWidth: theme => theme.breakpoints.values.lg,
                mx: "auto",
            } },
            header,
            children ? (React__default["default"].createElement(material.Box, { sx: "centered" in variantProps && variantProps.centered ? centeredSx : undefined }, children)) : (("leftColumn" in variantProps || "rightColumn" in variantProps) && {
            /* Implement 2-column layout using leftColumn and rightColumn */
            }))));
};

exports.FullScreenOverlay = FullScreenOverlay;
//# sourceMappingURL=FullScreenOverlay.js.map
