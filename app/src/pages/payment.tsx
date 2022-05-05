import React, { memo } from "react";
import { ProtectedPageContainer } from "../components/auth/ProtectedPageContainer";
import { PaymentView } from "../views/payment/PaymentView";

const PaymentMemoized = memo(() => {
  return <PaymentView />;
});

const Payment: React.FC = () => {
  return (
    <ProtectedPageContainer>
      <PaymentMemoized />
    </ProtectedPageContainer>
  );
};

export default Payment;
