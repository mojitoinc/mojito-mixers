import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { useTimeout } from '@swyg/corre';
import React__default, { useLayoutEffect } from 'react';
import { isUrlPathname, getUrlWithSearchParams } from '../../../domain/url/url.utils.js';
import { SuccessView } from '../../../views/Success/SuccessView.js';
import { CheckoutModalHeader } from '../../payments/CheckoutModalHeader/CheckoutModalHeader.js';
import { FullScreenOverlay } from '../../shared/FullScreenOverlay/FullScreenOverlay.js';
import { withThemeProvider } from '../../shared/ProvidersInjector/ProvidersInjector.js';
import { getCheckoutModalState, persistReceivedRedirectUri3DS } from '../CheckoutOverlay/CheckoutOverlay.utils.js';

const REDIRECT_DELAY_MS = 5000;
const PUISuccessOverlay = (_a) => {
    var { logoSrc, logoSx, successImageSrc, onRedirect } = _a, fullScreenOverlayProps = __rest(_a, ["logoSrc", "logoSx", "successImageSrc", "onRedirect"]);
    const { purchaseSuccess, url } = getCheckoutModalState();
    const isPathname = isUrlPathname(url);
    useLayoutEffect(() => {
        if (purchaseSuccess && isPathname) {
            persistReceivedRedirectUri3DS(window.location.href);
            return;
        }
        // Users should only see this page if they completed a credit card payment and 3DS' verification went ok.
        // Otherwise, they are immediately redirected to homepage:
        onRedirect("/");
    }, [purchaseSuccess, isPathname, onRedirect]);
    useTimeout(() => {
        // If everything's ok, users see this confirmation screen for 5 seconds and then are redirected to the purchase
        // confirmation page:
        if (purchaseSuccess)
            onRedirect(isPathname ? url : getUrlWithSearchParams(url));
    }, REDIRECT_DELAY_MS, [purchaseSuccess, isPathname, onRedirect]);
    if (!purchaseSuccess)
        return null;
    const headerElement = logoSrc ? (React__default.createElement(CheckoutModalHeader, { variant: "purchasing", logoSrc: logoSrc, logoSx: logoSx })) : null;
    return (React__default.createElement(FullScreenOverlay, Object.assign({ centered: true, header: headerElement }, fullScreenOverlayProps),
        React__default.createElement(SuccessView, { successImageSrc: successImageSrc })));
};
const PUISuccess = withThemeProvider(PUISuccessOverlay);

export { PUISuccess, PUISuccessOverlay };
//# sourceMappingURL=SuccessOverlay.js.map
