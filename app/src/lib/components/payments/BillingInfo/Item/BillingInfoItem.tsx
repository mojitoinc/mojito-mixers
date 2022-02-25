
import { BillingInfoFragment } from "../Fragment/BillingInfoFragment";
import { BaseItemProps } from "../../../shared/StackList/StackList";
import { SavedItem, SavedItemProps, SavedItemLabels } from "../../SavedItem/SavedItem";
import { SavedPaymentMethod } from "../../../../domain/circle/circle.interfaces";
import React from "react";

const BILLING_INFO_ITEM_LABELS: SavedItemLabels = {
  select: "Use Billing Info",
};

export type BillingInfoItemProps = BaseItemProps<SavedPaymentMethod, SavedItemProps>;

export const BillingInfoItem: React.FC<BillingInfoItemProps> = ({
  data: savedPaymentMethod,
  additionalProps: savedItemProps,
  children,
  index,
  ...boxProps
}) => {
  return (
    <SavedItem
      variant="stacked"
      labels={ BILLING_INFO_ITEM_LABELS }
      { ...savedItemProps }
      id={ savedPaymentMethod.addressId }
      boxProps={ { ...boxProps, ...savedItemProps?.boxProps } }>
      <BillingInfoFragment savedPaymentMethod={ savedPaymentMethod } />
    </SavedItem>
  );
};
