import React__default, { createContext, useState, useCallback, useContext } from 'react';
import { useOpenCloseCheckoutModal } from '../useOpenCloseCheckoutModal/useOpenCloseCheckoutModal.js';

const CheckoutOverlayContext = createContext({
    open: () => { },
    close: () => { },
    setCheckoutComponentProps: () => { },
});
const CheckoutOverlayProvider = ({ paymentIdParam, paymentErrorParam, checkoutComponent: CheckoutComponent, children, }) => {
    const { loaderMode, isOpen, onOpen, onClose } = useOpenCloseCheckoutModal({ paymentIdParam, paymentErrorParam });
    const [checkoutComponentProps, setCheckoutComponentProps] = useState({});
    const handleOnClose = useCallback(() => {
        onClose();
        // setCheckoutComponentProps({});
    }, [onClose]);
    const open = useCallback((nextCheckoutComponentProps) => {
        if (nextCheckoutComponentProps)
            setCheckoutComponentProps(nextCheckoutComponentProps);
        onOpen();
    }, [onOpen]);
    const close = useCallback(() => {
        handleOnClose();
    }, [handleOnClose]);
    return (React__default.createElement(CheckoutOverlayContext.Provider, { value: { open, close, setCheckoutComponentProps } },
        children,
        React__default.createElement(CheckoutComponent, Object.assign({}, checkoutComponentProps, { open: isOpen, onClose: handleOnClose, loaderMode: loaderMode, paymentErrorParam: paymentErrorParam }))));
};
function useCheckoutOverlay() {
    return useContext(CheckoutOverlayContext);
}

export { CheckoutOverlayContext, CheckoutOverlayProvider, useCheckoutOverlay };
//# sourceMappingURL=CheckoutOverlayProvider.js.map
