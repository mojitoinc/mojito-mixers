'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var CheckoutOverlay_utils = require('../CheckoutOverlay/CheckoutOverlay.utils.js');

function useOpenCloseCheckoutModal({ paymentIdParam, paymentErrorParam, }) {
    let initialLoaderMode = "default";
    if (paymentIdParam)
        initialLoaderMode = "success";
    else if (paymentErrorParam)
        initialLoaderMode = "error";
    const [state, setState] = React.useState({
        loaderMode: initialLoaderMode,
        isOpen: initialLoaderMode !== "default",
    });
    React.useEffect(() => {
        setState(({ loaderMode }) => ({ loaderMode, isOpen: CheckoutOverlay_utils.isInitiallyOpen() }));
    }, []);
    React.useEffect(() => {
        if (initialLoaderMode === "default")
            return;
        setState({
            loaderMode: initialLoaderMode,
            isOpen: true,
        });
    }, [initialLoaderMode]);
    const onOpen = React.useCallback(() => {
        setState(({ loaderMode }) => ({ loaderMode, isOpen: true }));
    }, []);
    const onClose = React.useCallback(() => {
        setState({ loaderMode: "default", isOpen: false });
    }, []);
    return Object.assign(Object.assign({}, state), { onOpen, onClose });
}

exports.useOpenCloseCheckoutModal = useOpenCloseCheckoutModal;
//# sourceMappingURL=useOpenCloseCheckoutModal.js.map
