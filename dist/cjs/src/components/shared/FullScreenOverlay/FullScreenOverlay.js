'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var animationUtils = require('../../../utils/animationUtils.js');
var NoTransition = require('../NoTransition/NoTransition.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const centeredSx = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};
const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";
const FullScreenOverlay = (_a) => {
    var { open = true, onClose, isDialogBlocked, contentKey, header, children } = _a, variantProps = tslib_es6.__rest(_a, ["open", "onClose", "isDialogBlocked", "contentKey", "header", "children"]);
    const dialogRootRef = React.useRef(null);
    const paperRef = React.useRef(null);
    // Scroll to top on step change:
    React.useEffect(() => {
        var _a;
        const dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE);
        if (contentKey && dialogScrollable)
            dialogScrollable.scrollTop = 0;
    }, [contentKey]);
    const [shakeSx, shake] = animationUtils.useShakeAnimation(paperRef.current);
    return (React__default["default"].createElement(material.Dialog, { open: isDialogBlocked ? true : open, onClose: isDialogBlocked ? shake : onClose, "aria-labelledby": "checkout-modal-header-title", scroll: "body", ref: dialogRootRef, PaperProps: { sx: shakeSx, ref: paperRef }, TransitionComponent: NoTransition.NoTransition, 
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
            React__default["default"].createElement(React__default["default"].Fragment, null,
                header,
                children ? (React__default["default"].createElement(material.Box, { sx: "centered" in variantProps && variantProps.centered ? centeredSx : undefined }, children)) : (("leftColumn" in variantProps || "rightColumn" in variantProps) && {
                /* Implement 2-column layout using leftColumn and rightColumn */
                })))));
};

exports.FullScreenOverlay = FullScreenOverlay;
//# sourceMappingURL=FullScreenOverlay.js.map
