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
    useEffect(() => {
        if (initialLoaderMode === "default")
            return;
        console.log("RESET MODE", initialLoaderMode);
        setState({
            loaderMode: initialLoaderMode,
            isOpen: true,
        });
    }, [initialLoaderMode]);
    const onOpen = useCallback(() => {
        setState(({ loaderMode }) => ({ loaderMode, isOpen: true }));
    }, []);
    const onClose = useCallback(() => {
        setState({ loaderMode: "default", isOpen: false });
    }, []);
    return {
        loaderMode: initialLoaderMode === "default" ? state.loaderMode : initialLoaderMode,
        isOpen: initialLoaderMode === "default" ? state.isOpen : true,
        onOpen,
        onClose,
    };
}

export { useOpenCloseCheckoutModal };
//# sourceMappingURL=useOpenCloseCheckoutModal.js.map
