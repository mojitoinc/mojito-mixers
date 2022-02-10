import { Box, Typography, Grid, Avatar, Divider, Stack } from "@mui/material";
import React from "react";
import { Number } from "../../../shared/Number";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";

export interface CheckoutItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
}

export const CheckoutItemCostBreakdown: React.FC<
  CheckoutItemCostBreakdownProps
> = ({ checkoutItems }) => {
  const { total, fees } = useCheckoutItemsCostTotal(checkoutItems);

  return (
    <Stack sx={{ display: "flex", flex: 1, py: 5 }}>
      {checkoutItems.map(
        ({ lotID, name, price, imageSrc, imageBackground }) => (
          <Grid
            key={lotID}
            container
            item
            direction="column"
            sx={{
              display: "flex"
            }}
          >
            <Box sx={{ flex: 1, display: "flex" }}>
              <Avatar
                alt={name}
                src={imageSrc}
                variant="square"
                sx={{
                  background: (theme) =>
                    imageBackground || theme.palette.grey["300"],
                  width: 80,
                  height: 80,
                  flex: "0 0 auto"
                }}
              />

              <Box
                sx={{
                  marginLeft: 2,
                  marginTop: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "space-between"
                }}
              >
                <Typography sx={{ fontWeight: "500" }}>{name}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography sx={{ marginTop: 0.5 }}>1</Typography>
                  <Typography sx={{ marginTop: 0.5 }}>
                    <Number suffix=" USD">{price}</Number>
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />
          </Grid>
        )
      )}
      <CheckoutItemCostTotal total={total} taxes={0} fees={fees} />
    </Stack>
  );
};
