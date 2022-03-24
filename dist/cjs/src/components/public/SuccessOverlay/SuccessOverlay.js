'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var corre = require('@swyg/corre');
var React = require('react');
var config = require('../../../config/config.js');
var url_utils = require('../../../domain/url/url.utils.js');
var SuccessView = require('../../../views/Success/SuccessView.js');
var CheckoutModalHeader = require('../../payments/CheckoutModalHeader/CheckoutModalHeader.js');
var FullScreenOverlay = require('../../shared/FullScreenOverlay/FullScreenOverlay.js');
var ProvidersInjector = require('../../shared/ProvidersInjector/ProvidersInjector.js');
var CheckoutOverlay_utils = require('../CheckoutOverlay/CheckoutOverlay.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PUISuccessOverlay = (_a) => {
    var { logoSrc, logoSx, successImageSrc, onRedirect } = _a, fullScreenOverlayProps = tslib_es6.__rest(_a, ["logoSrc", "logoSx", "successImageSrc", "onRedirect"]);
    const { purchaseSuccess, url = "" } = CheckoutOverlay_utils.getCheckoutModalState();
    const isPathname = url_utils.isUrlPathname(url);
    React.useLayoutEffect(() => {
        if (purchaseSuccess) {
            if (isPathname)
                CheckoutOverlay_utils.persistReceivedRedirectUri3DS(window.location.href);
            return;
        }
        // Users should only see this page if they completed a credit card payment and 3DS' verification went ok.
        // Otherwise, they are immediately redirected to homepage:
        onRedirect("/");
    }, [purchaseSuccess, isPathname, onRedirect]);
    corre.useTimeout(() => {
        // If everything's ok, users see this confirmation screen for 5 seconds and then are redirected to the purchase
        // confirmation page:
        if (purchaseSuccess)
            onRedirect(isPathname ? url : url_utils.getUrlWithSearchParams(url));
    }, config.THREEDS_SUCCESS_REDIRECT_DELAY_MS, [purchaseSuccess, isPathname, onRedirect]);
    if (!purchaseSuccess)
        return null;
    const headerElement = logoSrc ? (React__default["default"].createElement(CheckoutModalHeader.CheckoutModalHeader, { variant: "purchasing", logoSrc: logoSrc, logoSx: logoSx })) : null;
    return (React__default["default"].createElement(FullScreenOverlay.FullScreenOverlay, Object.assign({ isDialogBlocked: true, centered: true, header: headerElement }, fullScreenOverlayProps),
        React__default["default"].createElement(SuccessView.SuccessView, { successImageSrc: successImageSrc })));
};
const PUISuccess = ProvidersInjector.withThemeProvider(PUISuccessOverlay);

exports.PUISuccess = PUISuccess;
exports.PUISuccessOverlay = PUISuccessOverlay;
//# sourceMappingURL=SuccessOverlay.js.map
