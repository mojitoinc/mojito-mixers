import { SavedPaymentMethod } from "../../../../domain/circle/circle.interfaces";
import React from "react";
export interface PaymentDetailsFragmentProps {
    savedPaymentMethod: SavedPaymentMethod;
}
export declare const PaymentDetailsFragment: React.FC<PaymentDetailsFragmentProps>;
