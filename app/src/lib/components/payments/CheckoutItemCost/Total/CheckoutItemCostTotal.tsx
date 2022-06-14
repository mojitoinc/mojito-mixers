import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { formatTaxRate } from "../../../../utils/formatUtils";
import { TaxesState } from "../../../../views/Billing/BillingView";
import { Number } from "../../../shared/Number/Number";
import { TextField } from "../../../shared/TextField/TextField";
import { usePromoCode } from "../../../../utils/promoCodeUtils";

const TAX_RATE_PLACEHOLDER_SX: SxProps<Theme> = {
  background: theme => theme.palette.grey[100],
  borderRadius: "128px",
  color: "transparent",
  fontSize: "10px",
  margin: "0 0 0 2px",
  userSelect: "none",
};

const TAX_AMOUNT_PLACEHOLDER_SX: SxProps<Theme> = {
  ...TAX_RATE_PLACEHOLDER_SX,
  margin: "0 2px 0 0",
};

const TOTAL_PLACEHOLDER_SX: SxProps<Theme> = {
  background: theme => theme.palette.success.light,
  borderRadius: "128px",
  color: "transparent",
  fontFamily: theme => theme.typography.subtitle1.fontFamily,
  fontSize: "14px",
  margin: "0 4px 0 0",
  userSelect: "none",
};

const ROW_SX: SxProps<Theme> = {
  display: "flex",
  mb: 1,
  flex: 1,
  justifyContent: "space-between",
};

export interface CheckoutItemCostTotalProps {
  total: number;
  fees: number | null;
  taxes: null | TaxesState;
  withDetails?: boolean;
}

export const CheckoutItemCostTotal: React.FC<CheckoutItemCostTotalProps> = ({
  total,
  fees,
  taxes,
  withDetails = false,
}) => {
  const { promoCode, onChangePromoCode, onApply, editable, error, invoiceItemIDs } = usePromoCode();
  const [discountTotal, setDiscountTotal] = useState(total);
  const [discount, setDiscount] = useState<number | null>(null);

  useEffect(() => {
    if (promoCode.total) {
      setDiscountTotal(promoCode.total);
      // TODO: This should also come from usePromoCode:
      setDiscount(total - promoCode.total);
    }
  }, [promoCode, setDiscountTotal, total]);

  const feesValue = fees || 0;

  let taxRowElement: React.ReactNode = null;

  let totalElement: React.ReactNode = (
    <Tooltip title="Enter a valid address to calculate the total"><span><Number suffix=" USD">{ discountTotal + feesValue }</Number></span></Tooltip>
  );

  if (taxes) {
    const {
      status,
      taxAmount = 0,
      taxRate = 0,
    } = taxes;

    let taxRateElement: React.ReactNode = null;
    let taxAmountElement: React.ReactNode = null;

    if (status === "loading") {
      taxRateElement = <Tooltip title="Calculating taxes..."><span>(<Box component="span" sx={ TAX_RATE_PLACEHOLDER_SX }>00.00</Box> %)</span></Tooltip>;
      taxAmountElement = <Tooltip title="Calculating taxes..."><span><Box component="span" sx={ TAX_AMOUNT_PLACEHOLDER_SX }>{ `${ (discountTotal + feesValue) * 0.10 | 0 }`.replace(/./, "0") }.00</Box> USD</span></Tooltip>;
      totalElement = <Tooltip title="Calculating total..."><span><Box component="span" sx={ TOTAL_PLACEHOLDER_SX }>{ `${ (discountTotal + feesValue) * 1.10 | 0 }`.replace(/./, "0") }.00</Box> USD</span></Tooltip>;
    } else if (status === "complete" && taxAmount !== undefined) {
      taxRateElement = `(${ formatTaxRate(taxRate) })`;
      taxAmountElement = <Number suffix=" USD">{ taxAmount }</Number>;
      totalElement = <Number suffix=" USD">{ discountTotal + feesValue + taxAmount }</Number>;
    } else {
      taxRateElement = null;
      taxAmountElement = <Tooltip title="Enter a valid address to calculate the taxes"><span><Number suffix=" USD">{ 0 }</Number></span></Tooltip>;
      totalElement = <Tooltip title="Enter a valid address to calculate the total"><span><Number suffix=" USD">{ discountTotal + feesValue }</Number></span></Tooltip>;
    }

    taxRowElement = (
      <Box sx={ ROW_SX }>
        <Typography sx={ theme => ({ color: theme.palette.grey["500"] }) }>Taxes { taxRateElement }</Typography>
        <Typography>{ taxAmountElement }</Typography>
      </Box>
    );
  }

  // TODO: The hook should provide a callback function that takes an input event:
  const handlePromoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePromoCode(event.target.value);
  };

  const handleApplyPromoCode = useCallback(() => {
    // TODO: if (editable) check should be done inside onApply.
    if (editable) onApply();
  }, [editable, onApply]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      { withDetails && (
        <>
          <Box sx={{ ...ROW_SX, mt: 2, mb: 3 }}>
            <TextField
              label="Discount code"
              value={ promoCode.code }
              onChange={ handlePromoCodeChange }
              error={ !!error }
              helperText={ error }
              margin="none"
              InputProps={{
                readOnly: !(editable && invoiceItemIDs.length > 0),
                endAdornment: (
                  <Button
                    sx={{ color: "text.primary" }}
                    onClick={ handleApplyPromoCode }
                    disabled={ !(editable && invoiceItemIDs.length > 0) }>
                    Apply
                  </Button>
                ),
              }} />
          </Box>

          <Box sx={ ROW_SX }>
            <Typography>Subtotal</Typography>
            <Typography><Number suffix=" USD">{ total }</Number></Typography>
          </Box>

          { fees === null ? null : (
            <Box sx={ ROW_SX }>
              <Typography sx={ theme => ({ color: theme.palette.grey["500"] }) }>Fees</Typography>
              <Typography><Number suffix=" USD">{ fees }</Number></Typography>
            </Box>
          ) }

          { discount !== null && (
            <Box sx={ ROW_SX }>
              <Typography sx={ theme => ({ color: theme.palette.grey["500"] }) }>Discount</Typography>
              <Typography><Number suffix=" USD">{ discount }</Number></Typography>
            </Box>
          ) }

          { taxRowElement }
        </>
      ) }

      <Box
        sx={{
          display: "flex",
          mt: 1,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}>

        <Typography sx={{ fontWeight: "500" }}>
          { withDetails ? "Total Amount (USD)" : "Total Amount Paid (USD)" }
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "500",
            color: "success.main",
          }}>
          { totalElement }
        </Typography>

      </Box>
    </Box>
  );
};
