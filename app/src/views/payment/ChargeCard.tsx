import {
  useCreatePaymentMutation,
} from "../../services/graphql/generated";
import { useCallback, useState } from "react";
import { InvoiceWrapper } from "./Invoices";

export const ChargeCard: React.FC = () => {
  const [createPaymentMutation, { data, loading, error }] =
    useCreatePaymentMutation();

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
    <InvoiceWrapper>
      <h3>Create Payment</h3>
      <label>Payment Method ID</label>
      <input
        placeholder="Payment method ID"
        value={paymentMethodId}
        onChange={(e) => setPaymentMethodId(e.target.value)}
      />
      <label>Invoice ID</label>
      <input
        placeholder="Invoice ID"
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
      />
      <button onClick={chargeCard}>Charge Card</button>
    </InvoiceWrapper>
  );
};
