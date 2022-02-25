import { SvgIcon, SvgIconProps, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { standaloneGetCardImageProps } from "../../../domain/payment/payment.utils";
import React from "react";

export const CREDIT_CARD_ICON_SX: SxProps<Theme> = { width: "35px", height: "24px" };

export const SelectIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 16C11.8567 16 11.7195 15.9419 11.6198 15.8389L6.14917 10.1919C5.94573 9.98189 5.95105 9.64672 6.16105 9.44328C6.37105 9.23984 6.70622 9.24516 6.90966 9.45516L12 14.7097L17.0903 9.45516C17.2938 9.24516 17.6289 9.23984 17.839 9.44328C18.049 9.64672 18.0543 9.98189 17.8508 10.1919L12.3802 15.8389C12.2805 15.9419 12.1433 16 12 16Z"
      fill="currentColor" />
  </SvgIcon>
);

export const CreditCardIcon: React.FC<SvgIconProps & { network: string }> = ({ network, ...props }) => {
  return (
    <SvgIcon
      { ...standaloneGetCardImageProps(network) }
      { ...props }
      sx={ { ...CREDIT_CARD_ICON_SX, ...props.sx } } />
  );
};
