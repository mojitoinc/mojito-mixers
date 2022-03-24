'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var corre = require('@swyg/corre');
var React = require('react');
var config = require('../../../config/config.js');
var errors_constants = require('../../../domain/errors/errors.constants.js');
var url_utils = require('../../../domain/url/url.utils.js');
var graphqlGenerated = require('../../../queries/graphqlGenerated.js');
var ErrorView = require('../../../views/Error/ErrorView.js');
var CheckoutModalHeader = require('../../payments/CheckoutModalHeader/CheckoutModalHeader.js');
var FullScreenOverlay = require('../../shared/FullScreenOverlay/FullScreenOverlay.js');
var ProvidersInjector = require('../../shared/ProvidersInjector/ProvidersInjector.js');
var CheckoutOverlay_utils = require('../CheckoutOverlay/CheckoutOverlay.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PUIErrorOverlay = (_a) => {
    var _b, _c, _d;
    var { logoSrc, logoSx, errorImageSrc, onRedirect } = _a, fullScreenOverlayProps = tslib_es6.__rest(_a, ["logoSrc", "logoSx", "errorImageSrc", "onRedirect"]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const paymentNotificationResult = graphqlGenerated.useGetPaymentNotificationQuery({
        pollInterval: config.PAYMENT_NOTIFICATION_INTERVAL_MS,
    });
    const error = ((_d = (_c = (_b = paymentNotificationResult.data) === null || _b === void 0 ? void 0 : _b.getPaymentNotification) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.error) || "";
    React.useEffect(() => {
        if (error)
            setErrorMessage(prevErrorMessage => prevErrorMessage || "");
    }, [error]);
    corre.useTimeout(() => {
        setErrorMessage(prevErrorMessage => prevErrorMessage || errors_constants.ERROR_PURCHASE().errorMessage);
    }, config.PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS);
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
    const headerElement = logoSrc ? (React__default["default"].createElement(CheckoutModalHeader.CheckoutModalHeader, { variant: "error", logoSrc: logoSrc, logoSx: logoSx })) : null;
    return (React__default["default"].createElement(FullScreenOverlay.FullScreenOverlay, Object.assign({ isDialogBlocked: !errorMessage, centered: true, header: headerElement }, fullScreenOverlayProps),
        React__default["default"].createElement(ErrorView.ErrorView, { checkoutError: { errorMessage }, errorImageSrc: errorImageSrc, onFixError: reviewData, onClose: toMarketplace })));
};
const PUIError = ProvidersInjector.withProviders(PUIErrorOverlay);

exports.PUIError = PUIError;
exports.PUIErrorOverlay = PUIErrorOverlay;
//# sourceMappingURL=ErrorOverlay.js.map
