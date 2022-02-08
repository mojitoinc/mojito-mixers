'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CONSENT_ERROR_MESSAGE = "You must accept the terms and conditions of the sale.";
const ConsentText = ({ privacyHref, termsOfUseHref, }) => {
    const linkElements = [
        privacyHref ? React__default["default"].createElement(material.Link, { color: "text.primary", href: privacyHref, target: "_blank" }, "Privacy Notices") : null,
        termsOfUseHref ? React__default["default"].createElement(material.Link, { color: "text.primary", href: termsOfUseHref, target: "_blank" }, "Terms of Use") : null,
    ].filter(Boolean);
    const lastLinkElementsIndex = linkElements.length - 1;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        "have read, understood, and consent to the",
        " ",
        linkElements.map((linkElement, i) => {
            return React__default["default"].createElement(React.Fragment, { key: i },
                i > 0 && i === lastLinkElementsIndex ? "and " : "",
                linkElement,
                " ");
        }),
        "of the sale."));
};

exports.CONSENT_ERROR_MESSAGE = CONSENT_ERROR_MESSAGE;
exports.ConsentText = ConsentText;
//# sourceMappingURL=ConsentText.js.map
