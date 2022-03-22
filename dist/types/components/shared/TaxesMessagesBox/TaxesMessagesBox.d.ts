import { BoxProps } from "@mui/material";
import React from "react";
import { TaxesState } from "../../../views/Billing/BillingView";
export declare type TaxesMessagesBoxVariant = "form" | "selector";
export interface TaxesMessagesBoxProps extends BoxProps {
    variant: TaxesMessagesBoxVariant;
    taxes: null | TaxesState;
}
export declare const TaxesMessagesBox: React.FC<TaxesMessagesBoxProps>;
