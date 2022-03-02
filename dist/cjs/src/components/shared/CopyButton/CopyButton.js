'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var ContentCopy = require('../../../../node_modules/@mui/icons-material/ContentCopy.js');
var corre = require('@swyg/corre');
var React = require('react');
var promiseUtils = require('../../../utils/promiseUtils.js');
var IconButton = require('../../../../node_modules/@mui/material/IconButton/IconButton.js');
var Tooltip = require('../../../../node_modules/@mui/material/Tooltip/Tooltip.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    const [{ title, open, }, setState] = React.useState({
        title: tooltipLabel,
        open: false,
    });
    const onTooltipClick = React.useCallback(() => {
        navigator.clipboard.writeText(value);
        setState({
            title: confirmationLabel,
            open: true,
        });
    }, [value, confirmationLabel]);
    const handleOpen = React.useCallback(() => {
        setState(({ title, open }) => ({ title, open: title === tooltipLabel ? true : open }));
    }, [tooltipLabel]);
    const handleClose = React.useCallback(() => {
        setState(({ title, open }) => ({ title, open: title === tooltipLabel ? false : open }));
    }, [tooltipLabel]);
    corre.useTimeout(() => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        if (title !== confirmationLabel)
            return;
        setState({ title: confirmationLabel, open: false });
        // Wait to allow the tooltip close animation to play before the title is reset back to the default one:
        yield promiseUtils.wait(250);
        setState(({ open }) => ({ title: tooltipLabel, open: open || false }));
    }), 3000, [title, open, tooltipLabel, confirmationLabel]);
    const buttonElement = (React__default["default"].createElement(IconButton["default"], { sx: ICON_BUTTON_SX[size] },
        React__default["default"].createElement(ContentCopy["default"], { sx: ICON_SX[size] })));
    return (React__default["default"].createElement(Tooltip["default"], { title: title, open: open, onOpen: handleOpen, onClose: handleClose, onClick: onTooltipClick }, buttonElement));
};

exports.CopyButton = CopyButton;
//# sourceMappingURL=CopyButton.js.map
