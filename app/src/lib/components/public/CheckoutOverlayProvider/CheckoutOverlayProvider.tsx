import React, { createContext, useCallback, useContext, useState } from "react";
import { PUICheckoutProps } from "../CheckoutOverlay/CheckoutOverlay";
import { useOpenCloseCheckoutModal, UseOpenCloseCheckoutModalOptions } from "../useOpenCloseCheckoutModal/useOpenCloseCheckoutModal";

export type CheckoutComponentProps = Partial<Omit<
  PUICheckoutProps,
  "open" | "onClose" | "loaderMode" | "paymentErrorParam"
>>;

export type CheckoutComponentWithRequiredProps = Partial<PUICheckoutProps> & Pick<
  PUICheckoutProps,
  "open" | "onClose" | "loaderMode" | "paymentErrorParam"
>;

export interface CheckoutOverlayContextProps {
  open: (checkoutComponentProps?: CheckoutComponentProps) => void;
  close: () => void;
  setCheckoutComponentProps: React.Dispatch<React.SetStateAction<CheckoutComponentProps>>;
}

export const CheckoutOverlayContext = createContext<CheckoutOverlayContextProps>({
  open: () => { /* Do nothing */ },
  close: () => { /* Do nothing */ },
  setCheckoutComponentProps: () => { /* Do nothing */ },
});

export interface CheckoutOverlayProviderProps extends UseOpenCloseCheckoutModalOptions {
  checkoutComponent: React.ComponentType<CheckoutComponentWithRequiredProps>;
  doNotRenderPaymentUI?: boolean;
}

export const CheckoutOverlayProvider: React.FC<CheckoutOverlayProviderProps> = ({
  paymentIdParam,
  paymentErrorParam,
  checkoutComponent: CheckoutComponent,
  doNotRenderPaymentUI,
  children,
}) => {
  const { loaderMode, isOpen, onOpen, onClose } = useOpenCloseCheckoutModal({ paymentIdParam, paymentErrorParam });

  const [checkoutComponentProps, setCheckoutComponentProps] = useState<CheckoutComponentProps>({ });

  const handleOnClose = useCallback(() => {
    onClose();

    // setCheckoutComponentProps({});
  }, [onClose]);

  const open = useCallback((nextCheckoutComponentProps?: CheckoutComponentProps) => {
    if (nextCheckoutComponentProps) setCheckoutComponentProps(nextCheckoutComponentProps);

    onOpen();
  }, [onOpen]);

  const close = useCallback(() => {
    handleOnClose();
  }, [handleOnClose]);

  if (doNotRenderPaymentUI) return <>{ children }</>;

  return (
    <CheckoutOverlayContext.Provider value={ { open, close, setCheckoutComponentProps } }>
      { children }

      <CheckoutComponent
        { ...checkoutComponentProps }
        open={ isOpen }
        onClose={ handleOnClose }
        loaderMode={ loaderMode }
        paymentErrorParam={ paymentErrorParam } />
    </CheckoutOverlayContext.Provider>
  );
}

export function useCheckoutOverlay() {
  return useContext(CheckoutOverlayContext);
}
