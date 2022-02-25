import { __rest, __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useLayoutEffect, useCallback } from 'react';
import { isUrlPathname, getUrlWithSearchParams } from '../../../domain/url/url.utils.js';
import { ErrorView } from '../../../views/Error/ErrorView.js';
import { CheckoutModalHeader } from '../../payments/CheckoutModalHeader/CheckoutModalHeader.js';
import { FullScreenOverlay } from '../../shared/FullScreenOverlay/FullScreenOverlay.js';
import { withThemeProvider } from '../../shared/ProvidersInjector/ProvidersInjector.js';
import { getCheckoutModalState, persistReceivedRedirectUri3DS, clearPersistedInfo } from '../CheckoutOverlay/CheckoutOverlay.utils.js';

const PUIErrorOverlay = (_a) => {
    var { logoSrc, logoSx, errorImageSrc, onRedirect } = _a, fullScreenOverlayProps = __rest(_a, ["logoSrc", "logoSx", "errorImageSrc", "onRedirect"]);
    const { purchaseError, url = "" } = getCheckoutModalState();
    useLayoutEffect(() => {
        // Users should only see this page if they completed a credit card payment and 3DS' verification went wrong.
        // Otherwise, they are immediately redirected to homepage:
        if (!purchaseError)
            onRedirect("/");
    }, [purchaseError, onRedirect]);
    const reviewData = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const isPathname = isUrlPathname(url);
        if (isPathname)
            persistReceivedRedirectUri3DS(window.location.href);
        // If there was an error, users can click the review button and go back to the Payment UI to review the data...:
        onRedirect(isPathname ? url : getUrlWithSearchParams(url));
        return false;
    }), [onRedirect, url]);
    const toMarketplace = useCallback(() => {
        if (!purchaseError)
            return;
        clearPersistedInfo();
        // ...or they can just go back to the marketplace homepage:
        onRedirect("/");
    }, [purchaseError, onRedirect]);
    if (!purchaseError)
        return null;
    const headerElement = logoSrc ? (React__default.createElement(CheckoutModalHeader, { variant: "error", logoSrc: logoSrc, logoSx: logoSx })) : null;
    return (React__default.createElement(FullScreenOverlay, Object.assign({ centered: true, header: headerElement }, fullScreenOverlayProps),
        React__default.createElement(ErrorView, { checkoutError: { errorMessage: "Error creating payment method." }, errorImageSrc: errorImageSrc, onFixError: reviewData, onClose: toMarketplace })));
};
const PUIError = withThemeProvider(PUIErrorOverlay);

export { PUIError, PUIErrorOverlay };
//# sourceMappingURL=ErrorOverlay.js.map
