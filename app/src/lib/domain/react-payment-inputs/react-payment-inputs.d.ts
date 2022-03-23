declare module "react-payment-inputs" {
  import React from "react";
  import { SvgIconProps, TextFieldProps } from "@mui/material";

  export interface PaymentInputsProps extends TextFieldProps {
    ref: React.Ref<any>;
  };

  export type CreditCardSvgProps = SvgIconProps & { network: CreditCardNetwork };

  export interface UsePaymentInputsReturn {
    getCardNumberProps: (p: TextFieldProps) => PaymentInputsProps;
    getExpiryDateProps: (p: TextFieldProps) => PaymentInputsProps;
    getCVCProps: (p: TextFieldProps) => PaymentInputsProps;
    getCardImageProps: (p: { images: Record<CreditCardNetwork, React.ReactSVGElement> }) => CreditCardSvgProps;
  }

  export function usePaymentInputs(): UsePaymentInputsReturn;
  export function getCVCError(cvc?: string): string;
  export function getCardNumberError(cardNumber?: string): string;
  export function getExpiryDateError(expiryDate?: string): string;
}

declare module "react-payment-inputs/images" {
  import React from "react";
  import { CreditCardNetwork } from "react-payment-inputs";

  const _exported: Record<CreditCardNetwork, React.ReactSVGElement>;

  export default _exported;
}

