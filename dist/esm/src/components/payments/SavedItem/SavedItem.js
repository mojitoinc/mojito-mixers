import default_1 from '../../../../node_modules/@mui/icons-material/Edit.js';
import default_1$1 from '../../../../node_modules/@mui/icons-material/Delete.js';
import { SecondaryButton } from '../../shared/SecondaryButton/SecondaryButton.js';
import { styled, TextField, Tooltip, Chip, Stack } from '@mui/material';
import React__default, { useCallback } from 'react';
import { DisplayBox } from '../DisplayBox/DisplayBox.js';
import Box from '../../../../node_modules/@mui/material/Box/Box.js';

const InlineField = styled((props) => (React__default.createElement(TextField, Object.assign({}, props, { variant: "filled", margin: "none", InputProps: { disableUnderline: true } }))))({
    "& .MuiInputLabel-root": {
        color: "black",
    },
    "& .MuiInputBase-root": {
        backgroundColor: "#F8F8F8",
        color: "black",
        padding: 8,
        height: "30px",
    },
    "& .MuiInputBase-input": {
        color: "black",
        WebkitTextFillColor: "black",
        fontSize: "12px",
        cursor: "default",
        padding: 0,
    },
});
const DEFAULT_SAVED_ITEM_LABELS = {
    active: "Active",
    cvv: "CVV",
    edit: "Edit Info",
    delete: "Delete",
    select: "Use Info",
};
const SavedItem = ({ children, id, variant = "stacked", labels: customLabels = {}, disabled, active, status, onEdit, onDelete, onPick, onCvvChange, boxProps, }) => {
    const labels = Object.assign(Object.assign({}, DEFAULT_SAVED_ITEM_LABELS), customLabels);
    const hasControls = active || onEdit || onDelete || onPick;
    const handleClick = useCallback((e) => {
        const { currentTarget } = e;
        const action = currentTarget.dataset.action;
        if (!action)
            return;
        const callback = {
            edit: onEdit,
            delete: onDelete,
            pick: onPick,
        }[action];
        if (callback)
            callback(id, e);
    }, [id, onEdit, onDelete, onPick]);
    const disabledSelect = !!disabled;
    const disabledOther = disabled === true;
    let mainControlElement = null;
    if (status) {
        mainControlElement = (React__default.createElement(Tooltip, { title: status.tooltip },
            React__default.createElement(Chip, { size: "small", color: status.color, label: status.label, variant: "outlined" })));
    }
    else if (active) {
        mainControlElement = (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Chip, { size: "small", color: "success", label: "Active", variant: "outlined" }),
            onCvvChange && React__default.createElement(InlineField, { onChange: onCvvChange, placeholder: "CVV", sx: { width: "52px" } })));
    }
    else if (onPick) {
        mainControlElement = (React__default.createElement(SecondaryButton, { onClick: handleClick, disabled: disabledSelect, "data-action": "pick" }, labels.select));
    }
    return (React__default.createElement(DisplayBox, Object.assign({}, boxProps),
        variant === "stacked" ? (React__default.createElement(Box, { sx: { flex: 1, pb: 2 } }, children)) : (React__default.createElement(Stack, { direction: "row", spacing: 2, sx: { flex: 1, pb: { xs: 2, sm: 0 }, alignItems: "center" } }, children)),
        hasControls && (React__default.createElement(Stack, { direction: variant === "stacked" ? { xs: "row", sm: "column" } : "row", spacing: 1, sx: {
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
            React__default.createElement(Box, { sx: { mr: "auto !important", mb: "auto !important", display: { sm: variant === "row" ? "none" : "block" } } }),
            React__default.createElement(Stack, { direction: "row", spacing: 1, sx: { pt: variant === "stacked" ? { xs: 0, sm: 1 } : 0 } },
                onEdit && (React__default.createElement(SecondaryButton, { onClick: handleClick, disabled: disabledOther, startIcon: React__default.createElement(default_1, null), "data-action": "edit" }, labels.edit)),
                onDelete && (React__default.createElement(Tooltip, { title: labels.delete },
                    React__default.createElement(SecondaryButton, { onClick: handleClick, disabled: disabledOther, "data-action": "delete" },
                        React__default.createElement(default_1$1, null)))))))));
};

export { InlineField, SavedItem };
//# sourceMappingURL=SavedItem.js.map
