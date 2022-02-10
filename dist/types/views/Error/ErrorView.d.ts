import React from "react";
export interface ErrorViewProps {
    errorMessage?: string;
    errorImageSrc?: string;
    onReviewData: () => Promise<false>;
    onClose: () => void;
}
export declare const ErrorView: React.FC<ErrorViewProps>;
