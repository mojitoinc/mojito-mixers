import React from "react";
export interface CheckoutStepperProps {
    progress: 50 | 100;
}
export declare function resetStepperProgress(): void;
export declare const CheckoutStepper: React.FC<CheckoutStepperProps>;
