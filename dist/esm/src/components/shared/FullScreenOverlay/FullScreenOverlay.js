import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Dialog, DialogContent, Box } from '@mui/material';
import React__default, { useRef, useEffect } from 'react';
import { useShakeAnimation } from '../../../utils/animationUtils.js';
import { NoTransition } from '../NoTransition/NoTransition.js';

const centeredSx = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};
const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";
const FullScreenOverlay = (_a) => {
    var { open = true, onClose, isDialogBlocked, contentKey, header, children } = _a, variantProps = __rest(_a, ["open", "onClose", "isDialogBlocked", "contentKey", "header", "children"]);
    const dialogRootRef = useRef(null);
    const paperRef = useRef(null);
    // Scroll to top on step change:
    useEffect(() => {
        var _a;
        const dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE);
        if (contentKey && dialogScrollable)
            dialogScrollable.scrollTop = 0;
    }, [contentKey]);
    const [shakeSx, shake] = useShakeAnimation(paperRef.current);
    return (React__default.createElement(Dialog, { open: isDialogBlocked ? true : open, onClose: isDialogBlocked ? shake : onClose, "aria-labelledby": "checkout-modal-header-title", scroll: "body", ref: dialogRootRef, PaperProps: { sx: shakeSx, ref: paperRef }, TransitionComponent: NoTransition, 
        // Dialog only:
        // fullWidth
        // maxWidth="sm"
        fullScreen: true },
        React__default.createElement(DialogContent, { sx: {
                overflowX: 'hidden',
                px: {
                    xs: 1.5,
                    sm: 2.5,
                },
                py: 2.5,
                maxWidth: theme => theme.breakpoints.values.lg,
                mx: "auto",
            } },
            React__default.createElement(React__default.Fragment, null,
                header,
                children ? (React__default.createElement(Box, { sx: "centered" in variantProps && variantProps.centered ? centeredSx : undefined }, children)) : (("leftColumn" in variantProps || "rightColumn" in variantProps) && {
                /* Implement 2-column layout using leftColumn and rightColumn */
                })))));
};

export { FullScreenOverlay };
//# sourceMappingURL=FullScreenOverlay.js.map
