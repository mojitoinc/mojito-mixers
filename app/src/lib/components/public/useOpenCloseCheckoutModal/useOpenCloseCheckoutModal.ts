import { useCallback, useEffect, useState } from "react";
import { continueFlows } from "../CheckoutOverlay/CheckoutOverlay.utils";

const initiallyOpen = continueFlows(true).checkoutStep !== "";

export function useOpenCloseCheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(initiallyOpen);
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
