'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useOpenCloseCheckoutModal = require('../useOpenCloseCheckoutModal/useOpenCloseCheckoutModal.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckoutOverlayContext = React.createContext({
    open: () => { },
    close: () => { },
    setCheckoutComponentProps: () => { },
});
const CheckoutOverlayProvider = ({ paymentIdParam, paymentErrorParam, checkoutComponent: CheckoutComponent, doNotRenderPaymentUI, children, }) => {
    const { loaderMode, isOpen, onOpen, onClose } = useOpenCloseCheckoutModal.useOpenCloseCheckoutModal({ paymentIdParam, paymentErrorParam });
    const [checkoutComponentProps, setCheckoutComponentProps] = React.useState({});
    const handleOnClose = React.useCallback(() => {
        onClose();
        // setCheckoutComponentProps({});
    }, [onClose]);
    const open = React.useCallback((nextCheckoutComponentProps) => {
        if (nextCheckoutComponentProps)
            setCheckoutComponentProps(nextCheckoutComponentProps);
        onOpen();
    }, [onOpen]);
    const close = React.useCallback(() => {
        handleOnClose();
    }, [handleOnClose]);
    if (doNotRenderPaymentUI)
        return React__default["default"].createElement(React__default["default"].Fragment, null, children);
    return (React__default["default"].createElement(CheckoutOverlayContext.Provider, { value: { open, close, setCheckoutComponentProps } },
        children,
        React__default["default"].createElement(CheckoutComponent, Object.assign({}, checkoutComponentProps, { open: isOpen, onClose: handleOnClose, loaderMode: loaderMode, paymentErrorParam: paymentErrorParam }))));
};
function useCheckoutOverlay() {
    return React.useContext(CheckoutOverlayContext);
}

exports.CheckoutOverlayContext = CheckoutOverlayContext;
exports.CheckoutOverlayProvider = CheckoutOverlayProvider;
exports.useCheckoutOverlay = useCheckoutOverlay;
//# sourceMappingURL=CheckoutOverlayProvider.js.map
