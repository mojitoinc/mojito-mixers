import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { ErrorView } from '../../../views/Error/ErrorView.js';
import { CheckoutModalHeader } from '../../payments/CheckoutModalHeader/CheckoutModalHeader.js';
import { FullScreenOverlay } from '../../shared/FullScreenOverlay/FullScreenOverlay.js';

const PUIStaticErrorOverlay = (_a) => {
    var { logoSrc, logoSx } = _a, errorViewProps = __rest(_a, ["logoSrc", "logoSx"]);
    const headerElement = (React__default.createElement(CheckoutModalHeader, { variant: "error", logoSrc: logoSrc, logoSx: logoSx }));
    return (React__default.createElement(FullScreenOverlay, { isDialogBlocked: true, centered: true, header: headerElement },
        React__default.createElement(ErrorView, Object.assign({}, errorViewProps))));
};

export { PUIStaticErrorOverlay };
//# sourceMappingURL=StaticErrorOverlay.js.map
