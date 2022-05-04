import React from "react";
import { BaseItemProps } from "../../../shared/StackList/StackList";
import { PaymentDetailsFragment } from "../Fragment/PaymentDetailsFragment";
import { SavedItem, SavedItemProps, SavedItemLabels, SavedItemStatus } from "../../SavedItem/SavedItem";
import { SavedPaymentMethod } from "../../../../domain/circle/circle.interfaces";
import { PaymentType } from "../../../../domain/payment/payment.interfaces";

const PAYMENT_METHOD_CC_ITEM_LABELS: SavedItemLabels = {
  select: "Use Card",
};

const PAYMENT_METHOD_ACH_ITEM_LABELS: SavedItemLabels = {
  select: "Use Bank",
};

const PAYMENT_METHOD_WIRE_ITEM_LABELS: SavedItemLabels = {
  select: "Use Wire",
};

const PAYMENT_METHOD_CRYPTO_ITEM_LABELS: SavedItemLabels = {
  select: "Use Wallet",
};

const PAYMENT_METHOD_ITEM_LABELS: Record<PaymentType, SavedItemLabels> = {
  CreditCard: PAYMENT_METHOD_CC_ITEM_LABELS,
  ACH: PAYMENT_METHOD_ACH_ITEM_LABELS,
  Wire: PAYMENT_METHOD_WIRE_ITEM_LABELS,
  Crypto: PAYMENT_METHOD_CRYPTO_ITEM_LABELS,
};

export type PaymentDetailsItemProps = BaseItemProps<SavedPaymentMethod, SavedItemProps>;

export const PaymentDetailsItem: React.FC<PaymentDetailsItemProps> = ({
  data: savedPaymentMethod,
  additionalProps: savedItemProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index,
  ...boxProps
}) => {
  let disabled = savedItemProps?.disabled;
  let status: SavedItemStatus | undefined;

  if (savedPaymentMethod.status === "pending") {
    disabled = disabled || "selectOnly";

    // TODO: Should there be a way to re-fetch to see if payment methods in "pending" state move to "complete"?

    status = {
      label: "Awaiting Approval",
      tooltip: "Sorry, this payment method is awaiting approval and can't be used yet. Please, try again later.",
      color: "warning",
    };
  } else if (savedPaymentMethod.status === "failed") {
    disabled = disabled || "selectOnly";

    status = {
      label: "Error",
      tooltip: "Sorry, there was an error with this payment method. Please, remove it and try again.",
      color: "error",
    };
  }

  return (
    <SavedItem
      { ...savedItemProps }
      variant="row"
      labels={ PAYMENT_METHOD_ITEM_LABELS[savedPaymentMethod.type] }
      disabled={ disabled }
      status={ status }
      id={ savedPaymentMethod.id }
      boxProps={ boxProps }
      cvvLabel={ savedPaymentMethod.type === "CreditCard" ? savedItemProps?.cvvLabel : undefined }
      cvvError={ savedPaymentMethod.type === "CreditCard" ? savedItemProps?.cvvError : undefined }
      onCvvChange={ savedPaymentMethod.type === "CreditCard" ? savedItemProps?.onCvvChange : undefined }>
      <PaymentDetailsFragment savedPaymentMethod={ savedPaymentMethod } />
    </SavedItem>
  );
};
