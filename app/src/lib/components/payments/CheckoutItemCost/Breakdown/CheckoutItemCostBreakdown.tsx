import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import React from "react";
import { Number } from "../../../shared/Number";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";

export interface CheckoutItemCostBreakdownProps {
  checkoutItem: CheckoutItem;
}

export const CheckoutItemCostBreakdown: React.FC<CheckoutItemCostBreakdownProps> = ({
  checkoutItem: {
    name,
    price,
    fee,
    imageSrc,
    imageBackground,
  },
}) => {
  return (<>
    <Grid
      container
      item
      direction={{
        xs: "column",
        sm: "row"
      }}
      sx={{
        display: "flex",
        py: 5
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

        <Box sx={{ marginLeft: 2, marginTop: 0.5 }}>
          <Typography sx={{ fontWeight: "500" }}>{name}</Typography>

          <Typography sx={{ marginTop: 2 }}>
            <Number prefix="$" suffix=" USD">
              {price}
            </Number>
          </Typography>

          <Typography sx={{ marginTop: 0.5 }}>
            <Number prefix="$" suffix=" Fee">
              {fee}
            </Number>
          </Typography>
        </Box>
      </Box>

      <CheckoutItemCostTotal price={ price } fee={ fee } />

    </Grid>

    <Divider />
  </>);
};
