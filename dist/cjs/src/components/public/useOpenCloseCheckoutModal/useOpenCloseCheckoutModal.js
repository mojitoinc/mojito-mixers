'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var CheckoutOverlay_utils = require('../CheckoutOverlay/CheckoutOverlay.utils.js');

const initiallyOpen = CheckoutOverlay_utils.continueFlows(true).checkoutStep !== "";
function useOpenCloseCheckoutModal() {
    const [isOpen, setIsOpen] = React.useState(false);
    React.useEffect(() => {
        setIsOpen(initiallyOpen);
    }, []);
    const onOpen = React.useCallback(() => {
        setIsOpen(true);
    }, []);
    const onClose = React.useCallback(() => {
        setIsOpen(false);
    }, []);
    return {
        isOpen,
        onOpen,
        onClose,
    };
}

exports.useOpenCloseCheckoutModal = useOpenCloseCheckoutModal;
//# sourceMappingURL=useOpenCloseCheckoutModal.js.map
