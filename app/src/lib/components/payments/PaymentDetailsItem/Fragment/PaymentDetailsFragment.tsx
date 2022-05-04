import { Typography } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import React from "react";
import { SavedPaymentMethod } from "../../../../domain/circle/circle.interfaces";
import { CreditCardIcon } from "../../../shared/Icons/Icons";
import { ACH_MASK_PREFIX, CREDIT_CARD_MASK_PREFIX, EXPIRATION_DATE_MASK } from "../../../../domain/payment/payment.constants";

export interface PaymentDetailsFragmentProps {
  savedPaymentMethod: SavedPaymentMethod;
}

export const PaymentDetailsFragment: React.FC<PaymentDetailsFragmentProps> = ({
  savedPaymentMethod,
}) => {
  if (savedPaymentMethod.type === "CreditCard") {
    return (
      <>
        <CreditCardIcon network={ savedPaymentMethod.network } />
        <Typography>{ CREDIT_CARD_MASK_PREFIX } { savedPaymentMethod.last4Digit }</Typography>
        <Typography>{ EXPIRATION_DATE_MASK }</Typography>
      </>
    );
  }

  return (
    <>
      <AccountBalanceIcon sx={{ width: "24px", height: "24px" }} />
      <Typography>{ ACH_MASK_PREFIX } { savedPaymentMethod.accountNumber }</Typography>
    </>
  );
};
