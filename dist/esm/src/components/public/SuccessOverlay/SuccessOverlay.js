import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { useTimeout } from '@swyg/corre';
import React__default, { useLayoutEffect } from 'react';
import { THREEDS_SUCCESS_REDIRECT_DELAY_MS } from '../../../config/config.js';
import { isUrlPathname, getUrlWithSearchParams } from '../../../domain/url/url.utils.js';
import { withThemeProvider } from '../../shared/ProvidersInjector/ProvidersInjector.js';
import { getCheckoutModalState, persistReceivedRedirectUri3DS } from '../CheckoutOverlay/CheckoutOverlay.utils.js';
import { PUIStaticSuccessOverlay } from './StaticSuccessOverlay.js';

const PUISuccessOverlay = (_a) => {
    var { onRedirect } = _a, staticSuccessOverlayProps = __rest(_a, ["onRedirect"]);
    const { purchaseSuccess, url = "" } = getCheckoutModalState();
    const isPathname = isUrlPathname(url);
    useLayoutEffect(() => {
        if (purchaseSuccess) {
            if (isPathname)
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
            onRedirect(getUrlWithSearchParams(url));
    }, THREEDS_SUCCESS_REDIRECT_DELAY_MS);
    return purchaseSuccess ? (React__default.createElement(PUIStaticSuccessOverlay, Object.assign({}, staticSuccessOverlayProps))) : null;
};
const PUISuccess = withThemeProvider(PUISuccessOverlay);

export { PUISuccess, PUISuccessOverlay };
//# sourceMappingURL=SuccessOverlay.js.map
