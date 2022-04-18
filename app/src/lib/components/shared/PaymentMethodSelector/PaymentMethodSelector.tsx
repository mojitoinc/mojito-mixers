import React, { useCallback } from "react";
import { PaymentType } from "../../../domain/payment/payment.interfaces";
import { Typography, Stack, useMediaQuery, Tooltip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LanguageIcon from "@mui/icons-material/Language";
import Icon from "@mdi/react";
import { mdiEthereum } from '@mdi/js';
import { useTheme } from "@mui/material/styles";

type PaymentMethodSelectorProps = {
  paymentMethods: PaymentType[];
  selectedPaymentMethod: PaymentType;
  onPaymentMethodChange: (paymentMethod: PaymentType) => void;
};

type PaymentMethodOptionProps = {
  label: string;
  icon: JSX.Element;
};

const PAYMENT_METHOD_OPTION_PROPS: Record<
  PaymentType,
  PaymentMethodOptionProps
> = {
  CreditCard: {
    label: "Credit Card",
    icon: <CreditCardIcon />
  },
  ACH: {
    label: "ACH",
    icon: <AccountBalanceIcon sx={{ fontSize: "20px" }} />
  },
  Wire: {
    label: "Wire",
    icon: <LanguageIcon sx={{ fontSize: "20px" }} />
  },
  Crypto: {
    label: "Crypto",
    icon: <Icon path={ mdiEthereum } size="20px" />
  }
};

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethods,
  selectedPaymentMethod,
  onPaymentMethodChange
}) => {
  const theme = useTheme();
  const wideViewport = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = useCallback((_: React.MouseEvent<HTMLElement>, paymentMethod: PaymentType) => {
    if (paymentMethod) onPaymentMethodChange(paymentMethod);
  }, [onPaymentMethodChange]);

  return (
    <ToggleButtonGroup
      value={selectedPaymentMethod}
      exclusive
      onChange={handleChange}
      aria-label="payment method"
      sx={{ mb: 3.5 }}>

      { paymentMethods.map((paymentMethod) => {
        const { label, icon } = PAYMENT_METHOD_OPTION_PROPS[paymentMethod];

        return (
          <ToggleButton
            key={paymentMethod}
            value={paymentMethod}
            aria-label={paymentMethod}>
            { wideViewport ? (
              <Stack
                spacing={1}
                direction="row"
                sx={{
                  alignItems: "center"
                }}>
                { icon }
                <Typography sx={{ fontWeight: 500 }}>{ label }</Typography>
              </Stack>
            ) : (
              <Tooltip key={ paymentMethod } title={ label }>
                { icon }
              </Tooltip>
            ) }
          </ToggleButton>
        );
      }) }

    </ToggleButtonGroup>
  );
};
