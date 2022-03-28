import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { SuccessView } from '../../../views/Success/SuccessView.js';
import { CheckoutModalHeader } from '../../payments/CheckoutModalHeader/CheckoutModalHeader.js';
import { FullScreenOverlay } from '../../shared/FullScreenOverlay/FullScreenOverlay.js';

const PUIStaticSuccessOverlay = (_a) => {
    var { logoSrc, logoSx } = _a, successViewProps = __rest(_a, ["logoSrc", "logoSx"]);
    const headerElement = logoSrc ? (React__default.createElement(CheckoutModalHeader, { variant: "purchasing", logoSrc: logoSrc, logoSx: logoSx })) : null;
    return (React__default.createElement(FullScreenOverlay, { isDialogBlocked: true, centered: true, header: headerElement },
        React__default.createElement(SuccessView, Object.assign({}, successViewProps))));
};

export { PUIStaticSuccessOverlay };
//# sourceMappingURL=StaticSuccessOverlay.js.map
