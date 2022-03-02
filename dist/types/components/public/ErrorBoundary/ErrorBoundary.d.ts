import React, { ErrorInfo } from "react";
interface ErrorBoundaryProps {
    children: React.ReactNode;
    onCatch?: (error: Error, errorInfo?: ErrorInfo) => void | true;
}
interface ErrorBoundaryState {
    hasError: boolean;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): React.ReactNode;
}
export {};
