import { styled } from '@mui/material';
import { CardNumberField } from '../CardNumberField/CardNumberField.js';
import { TextField } from '../TextField/TextField.js';
import React__default from 'react';

const ReadOnlyField = styled((props) => (React__default.createElement(TextField, Object.assign({ variant: "standard", disabled: true }, props))))({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": {
            color: "black",
        },
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            backgroundColor: "#F8F8F8",
            color: "black",
            padding: 8,
            height: "40px",
            borderRadius: "2px",
            marginTop: 32,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": {
            color: "black",
            WebkitTextFillColor: "black",
            fontSize: "12px",
            cursor: "default",
        },
    },
});
const ReadOnlyCardField = styled((props) => (React__default.createElement(CardNumberField, Object.assign({ variant: "standard", disabled: true }, props))))({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": {
            color: "black",
        },
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            backgroundColor: "#F8F8F8",
            color: "black",
            padding: 8,
            height: "40px",
            borderRadius: "2px",
            marginTop: 32,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": {
            color: "black",
            WebkitTextFillColor: "black",
            fontSize: "12px",
            cursor: "default",
        },
    },
});

export { ReadOnlyCardField, ReadOnlyField };
//# sourceMappingURL=ReadOnlyField.js.map
