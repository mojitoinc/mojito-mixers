import React from "react";
export declare const CONSENT_ERROR_MESSAGE = "You must accept the terms and conditions of the sale.";
export declare type ConsentType = "disclaimer" | "checkbox";
export interface ConsentTextProps {
    privacyHref?: string;
    termsOfUseHref?: string;
}
export declare const ConsentText: React.FC<ConsentTextProps>;
