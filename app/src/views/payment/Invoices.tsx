import {
  useCreateAuctionInvoiceMutation,
} from "../../services/graphql/generated";
import { useCallback, useState } from "react";
import { buttonSx, fieldsetLabelSx, inputStyle } from "../../components/legacy/legacy-styles.constants";
import { Box, Button, Typography } from "@mui/material";

export const Invoices: React.FC = () => {
  const [createAuctionInvoiceMutation] = useCreateAuctionInvoiceMutation();

  const [orgId, setOrgId] = useState("");
  const [lotId, setLotId] = useState("");

  const createInvoice = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      console.log("createAuctionInvoiceMutation()");

      const res = await createAuctionInvoiceMutation({
        variables: {
          orgID: orgId,
          lotID: lotId,
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [createAuctionInvoiceMutation, orgId, lotId]);

  return (
    <Box sx={{ display: "block", position: "relative", margin: "2em auto" }}>
      <Typography variant="h5">2. Create Invoice</Typography>

      <Typography variant="h6" sx={ fieldsetLabelSx }>Organization ID</Typography>

      { /* TODO: Make a dropdown list of organizations */ }
      <input
        style={ inputStyle }
        type="text"
        value={orgId}
        placeholder="Organization ID"
        name="orgID"
        onChange={(e) => setOrgId(e.target.value)} />

      <Typography variant="h6" sx={ fieldsetLabelSx }>Lot ID</Typography>

      <input
        style={ inputStyle }
        type="text"
        value={lotId}
        placeholder="Lot ID"
        name="lotID"
        onChange={(e) => setLotId(e.target.value)} />

      <Button onClick={createInvoice} sx={ buttonSx } variant="contained">Create Invoice</Button>
    </Box>
  );
};
