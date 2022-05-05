import React from "react";
import { Box, Typography, Grid, Avatar, Divider, Stack } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { Number } from "../../../shared/Number/Number";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";

interface CheckoutItemListProps {
  sx?: SxProps<Theme>;
  checkoutItems: CheckoutItem[];
  withSeparators?: boolean;
  showPrices?: boolean;
}

export const CheckoutItemList: React.FC<CheckoutItemListProps> = ({
  sx = {},
  checkoutItems,
  withSeparators = false,
  showPrices = false,
}) => (
  <Stack
    sx={ sx }
    divider={ (
      <Box sx={{ py: 1.25 }}>
        { withSeparators && <Divider sx={{ my: 2.5 }} /> }
      </Box>
    ) }>
    { checkoutItems.map(
      ({ lotID, name, imageSrc, imageBackground, totalSupply, remainingSupply, units, unitPrice }) => (
        <Grid
          key={ lotID }
          container
          item
          direction="column"
          sx={{
            display: "flex",
          }}>
          <Box sx={{ flex: 1, display: "flex" }}>
            <Avatar
              alt={ name }
              src={ imageSrc }
              variant="square"
              sx={{
                background: theme => imageBackground || theme.palette.grey["300"],
                width: 80,
                height: 80,
                flex: "0 0 auto",
              }} />

            <Box
              sx={{
                marginLeft: 2,
                marginTop: 0.5,
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}>
              <Typography sx={{ fontWeight: "500", pb: 0.5 }}>{ name }</Typography>

              { totalSupply && remainingSupply && (
                <Typography sx={{ pb: 0.5 }}>
                  # { units === 1 ? (
                    <Number>{ totalSupply - remainingSupply + 1 }</Number>
                ) : (
                  <>
                    <Number>{ totalSupply - remainingSupply + 1 }</Number>-<Number>{ totalSupply - remainingSupply + units }</Number>
                  </>
                ) } / <Number>{ totalSupply }</Number>
                </Typography>
              ) }

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: "auto",
                  pt: 0.5,
                }}>
                <Typography>Quantity: <Box component="span" sx={{ fontWeight: 500 }}>{ units }</Box></Typography>
                { showPrices && <Typography><Number suffix=" USD">{ unitPrice }</Number></Typography> }
              </Box>
            </Box>
          </Box>
        </Grid>
      )
    ) }
  </Stack>
);
