import { styled } from '@mui/material';
import { CardNumberField } from '../CardNumberField/CardNumberField.js';
import { TextField } from '../TextField/TextField.js';
import React__default from 'react';
import { SM_BORDER_RADIUS } from '../../../config/theme/theme.js';

const ReadOnlyField = styled((props) => (React__default.createElement(TextField, Object.assign({ variant: "standard", disabled: true }, props))))(({ theme: { palette, typography } }) => ({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body2), { fontSize: "16px", lineHeight: "24px", color: palette.text.primary }),
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            background: palette.grey[50],
            padding: 8,
            height: "40px",
            borderRadius: SM_BORDER_RADIUS,
            marginTop: 24,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body1), { color: palette.text.primary, WebkitTextFillColor: palette.text.primary, fontSize: "12px", cursor: "default" }),
    },
}));
const ReadOnlyCardField = styled((props) => (React__default.createElement(CardNumberField, Object.assign({ variant: "standard", disabled: true }, props))))(({ theme: { palette, typography } }) => ({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body2), { fontSize: "16px", lineHeight: "24px", color: palette.text.primary }),
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            background: palette.grey[50],
            padding: 8,
            height: "40px",
            borderRadius: SM_BORDER_RADIUS,
            marginTop: 24,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body1), { color: palette.text.primary, WebkitTextFillColor: palette.text.primary, fontSize: "12px", cursor: "default" }),
    },
}));
const ReadOnlyWalletAddress = styled((props) => (React__default.createElement(TextField, Object.assign({ variant: "standard", disabled: true }, props))))(({ theme: { palette, typography } }) => ({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body1), { fontSize: "16px", lineHeight: "24px", color: palette.text.primary }),
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            background: palette.grey[50],
            padding: 8,
            height: "60px",
            borderRadius: SM_BORDER_RADIUS,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body2), { color: palette.text.primary, WebkitTextFillColor: palette.text.primary, fontSize: "12px", cursor: "default" }),
    },
}));

export { ReadOnlyCardField, ReadOnlyField, ReadOnlyWalletAddress };
//# sourceMappingURL=ReadOnlyField.js.map
