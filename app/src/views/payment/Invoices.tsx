import {
  useCreateAuctionInvoiceMutation,
} from "../../services/graphql/generated";
import { useCallback, useState } from "react";
import styled from "styled-components";

export const InvoiceWrapper = styled.div`
input,
button {
  display: block;
  margin: 5px 0;
}
`;

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
    <InvoiceWrapper>
      <h3>Create Invoice</h3>
      <label>Organization ID</label>
      <input
        placeholder="Org ID"
        value={orgId}
        onChange={(e) => setOrgId(e.target.value)}
      />
      <label>Lot ID</label>
      <input
        placeholder="Lot ID"
        value={lotId}
        onChange={(e) => setLotId(e.target.value)}
      />
      <button onClick={createInvoice}>Create Invoice</button>
    </InvoiceWrapper>
  );
};
