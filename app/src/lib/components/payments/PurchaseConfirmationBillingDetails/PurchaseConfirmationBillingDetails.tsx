import { Box, Chip, InputAdornment, Stack, Typography } from "@mui/material";
import React from "react";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../domain/circle/circle.interfaces";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { CreditCardIcon } from "../../shared/Icons/Icons";
import { ReadOnlyField, ReadOnlyCardField } from "../../shared/ReadOnlyField/ReadOnlyField";
import { CheckoutItemCostPurchase } from "../CheckoutItemCost/Purchase/CheckoutItemCostPurchase";
import { PAYMENT_TYPE_LABEL } from "./PurchaseConfirmationBillingDetails.constants";
import { getFormattedPaymentMethod } from "./PurchaseConfirmationBillingDetails.utils";
import CheckIcon from "@mui/icons-material/Check";

export interface PurchaseConfirmationBillingDetailsProps {
  checkoutItem: CheckoutItem;
  paymentReferenceNumber: string;
  selectedPaymentMethodBillingInfo: SavedPaymentMethodBillingInfo;
  selectedPaymentMethodPaymentInfo: PaymentMethod | SavedPaymentMethod;
}

export const PurchaseConfirmationBillingDetails: React.FC<PurchaseConfirmationBillingDetailsProps> = ({
  checkoutItem,
  paymentReferenceNumber,
  selectedPaymentMethodBillingInfo,
  selectedPaymentMethodPaymentInfo,
}) => {
  const {
    isMasked,
    paymentType,
    displayValue,
    network,
  } = getFormattedPaymentMethod(selectedPaymentMethodPaymentInfo);

  const icon: React.ReactNode = network ? <CreditCardIcon network={ network } /> : null;

  return (
    <Box sx={{ position: "relative", mb: 2 }}>
      <Stack
        spacing={ 2 }
        direction={ { xs: "column", sm: "row" } }
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          pt: 2
        }}>

        <Typography variant="h5">
          Purchase Confirmation
        </Typography>

        <Chip
          size="small"
          color="success"
          label={ (<>
            Payment Processed
            <CheckIcon sx={{ height: "24px", ml: 1.5 }} />
          </>) } />
      </Stack>

      <Stack
        spacing={ 2 }
        direction={ { xs: "column", sm: "row" } }
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          pt: 1.5,
          pb: { xs: 2.5, sm: 1.5 }
        }}>

        { isMasked ? (
          <ReadOnlyField
            label={ PAYMENT_TYPE_LABEL[paymentType] }
            value={ displayValue }
            InputProps={ icon ? {
              endAdornment: (
                <InputAdornment position="end">
                  { icon }
                </InputAdornment>
              ),
            } : undefined } />
        ) : (
          <ReadOnlyCardField
            label={ PAYMENT_TYPE_LABEL[paymentType] }
            value={ displayValue } />
        ) }

        <ReadOnlyField
          label="Reference No."
          value={ paymentReferenceNumber || "-" } />
      </Stack>

      <CheckoutItemCostPurchase
        checkoutItems={ [checkoutItem] }
        selectedPaymentMethodBillingInfo={ selectedPaymentMethodBillingInfo } />
    </Box>
  );
}
