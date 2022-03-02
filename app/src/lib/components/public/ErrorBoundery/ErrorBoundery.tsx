import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    onCatch?: (error: Error, errorInfo?: ErrorInfo) => void
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State>{

    state = { hasError: false };

    static getDerivedStateFromError() {

        return { hasError: true }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (this.props.onCatch) {
            this.props.onCatch(error, errorInfo);

            const retry = window.confirm("Sorry, there was an unexpected error. Do you want to re-open the payment modal?");

            if (retry) this.setState({ hasError: false });
        }
        else{
            console.warn(error);
        }
    }

    render(): ReactNode {
        return this.state.hasError ? null : this.props.children;
    }

}


export default ErrorBoundary;
