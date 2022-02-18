import { styled } from '@mui/material';
import React__default from 'react';
import { TextField } from '../TextField/TextField.js';

const InlineField = styled((props) => (React__default.createElement(TextField, Object.assign({}, props, { variant: "filled", margin: "none", InputProps: { disableUnderline: true } }))))(({ theme: { palette } }) => ({
    "& .MuiInputLabel-root": {
        color: palette.text.primary,
    },
    "& .MuiInputBase-root": {
        background: palette.background.default,
        color: palette.text.primary,
        padding: 8,
        height: "30px",
    },
    "& .MuiInputBase-input": {
        color: palette.text.primary,
        WebkitTextFillColor: palette.text.primary,
        fontSize: "12px",
        cursor: "default",
        padding: 0,
    },
}));

export { InlineField };
//# sourceMappingURL=InlineField.js.map
