import { useCallback, useEffect, useState } from "react";
import { isInitiallyOpen } from "../CheckoutOverlay/CheckoutOverlay.utils";

export function useOpenCloseCheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isInitiallyOpen());
  }, [])

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
  }
}
