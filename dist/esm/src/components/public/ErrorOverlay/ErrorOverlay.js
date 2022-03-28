import { __rest, __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import { useTimeout } from '@swyg/corre';
import React__default, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS, THREEDS_FLOW_SEARCH_PARAM_ERROR, PAYMENT_NOTIFICATION_INTERVAL_MS } from '../../../config/config.js';
import { ERROR_PURCHASE } from '../../../domain/errors/errors.constants.js';
import { isUrlPathname } from '../../../domain/url/url.utils.js';
import { useGetPaymentNotificationQuery } from '../../../queries/graphqlGenerated.js';
import { withProviders } from '../../shared/ProvidersInjector/ProvidersInjector.js';
import { getCheckoutModalState, persistReceivedRedirectUri3DS, clearPersistedInfo } from '../CheckoutOverlay/CheckoutOverlay.utils.js';
import { PUIStaticErrorOverlay } from './StaticErrorOverlay.js';

const PUIErrorOverlay = (_a) => {
    var _b, _c, _d;
    var { onRedirect } = _a, staticErrorOverlayProps = __rest(_a, ["onRedirect"]);
    const [errorMessage, setErrorMessage] = useState("");
    const paymentNotificationResult = useGetPaymentNotificationQuery({
        skip: !!errorMessage,
        pollInterval: PAYMENT_NOTIFICATION_INTERVAL_MS,
    });
    const error = ((_d = (_c = (_b = paymentNotificationResult.data) === null || _b === void 0 ? void 0 : _b.getPaymentNotification) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.error) || "";
    useEffect(() => {
        if (error)
            setErrorMessage(prevErrorMessage => prevErrorMessage || "");
    }, [error]);
    useTimeout(() => {
        setErrorMessage(prevErrorMessage => prevErrorMessage || ERROR_PURCHASE.errorMessage);
    }, PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS);
    const { purchaseError, url = "" } = getCheckoutModalState();
    useLayoutEffect(() => {
        // Users should only see this page if they completed a credit card payment and 3DS' verification went wrong.
        // Otherwise, they are immediately redirected to homepage:
        if (!purchaseError)
            onRedirect("/");
    }, [purchaseError, onRedirect]);
    const reviewData = useCallback((errorMessage) => __awaiter(void 0, void 0, void 0, function* () {
        const isPathname = isUrlPathname(url);
        if (isPathname)
            persistReceivedRedirectUri3DS(window.location.href);
        // If there was an error, users can click the review button and go back to the Payment UI to review the data...:
        onRedirect(`${url}${THREEDS_FLOW_SEARCH_PARAM_ERROR}${encodeURIComponent(errorMessage)}`);
        return false;
    }), [onRedirect, url]);
    const toMarketplace = useCallback(() => {
        if (!purchaseError)
            return;
        clearPersistedInfo();
        // ...or they can just go back to the marketplace homepage:
        onRedirect("/");
    }, [purchaseError, onRedirect]);
    return purchaseError ? (React__default.createElement(PUIStaticErrorOverlay, Object.assign({}, staticErrorOverlayProps, { checkoutError: { errorMessage }, onFixError: reviewData, onClose: toMarketplace }))) : null;
};
const PUIError = withProviders(PUIErrorOverlay);

export { PUIError, PUIErrorOverlay };
//# sourceMappingURL=ErrorOverlay.js.map
