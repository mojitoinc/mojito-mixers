import { BoxProps } from "@mui/material";
import React from "react";
import { TaxesState } from "../../../views/Billing/BillingView";
export declare type TaxesMessagesBoxVariant = "form" | "selector";
export interface TaxesMessagesBoxProps extends BoxProps {
    isSubmitted: boolean;
    variant: TaxesMessagesBoxVariant;
    taxes: null | TaxesState;
    onSuggestionAccepted?: (fieldKey: string, newValue: string) => void;
}
export declare const TaxesMessagesBox: React.FC<TaxesMessagesBoxProps>;
