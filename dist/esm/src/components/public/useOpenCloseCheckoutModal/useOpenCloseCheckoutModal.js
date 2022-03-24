import { useState, useEffect, useCallback } from 'react';
import { isInitiallyOpen } from '../CheckoutOverlay/CheckoutOverlay.utils.js';

function useOpenCloseCheckoutModal() {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(isInitiallyOpen());
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
