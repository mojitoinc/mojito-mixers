import React from "react";
export interface ErrorViewProps {
    errorMessage?: string;
    errorImageSrc?: string;
    onReviewData: () => void;
    onClose: () => void;
}
export declare const ErrorView: React.FC<ErrorViewProps>;
