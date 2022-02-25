'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var url_utils = require('../../../domain/url/url.utils.js');
var ErrorView = require('../../../views/Error/ErrorView.js');
var CheckoutModalHeader = require('../../payments/CheckoutModalHeader/CheckoutModalHeader.js');
var FullScreenOverlay = require('../../shared/FullScreenOverlay/FullScreenOverlay.js');
var ProvidersInjector = require('../../shared/ProvidersInjector/ProvidersInjector.js');
var CheckoutOverlay_utils = require('../CheckoutOverlay/CheckoutOverlay.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PUIErrorOverlay = (_a) => {
    var { logoSrc, logoSx, errorImageSrc, onRedirect } = _a, fullScreenOverlayProps = tslib_es6.__rest(_a, ["logoSrc", "logoSx", "errorImageSrc", "onRedirect"]);
    const { purchaseError, url = "" } = CheckoutOverlay_utils.getCheckoutModalState();
    React.useLayoutEffect(() => {
        // Users should only see this page if they completed a credit card payment and 3DS' verification went wrong.
        // Otherwise, they are immediately redirected to homepage:
        if (!purchaseError)
            onRedirect("/");
    }, [purchaseError, onRedirect]);
    const reviewData = React.useCallback(() => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        const isPathname = url_utils.isUrlPathname(url);
        if (isPathname)
            CheckoutOverlay_utils.persistReceivedRedirectUri3DS(window.location.href);
        // If there was an error, users can click the review button and go back to the Payment UI to review the data...:
        onRedirect(isPathname ? url : url_utils.getUrlWithSearchParams(url));
        return false;
    }), [onRedirect, url]);
    const toMarketplace = React.useCallback(() => {
        if (!purchaseError)
            return;
        CheckoutOverlay_utils.clearPersistedInfo();
        // ...or they can just go back to the marketplace homepage:
        onRedirect("/");
    }, [purchaseError, onRedirect]);
    if (!purchaseError)
        return null;
    const headerElement = logoSrc ? (React__default["default"].createElement(CheckoutModalHeader.CheckoutModalHeader, { variant: "error", logoSrc: logoSrc, logoSx: logoSx })) : null;
    return (React__default["default"].createElement(FullScreenOverlay.FullScreenOverlay, Object.assign({ centered: true, header: headerElement }, fullScreenOverlayProps),
        React__default["default"].createElement(ErrorView.ErrorView, { checkoutError: { errorMessage: "Error creating payment method." }, errorImageSrc: errorImageSrc, onFixError: reviewData, onClose: toMarketplace })));
};
const PUIError = ProvidersInjector.withThemeProvider(PUIErrorOverlay);

exports.PUIError = PUIError;
exports.PUIErrorOverlay = PUIErrorOverlay;
//# sourceMappingURL=ErrorOverlay.js.map
