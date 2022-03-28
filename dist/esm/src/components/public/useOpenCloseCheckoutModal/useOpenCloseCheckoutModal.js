import { useState, useEffect, useCallback } from 'react';
import { isInitiallyOpen } from '../CheckoutOverlay/CheckoutOverlay.utils.js';

function useOpenCloseCheckoutModal({ paymentIdParam, paymentErrorParam, }) {
    let initialLoaderMode = "default";
    if (paymentIdParam)
        initialLoaderMode = "success";
    else if (paymentErrorParam)
        initialLoaderMode = "error";
    const [state, setState] = useState({
        loaderMode: initialLoaderMode,
        isOpen: initialLoaderMode !== "default",
    });
    useEffect(() => {
        setState(({ loaderMode }) => ({ loaderMode, isOpen: isInitiallyOpen() }));
    }, []);
    const onOpen = useCallback(() => {
        setState(({ loaderMode }) => ({ loaderMode, isOpen: true }));
    }, []);
    const onClose = useCallback(() => {
        setState({ loaderMode: "default", isOpen: false });
    }, []);
    return Object.assign(Object.assign({}, state), { onOpen, onClose });
}

export { useOpenCloseCheckoutModal };
//# sourceMappingURL=useOpenCloseCheckoutModal.js.map
