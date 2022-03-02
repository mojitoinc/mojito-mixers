import React, { ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
  onCatch?: (error: Error, errorInfo?: ErrorInfo) => void | true;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {

  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onCatch } = this.props;

    if (!onCatch) console.error(error, errorInfo);

    const useConfirmModal = !onCatch || onCatch(error, errorInfo) === true;

    if (useConfirmModal) {
      const retry = window.confirm("Sorry, there was an unexpected error. Do you want to re-open the payment modal?");

      if (retry) this.setState({ hasError: false });
    }
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}


export default ErrorBoundary;
