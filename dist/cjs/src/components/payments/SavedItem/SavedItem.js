'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Edit = require('../../../../node_modules/@mui/icons-material/Edit.js');
var Delete = require('../../../../node_modules/@mui/icons-material/Delete.js');
var SecondaryButton = require('../../shared/SecondaryButton/SecondaryButton.js');
var material = require('@mui/material');
var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var InlineField = require('../../shared/InlineField/InlineField.js');
var Box = require('../../../../node_modules/@mui/material/Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_SAVED_ITEM_LABELS = {
    active: "Active",
    cvv: "CVV",
    edit: "Edit Info",
    delete: "Delete",
    select: "Use Info",
};
const SavedItem = ({ children, id, variant = "stacked", labels: customLabels = {}, disabled, active, status, onEdit, onDelete, onPick, cvvError, onCvvChange, boxProps, }) => {
    const labels = Object.assign(Object.assign({}, DEFAULT_SAVED_ITEM_LABELS), customLabels);
    const hasControls = active || onEdit || onDelete || onPick;
    const handleClick = React.useCallback((e) => {
        const { currentTarget } = e;
        const action = currentTarget.dataset.action;
        if (!action)
            return;
        const callback = {
            edit: onEdit,
            delete: onDelete,
            pick: onPick,
        }[action];
        if (callback && id !== undefined)
            callback(id, e);
    }, [id, onEdit, onDelete, onPick]);
    const disabledSelect = !!disabled;
    const disabledOther = disabled === true;
    let mainControlElement = null;
    if (status) {
        mainControlElement = (React__default["default"].createElement(material.Tooltip, { title: status.tooltip },
            React__default["default"].createElement(material.Chip, { size: "small", color: status.color, label: status.label, variant: "outlined" })));
    }
    else if (active) {
        mainControlElement = (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Chip, { size: "small", color: "success", label: "Active", variant: "outlined" }),
            onCvvChange && React__default["default"].createElement(InlineField.InlineField, { onChange: onCvvChange, placeholder: "CVV", error: cvvError, sx: { width: "52px" } })));
    }
    else if (onPick) {
        mainControlElement = (React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: handleClick, disabled: disabledSelect, "data-action": "pick" }, labels.select));
    }
    return (React__default["default"].createElement(DisplayBox.DisplayBox, Object.assign({}, boxProps),
        variant === "stacked" ? (React__default["default"].createElement(Box["default"], { sx: { flex: 1, pb: 2 } }, children)) : (React__default["default"].createElement(material.Stack, { direction: "row", spacing: 2, sx: { flex: 1, pb: { xs: 2, sm: 0 }, alignItems: "center" } }, children)),
        hasControls && (React__default["default"].createElement(material.Stack, { direction: variant === "stacked" ? { xs: "row", sm: "column" } : "row", spacing: 1, sx: {
                // display: "flex",
                // flexDirection: {
                //   xs: "column",
                //   sm: "column"
                // },
                justifyContent: "flex-start",
                alignItems: "flex-end",
                height: "auto",
            } },
            mainControlElement,
            React__default["default"].createElement(Box["default"], { sx: { mr: "auto !important", mb: "auto !important", display: { sm: variant === "row" ? "none" : "block" } } }),
            React__default["default"].createElement(material.Stack, { direction: "row", spacing: 1, sx: { pt: variant === "stacked" ? { xs: 0, sm: 1 } : 0 } },
                onEdit && (React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: handleClick, disabled: disabledOther, startIcon: React__default["default"].createElement(Edit["default"], null), "data-action": "edit" }, labels.edit)),
                onDelete && (React__default["default"].createElement(material.Tooltip, { title: labels.delete },
                    React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: handleClick, disabled: disabledOther, "data-action": "delete" },
                        React__default["default"].createElement(Delete["default"], null)))))))));
};

exports.SavedItem = SavedItem;
//# sourceMappingURL=SavedItem.js.map
