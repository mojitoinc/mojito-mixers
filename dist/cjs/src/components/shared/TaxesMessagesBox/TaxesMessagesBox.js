'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var validationUtils = require('../../../utils/validationUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const TaxesMessagesBox = (_a) => {
    var { isSubmitted, variant, taxes, onSuggestionAccepted } = _a, props = tslib_es6.__rest(_a, ["isSubmitted", "variant", "taxes", "onSuggestionAccepted"]);
    const vertexSuggestions = taxes === null || taxes === void 0 ? void 0 : taxes.vertexSuggestions;
    const handleSuggestionAccepted = React.useCallback((e) => {
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
            ? validationUtils.withInvalidZipCode({ label: "zip code" })
            : validationUtils.withInvalidAddress({ variant });
        return (React__default["default"].createElement(material.Box, Object.assign({}, props),
            React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: { color: theme => theme.palette.warning.dark } }, message)));
    }
    if (!vertexSuggestions || Object.keys(vertexSuggestions).length === 0 || !onSuggestionAccepted || variant === "selector")
        return null;
    return (React__default["default"].createElement(material.Box, Object.assign({}, props), Object.entries(vertexSuggestions).map(([fieldKey, suggestionValue], i) => {
        return (React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: { mt: i === 0 ? 0 : 1 } },
            "Did you mean",
            " ",
            React__default["default"].createElement(material.Tooltip, { title: `Click to accept suggestion (${suggestionValue})` },
                React__default["default"].createElement(material.Link, { href: "", onClickCapture: handleSuggestionAccepted, "data-field": fieldKey }, suggestionValue)),
            "?"));
    })));
};

exports.TaxesMessagesBox = TaxesMessagesBox;
//# sourceMappingURL=TaxesMessagesBox.js.map
