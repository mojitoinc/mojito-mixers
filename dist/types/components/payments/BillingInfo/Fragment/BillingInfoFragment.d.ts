import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../../domain/circle/circle.interfaces";
import React from "react";
export interface BillingInfoFragmentProps {
    savedPaymentMethod: SavedPaymentMethod | SavedPaymentMethodBillingInfo;
}
export declare const BillingInfoFragment: React.FC<BillingInfoFragmentProps>;
