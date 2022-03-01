import { Component, ErrorInfo, ReactNode } from "react";
interface Props {
    children: ReactNode;
    onCatch?: (error: Error) => void;
}
interface State {
    hasError: boolean;
}
declare class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): ReactNode;
}
export default ErrorBoundary;
