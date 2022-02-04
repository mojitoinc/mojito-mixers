import { ProtectedPageContainer } from "../components/auth/ProtectedPageContainer";
import { PaymentView } from "../views/payment/PaymentView";
import { memo } from "react";

const PaymentMemorised = memo(function PaymentMemorised() {
  return <PaymentView />;
});

export default function Payment() {
  return (
    <ProtectedPageContainer>
      <PaymentMemorised />
    </ProtectedPageContainer>
  );
}
