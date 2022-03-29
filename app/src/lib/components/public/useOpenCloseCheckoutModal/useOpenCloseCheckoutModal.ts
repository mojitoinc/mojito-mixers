import { useCallback, useEffect, useState } from "react";
import { isInitiallyOpen } from "../CheckoutOverlay/CheckoutOverlay.utils";

export type LoaderMode = "default" | "success" | "error";

export interface UseOpenCloseCheckoutModalState {
  loaderMode: LoaderMode;
  isOpen: boolean;
}

export interface UseOpenCloseCheckoutModalReturn extends UseOpenCloseCheckoutModalState {
  onOpen: () => void;
  onClose: () => void;
}

export interface UseOpenCloseCheckoutModalOptions {
  paymentIdParam?: string;
  paymentErrorParam?: string;
}

export function useOpenCloseCheckoutModal({
  paymentIdParam,
  paymentErrorParam,
}: UseOpenCloseCheckoutModalOptions): UseOpenCloseCheckoutModalReturn {
  let initialLoaderMode: LoaderMode = "default";

  if (paymentIdParam) initialLoaderMode = "success";
  else if (paymentErrorParam) initialLoaderMode = "error";

  const [state, setState] = useState<UseOpenCloseCheckoutModalState>({
    loaderMode: initialLoaderMode,
    isOpen: initialLoaderMode !== "default",
  });

  useEffect(() => {
    setState(({ loaderMode }) => ({ loaderMode, isOpen: isInitiallyOpen() }));
  }, []);

  useEffect(() => {
    if (initialLoaderMode === "default") return;

    console.log("RESET MODE", initialLoaderMode);

    setState({
      loaderMode: initialLoaderMode,
      isOpen: true,
    });
  }, [initialLoaderMode])

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
