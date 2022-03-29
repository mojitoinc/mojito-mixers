import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box, Typography, Tooltip, Link } from '@mui/material';
import React__default, { useCallback } from 'react';
import { withInvalidZipCode, withInvalidAddress } from '../../../utils/validationUtils.js';

const TaxesMessagesBox = (_a) => {
    var { isSubmitted, variant, taxes, onSuggestionAccepted } = _a, props = __rest(_a, ["isSubmitted", "variant", "taxes", "onSuggestionAccepted"]);
    const vertexSuggestions = taxes === null || taxes === void 0 ? void 0 : taxes.vertexSuggestions;
    const handleSuggestionAccepted = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!vertexSuggestions || !onSuggestionAccepted)
            return;
        const fieldKey = (e.currentTarget.dataset.field || "");
        const newValue = vertexSuggestions[fieldKey];
        if (!fieldKey || !newValue)
            return;
        onSuggestionAccepted(fieldKey, newValue);
    }, [vertexSuggestions, onSuggestionAccepted]);
    if (taxes === null)
        return null;
    if (taxes.status === "error" && isSubmitted) {
        const message = taxes.invalidZipCode && variant === "form"
            ? withInvalidZipCode({ label: "zip code" })
            : withInvalidAddress({ variant });
        return (React__default.createElement(Box, Object.assign({}, props),
            React__default.createElement(Typography, { variant: "caption", component: "p", sx: { color: theme => theme.palette.warning.dark } }, message)));
    }
    if (!vertexSuggestions || Object.keys(vertexSuggestions).length === 0 || !onSuggestionAccepted || variant === "selector")
        return null;
    return (React__default.createElement(Box, Object.assign({}, props), Object.entries(vertexSuggestions).map(([fieldKey, suggestionValue], i) => {
        return (React__default.createElement(Typography, { variant: "caption", component: "p", sx: { mt: i === 0 ? 0 : 1 } },
            "Did you mean",
            " ",
            React__default.createElement(Tooltip, { title: `Click to accept suggestion (${suggestionValue})` },
                React__default.createElement(Link, { href: "", onClickCapture: handleSuggestionAccepted, "data-field": fieldKey }, suggestionValue)),
            "?"));
    })));
};

export { TaxesMessagesBox };
//# sourceMappingURL=TaxesMessagesBox.js.map
