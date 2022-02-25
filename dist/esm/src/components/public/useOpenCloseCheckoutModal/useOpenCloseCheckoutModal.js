import { useState, useEffect, useCallback } from 'react';
import { continueFlows } from '../CheckoutOverlay/CheckoutOverlay.utils.js';

const initiallyOpen = continueFlows(true).checkoutStep !== "";
function useOpenCloseCheckoutModal() {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(initiallyOpen);
    }, []);
    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);
    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);
    return {
        isOpen,
        onOpen,
        onClose,
    };
}

export { useOpenCloseCheckoutModal };
//# sourceMappingURL=useOpenCloseCheckoutModal.js.map
