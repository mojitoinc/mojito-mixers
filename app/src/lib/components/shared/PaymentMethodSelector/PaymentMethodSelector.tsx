import React, { useCallback, useRef, useState, useEffect } from "react";
import { Typography, Stack, Tooltip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LanguageIcon from "@mui/icons-material/Language";
import Icon from "@mdi/react";
import { mdiEthereum } from "@mdi/js";
import { PaymentType } from "../../../domain/payment/payment.interfaces";
import { Market } from "../../public/CheckoutOverlay/CheckoutOverlay";

interface PaymentMethodSelectorProps {
  marketType: Market;
  paymentMethods: PaymentType[];
  selectedPaymentMethod: PaymentType;
  onPaymentMethodChange: (paymentMethod: PaymentType) => void;
}

interface PaymentMethodOptionProps {
  label: string;
  icon: JSX.Element;
}

export const PAYMENT_METHOD_OPTION_PROPS: Record<
  PaymentType,
  PaymentMethodOptionProps
> = {
  CreditCard: {
    label: "Credit Card",
    icon: <CreditCardIcon />,
  },
  ACH: {
    label: "ACH",
    icon: <AccountBalanceIcon sx={{ fontSize: "20px" }} />,
  },
  Wire: {
    label: "Wire",
    icon: <LanguageIcon sx={{ fontSize: "20px" }} />,
  },
  Crypto: {
    label: "Crypto",
    icon: <Icon path={ mdiEthereum } size="20px" />,
  },
  Coinbase: {
    label: "Coinbase",
    icon: <Icon path={ mdiEthereum } size="20px" />,
  },
};

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  marketType,
  paymentMethods,
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const toggleButtonGroupRef = useRef<HTMLDivElement>(null);

  const [maxWidth, setMaxWidth] = useState(0);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    const div = divRef.current;
    const toggleButtonGroup = toggleButtonGroupRef.current;

    setMaxWidth(toggleButtonGroup?.offsetWidth || 0);

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      const nextCollapse = entry.intersectionRatio < 1;

      if (entry.target === div) {
        setCollapse(nextCollapse);
      } else if (nextCollapse) {
        // If the target is toggleButtonGroup and it's overflowing, we need to update the max width:
        setMaxWidth(prevMaxWidth => Math.max(prevMaxWidth, toggleButtonGroup?.offsetWidth || 0));
      }
    }, { threshold: 1 });

    if (div && toggleButtonGroup) {
      observer.observe(div);
      observer.observe(toggleButtonGroup);
    }

    return () => {
      if (div && toggleButtonGroup) {
        observer.unobserve(div);
        observer.unobserve(toggleButtonGroup);
      }
    };
  }, []);

  const handleChange = useCallback((_: React.MouseEvent<HTMLElement>, paymentMethod: PaymentType) => {
    if (paymentMethod) onPaymentMethodChange(paymentMethod);
  }, [onPaymentMethodChange]);

  return (
    <>
      <div ref={ divRef } style={{ width: `${ maxWidth }px`, height: "1px", marginBottom: "-1px" }} />

      <ToggleButtonGroup
        value={ selectedPaymentMethod }
        exclusive
        onChange={ handleChange }
        aria-label="payment method"
        sx={{ mb: 3.5 }}
        ref={ toggleButtonGroupRef }>

        { paymentMethods.map((paymentMethod) => {
          const { label, icon } = PAYMENT_METHOD_OPTION_PROPS[paymentMethod];

          return (
            <ToggleButton
              key={ paymentMethod }
              value={ paymentMethod }
              disabled={ marketType === "secondary" && paymentMethod !== "Crypto" }
              aria-label={ paymentMethod }
              sx={ collapse ? { minWidth: "0 !important" } : undefined }>
              { collapse ? (
                <Tooltip key={ paymentMethod } title={ label }>
                  { icon }
                </Tooltip>
              ) : (
                <Stack
                  spacing={ 1 }
                  direction="row"
                  sx={{
                    alignItems: "center",
                  }}>
                  { icon }
                  <Typography sx={{ fontWeight: 500 }}>{ label }</Typography>
                </Stack>
              ) }
            </ToggleButton>
          );
        }) }

      </ToggleButtonGroup>
    </>
  );
};
