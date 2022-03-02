import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import default_1 from '../../../../node_modules/@mui/icons-material/ContentCopy.js';
import { useTimeout } from '@swyg/corre';
import React__default, { useState, useCallback } from 'react';
import { wait } from '../../../utils/promiseUtils.js';
import IconButton from '../../../../node_modules/@mui/material/IconButton/IconButton.js';
import Tooltip from '../../../../node_modules/@mui/material/Tooltip/Tooltip.js';

const ICON_BUTTON_SX = {
    small: { p: 1, ml: 0.5, mr: -0.5 },
    medium: { p: 1, ml: 0.5 },
};
const ICON_SX = {
    small: { fontSize: 16 },
    medium: { fontSize: 16 },
};
const CopyButton = ({ label, value, size = "medium", }) => {
    const tooltipLabel = `Copy ${label}`;
    const confirmationLabel = `${label} Copied!`;
    const [{ title, open, }, setState] = useState({
        title: tooltipLabel,
        open: false,
    });
    const onTooltipClick = useCallback(() => {
        navigator.clipboard.writeText(value);
        setState({
            title: confirmationLabel,
            open: true,
        });
    }, [value, confirmationLabel]);
    const handleOpen = useCallback(() => {
        setState(({ title, open }) => ({ title, open: title === tooltipLabel ? true : open }));
    }, [tooltipLabel]);
    const handleClose = useCallback(() => {
        setState(({ title, open }) => ({ title, open: title === tooltipLabel ? false : open }));
    }, [tooltipLabel]);
    useTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        if (title !== confirmationLabel)
            return;
        setState({ title: confirmationLabel, open: false });
        // Wait to allow the tooltip close animation to play before the title is reset back to the default one:
        yield wait(250);
        setState(({ open }) => ({ title: tooltipLabel, open: open || false }));
    }), 3000, [title, open, tooltipLabel, confirmationLabel]);
    const buttonElement = (React__default.createElement(IconButton, { sx: ICON_BUTTON_SX[size] },
        React__default.createElement(default_1, { sx: ICON_SX[size] })));
    return (React__default.createElement(Tooltip, { title: title, open: open, onOpen: handleOpen, onClose: handleClose, onClick: onTooltipClick }, buttonElement));
};

export { CopyButton };
//# sourceMappingURL=CopyButton.js.map
