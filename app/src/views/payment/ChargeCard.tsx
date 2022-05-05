import React, { useCallback, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useCreatePaymentMutation } from "../../services/graphql/generated";
import { fieldsetLabelSx, inputStyle, buttonSx } from "../../components/legacy/legacy-styles.constants";

export const ChargeCard: React.FC = () => {
  const [createPaymentMutation] = useCreatePaymentMutation();
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  const chargeCard = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      console.log("createPaymentMutation()");

      const res = await createPaymentMutation({
        variables: {
          paymentMethodID: paymentMethodId,
          invoiceID: invoiceId,
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [createPaymentMutation, paymentMethodId, invoiceId]);

  return (
    <Box sx={{ display: "block", position: "relative", margin: "2em auto" }}>
      <Typography variant="h5">3. Charge Card</Typography>

      <Typography variant="h6" sx={ fieldsetLabelSx }>Payment Method ID</Typography>

      <input
        style={ inputStyle }
        type="text"
        value={ paymentMethodId }
        placeholder="Payment Method ID"
        name="paymentMethodID"
        onChange={ e => setPaymentMethodId(e.target.value) } />

      <Typography variant="h6" sx={ fieldsetLabelSx }>Invoice ID</Typography>

      <input
        style={ inputStyle }
        type="text"
        value={ invoiceId }
        placeholder="Invoice ID"
        name="invoiceID"
        onChange={ e => setInvoiceId(e.target.value) } />

      <Button onClick={ chargeCard } sx={ buttonSx } variant="contained">Charge Card</Button>

    </Box>
  );
};
