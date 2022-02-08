import { Link } from '@mui/material';
import React__default, { Fragment } from 'react';

var CONSENT_ERROR_MESSAGE = "You must accept the terms and conditions of the sale.";
var ConsentText = function (_a) {
    var privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref;
    var linkElements = [
        privacyHref ? React__default.createElement(Link, { color: "text.primary", href: privacyHref, target: "_blank" }, "Privacy Notices") : null,
        termsOfUseHref ? React__default.createElement(Link, { color: "text.primary", href: termsOfUseHref, target: "_blank" }, "Terms of Use") : null,
    ].filter(Boolean);
    var lastLinkElementsIndex = linkElements.length - 1;
    return (React__default.createElement(React__default.Fragment, null,
        "have read, understood, and consent to the",
        " ",
        linkElements.map(function (linkElement, i) {
            return React__default.createElement(Fragment, { key: i },
                i > 0 && i === lastLinkElementsIndex ? "and " : "",
                linkElement,
                " ");
        }),
        "of the sale."));
};

export { CONSENT_ERROR_MESSAGE, ConsentText };
//# sourceMappingURL=ConsentText.js.map
